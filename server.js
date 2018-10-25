const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
var api = require('./api');
var mailer = require('./mailer');
var db = require('./database');

var app = express();
app.use(express.static(path.join(__dirname, 'public')));
db.connectdb;


function getRandomInt(max) 
{
	return Math.floor(Math.random() * Math.floor(max));
}
			
const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');


const server = app
  .use('/chatbot',(req, res) => res.sendFile(INDEX) )
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
		fetchEmail(sessionId,function(email)
		{
			console.log("Email: ",email);
			if(email)
				apiGetRes(socket,"Welcome back "+email,data.options);	
			else
			{
				db.upsertQuery("user",["sessionid","last_visited"],[sessionId,new Date()],["sessionid"],sessionId);
				apiGetRes(socket,data.query,data.options);	
			}
		});
	});
	
	socket.on('checkMood', function (data) 
	{
		db.updateQuery("user",["last_visited"],[new Date()],["sessionid"],data.options.sessionId);
		var sessionId = data.options.sessionId;
		fetchUser(sessionId,function(user)
		{
			var date = user.last_visited;
			var now = new Date();
			var dateDiff = now.getTime()-date.getTime();
			dateDiff = dateDiff / (60 * 60 * 1000);
			console.log("Hour diff: ", dateDiff);
			if(dateDiff<24)
				socket.emit("fromServer",{	home : "home"	});
			else
				apiGetRes(socket,"mood of user",data.options);	
		});
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
						db.updateQuery("user",["email","otp","otp_sent_at"],[data.query,otp,date],["sessionid"],data.options.sessionId);
						apiGetRes(socket,"OTP sent",data.options);
					}
				});
			}
		});
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
