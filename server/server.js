const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
var api = require('./api');
var mailer = require('./mailer');
var db = require('./database');
var config = require('./config.json');
var log = require('./logger/logger')(module);

var app = express();
app.use(express.static(path.join(__dirname, 'public')));
db.connectdb;

function getRandomInt(max) 
{
	return Math.floor(Math.random() * Math.floor(max));
}

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}
			
const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'chatbot.html');


const server = app
  .use('/:userid',(req, res) => res.sendFile(INDEX) )
  //.use('/test',(req, res) => res.sendFile(path.join(__dirname, 'test.html')) )
  .listen(PORT, () => log.info(`Listening on ${ PORT }`));
  
  
  

const io = socketIO(server);

var apiGetRes = function (socket,query,options) 
{
	console.log('Request', query);
	api.getRes(query,options).then(function(res)
	{
		log.debug('Response', res);
		socket.emit('fromServer', { server: res });
	}).catch(function(error)
	{
		log.error('ErrorResponse', error);
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
	log.info('Client connected');
	
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
			var date = user.chat_start;
			var now = new Date();
			var dateDiff = now.getTime()-date.getTime();
			dateDiff = dateDiff / (60 * 60 * 1000);
			console.log("Hour diff: ", dateDiff);
			if(dateDiff<config.how_are_you_interval)
				socket.emit("fromServer",{	home : "home"	});
			else
				apiGetRes(socket,"mood of user",data.options);	
		});
		db.saveHistory("user","history_user",["sessionid"],[data.options.sessionId],"chat_start");
		db.updateQuery("user",["chat_start"],[new Date()],["sessionid"],data.options.sessionId);
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
					db.saveHistory("user","history_user",["sessionid"],[user.sessionid],"chat_start");
					db.updateQuery("user",["chat_start","feeling"],[new_user_rec.chat_start,new_user_rec.feeling],["sessionid"],[user.sessionid]);
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
				
				mailer.sendMail(data.query,"Thank you for registering with MeHA",
					"Your OTP is "+otp, "<div><b>Your OTP is "+otp+"</b></div><div><b>This is valid for 10 minutes.</b></div>",
					function(error, response)
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
socket.on('hospitalFinder', function (data) 
	{	
		console.log('latitude in server', data.query[0]);
		console.log('longitude in server', data.query[1]);
		var a = data.query[0];
		var b = data.query[1];
		// a = 11.1273;
		// b = 75.8957;
		var hos = " ";
		var st = " ";
		var d = 99999999999999.9999999999999;
		db.selectQuery("Hospitals",function(result)
		{	
			console.log(result);
			for (i in result) {

                var x = result[i].lat;
                var y = result[i].longi;
                var dist = getDistanceFromLatLonInKm(a,b,x,y);
              
               	if (d >= dist){
	                d = dist;
	                hos = result[i].hospital;
	                st = result[i].state;
                }
            }

            d = d.toFixed(2);

	        console.log('hospital in server', hos);
			console.log('distance in server', d ); 
			apiGetRes(socket,"hospital " + hos ,data.options);

		});
		

	});

	socket.on('LocationDenied', function (data) 
	{	console.log(data);
		apiGetRes(socket,"nolocation",data.options);
	});




	socket.on('matchOTP2', function (data) 
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
					var sessionId = data.options.sessionId;
					fetchUser(sessionId,function(user)
					{
						var date = user.chat_start;
						var now = new Date();
						var dateDiff = now.getTime()-date.getTime();
						dateDiff = dateDiff / (60 * 60 * 1000);
						console.log("Hour diff: ", dateDiff);
						if(dateDiff<config.how_are_you_interval)
							apiGetRes(socket,"Def intent",data.options);
						else
							apiGetRes(socket,"mood of user",data.options);	
					});
					db.saveHistory("user","history_user",["sessionid"],[data.options.sessionId],"chat_start");
					db.updateQuery("user",["chat_start"],[new Date()],["sessionid"],data.options.sessionId);
					db.updateQuery("user",["verified"],[1],["sessionid"],data.options.sessionId);
				}
				else
					apiGetRes(socket,"OTP invalid",data.options);
			}
		});
	});

	socket.on('sendMail2', function (data) 
	{
		var otp = getRandomInt(1000000);				
		mailer.sendMail(data.query,"Thank you for registering with MeHA",
					"Your OTP is "+otp, "<div><b>Your OTP is "+otp+"</b></div><div><b>This is valid for 10 minutes.</b></div>",
			function(error, response)
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
			
	});
	
	socket.on(' ', function (data) 
	{		
		if(data.query!="")
		{
			db.saveHistory("user","history_user",["sessionid"],[data.options.sessionId],"chat_start");
			db.updateQuery("user",["feeling","chat_start"],[data.query, new Date()],["sessionid"],[data.options.sessionId]);
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
