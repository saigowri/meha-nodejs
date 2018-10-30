const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
var api = require('./api');
var mailer = require('./mailer');
var db = require('./database');
var config = require('./config.json');

var app = express();
app.use(express.static(path.join(__dirname, 'public')));
db.connectdb;


function getRandomInt(max) 
{
	return Math.floor(Math.random() * Math.floor(max));
}
			
const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'chatbot.html');


const server = app
  .use('/',(req, res) => res.sendFile(INDEX) )
  //.use('/test',(req, res) => res.sendFile(path.join(__dirname, 'test.html')) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
  
  
  

const io = socketIO(server);

var apiGetRes = function (socket,query,options) 
{
	console.log('Request', query);
	api.getRes(query,options).then(function(res)
	{
		console.log('Response', res);
		socket.emit('fromServer', { server: res });
	}).catch(function(error)
	{
		console.log('ErrorResponse', error);
		socket.emit('fromServer', { error: 'ERROR' });
	});
}

var fetchUser = function(sessionId,callback)
{
		db.selectWhereQuery("user",["sessionid"],[sessionId],function(result)
		{
			console.log(result);
			callback(result[0]); 
		});
}

var fetchUserByEmail = function(email,callback)
{
		db.selectWhereQuery("user",["email"],[email],function(result)
		{
			console.log(result);
			callback(result[0]); 
		});
}

var fetchEmail = function(sessionId,callback)
{
		fetchUser(sessionId,function(result)
		{
			if(result)
			{
				if((!result.email) || (result.verified!=1))
					callback(null);
				else
					callback(result.email); 
			}
			else
				callback(null);
		});
}

io.on('connection', (socket) => 
{
	console.log('Client connected');
	
	socket.on('fromClient', function (data) 
	{
		apiGetRes(socket,data.query,data.options);
	});
	
	socket.on('beginChatbot', function (data) 
	{
		var sessionId = data.options.sessionId;
		fetchUser(sessionId,function(user)
		{
			if(user && user.email && (user.verified==1))
			{
				var name = (user.name)?	user.name	:	user.email;
				apiGetRes(socket,"Welcome "+name+" back "+user.email,data.options);	
			}
			else
			{
				db.upsertQuery("user",["sessionid"],[sessionId],["sessionid"],sessionId);
				apiGetRes(socket,data.query,data.options);	
			}
		});
	});
	
	socket.on('checkMood', function (data) 
	{
		var sessionId = data.options.sessionId;
		fetchUser(sessionId,function(user)
		{
			var date = user.last_visited;
			var now = new Date();
			var dateDiff = now.getTime()-date.getTime();
			dateDiff = dateDiff / (60 * 60 * 1000);
			console.log("Hour diff: ", dateDiff);
			if(dateDiff<config.how_are_you_interval)
				socket.emit("fromServer",{	home : "home"	});
			else
				apiGetRes(socket,"mood of user",data.options);	
		});
		db.saveHistory("user","history_user",["sessionid"],[data.options.sessionId],"last_visited");
		db.updateQuery("user",["last_visited"],[new Date()],["sessionid"],data.options.sessionId);
	});
	
	socket.on('matchOTP', function (data) 
	{
		db.selectWhereQuery("user",["sessionid"],[data.options.sessionId],function(result)
		{
			console.log(result);
			if(result[0])
			{
				var date = result[0].otp_sent_at;
				var now = new Date();
				console.log("Date: ", date, "Now ", now);
				var dateDiff = now.getTime()-date.getTime();
				dateDiff = dateDiff / (60 * 1000);
				console.log("Minute diff: ", dateDiff);
				if(data.query==result[0].otp && dateDiff<=10)
				{
					apiGetRes(socket,"Screener-Start",data.options);
					db.updateQuery("user",["verified"],[1],["sessionid"],data.options.sessionId);
				}
				else
					apiGetRes(socket,"OTP invalid",data.options);
			}
		});
	});
	
	socket.on('sendMail', function (data) 
	{
		fetchUserByEmail(data.query,function(user)
		{
			if(user && (user.verified==1))
			{
				fetchUser(data.options.sessionId, function(new_user_rec)
				{
					db.saveHistory("user","history_user",["sessionid"],[user.sessionid],"last_visited");
					db.updateQuery("user",["last_visited","feeling"],[new_user_rec.last_visited,new_user_rec.feeling],["sessionid"],[user.sessionid]);
				});
				socket.emit('setServerSessionId',user.sessionid);
				var options = 
				{
					sessionId: user.sessionid,
					contexts: [{
					name: "screener-start",
					parameters: {},
					lifespan:1
				}]};
				apiGetRes(socket,"Screener-Start",options);
			}
			else
			{
				var otp = getRandomInt(1000000);
				mailer.sendMail(data.query,otp,function(error, response)
				{
					if(error)
					{
						console.log(error);
						apiGetRes(socket,"OTP error",data.options);
					}
					else
					{
						var date = new Date();
						db.updateQuery("user",["email","otp","otp_sent_at"],[data.query,otp,date],["sessionid"],[data.options.sessionId]);
						apiGetRes(socket,"OTP sent",data.options);
					}
				});
			}
		});
	});
	
	socket.on('recordFeelings', function (data) 
	{		
		if(data.query!="")
		{
			db.saveHistory("user","history_user",["sessionid"],[data.options.sessionId],"last_visited");
			db.updateQuery("user",["feeling","last_visited"],[data.query, new Date()],["sessionid"],[data.options.sessionId]);
		}
	});
	
	socket.on('findEmail', function (data) 
	{
		console.log("Find Email for session id: ", data.options.sessionId);
		fetchEmail(data.options.sessionId,function(email)
		{
			if(email)
				apiGetRes(socket,"Existing email"+ email,data.options);
			else
				apiGetRes(socket,"Request Email Id",data.options);
		});
	});	
	
	socket.on('disconnect', () => console.log('Client disconnected'));
});

//setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
