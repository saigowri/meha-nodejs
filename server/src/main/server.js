const express = require('express');
var router = require('./router');
const socketIO = require('socket.io');
var api = require('./api');
var mailer = require('./mailer');
var sentiment = require('./sentimentAnalysis');
var db = require('./database');
var config = require('./webapp/conf/config.json');
var log = require('./logger/logger')(module);


var app = express();
app.use('/chatbot', router);
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => log.info(`Listening on ${ PORT }`));

db.connectdb;

function getRandomInt(max) 
{
	return Math.floor(Math.random() * Math.floor(max));
}

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) 
{
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

function deg2rad(deg) 
{
  return deg * (Math.PI/180)
}
			
  


const io = socketIO(server);

var apiGetRes = function (socket,query,options) 
{
	log.debug('Request: '+query);
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

io.on('connection', (socket) => 
{
	var sessionId;
	log.info('Client connected');
	
	socket.on('fromClient', function (data) 
	{
		apiGetRes(socket,data.query,data.options);
	});
	
	socket.on('logChatStart', function (data) 
	{
		sessionId = data.sessionId;
		var fields = ["chat_start","chat_end","browserid"];
		var values = [new Date(data.chat_start),new Date("1970-01-01"),sessionId];
		if(data.email.localeCompare('no-email')!=0)
		{
			fields.push("email");
			values.push(data.email);
			fields.push("verified");
			values.push(1);
		}
		db.upsertQuery("user",fields,values,["browserid"],sessionId);
	});	
	
	socket.on('logChatEnd', function (data) 
	{
		sessionId = data.sessionId;
		db.updateQuery("user",["chat_end"],[new Date(data.chat_end)],["browserid"],[sessionId]);
		db.saveHistory("user","history_user",["browserid"],[sessionId],"chat_start");
	});	
	
	socket.on('recordFeelings', function (data) 
	{		
		if(data.query!="")
		{
			db.upsertQuery("user",["feeling","browserid"],[data.query,data.options.sessionId],["browserid"],[data.options.sessionId]);
		}
	});
	
	socket.on('beginChatbot', function (data) 
	{
		sessionId = data.options.sessionId;
		var context;
		var query;
		var reply;
		var makeRequest = function(query,reply,context)
		{
			var options = {
							sessionId: sessionId,
							contexts: [{
							name: "followup",
							parameters: {"reply":reply},
							lifespan:1
						},{
							name: context,
							parameters: {},
							lifespan:1
						}]};				
			apiGetRes(socket,query,options);
		}
		var email = data.options.contexts[0].parameters.email;
		var name = data.options.contexts[0].parameters.name;
		// If it is a pushd user. 
		if(email.localeCompare('no-email')!=0)
		{			
			log.debug("Begin chat with a pushd user. (email: "+email+"+, browserid: "+sessionId+")");
			// Check if user already exists
			db.selectWhereQuery("user",["email"],[email],function(result)
			{
				// Reply with email, if name is not present
				reply = 'Hi ';
				var address = (name.localeCompare('no-name'))? name:email;
				reply = reply + address + ', Welcome ';
				log.debug(JSON.stringify(result));
				// if user already has browserid replace the current browserid with the previously recorded browserid
				if(result[0])
				{
					var user = result[0];
					reply = reply + 'back! ';
					sessionId = user.browserid;
					socket.emit('setServerSessionId',user.browserid);
					// Check if the user has been already asked for mood before
					var date = user.chat_start;
					var now = new Date();
					var dateDiff = now.getTime()-date.getTime();
					dateDiff = dateDiff / (60 * 60 * 1000);
					log.debug("Hour diff between this chat and previous chat: "+dateDiff);
					if(dateDiff<config.how_are_you_interval)
					{
						// If the user has been already asked for mood before
						context = "customWelcomeIntent";
						query = "Custom welcome intent";
						makeRequest(query,reply,context);
					}
					else
					{
						context = "begin-chatbot";
						query = "Begin Chatbot";
						makeRequest(query,reply,context);
					}
				}
				else
				{
					reply = reply + 'to MeHA, your mental health assistant!';
					context = "begin-chatbot";
					query = "Begin Chatbot";
					makeRequest(query,reply,context);
				}
			});
		}
		// If it is a new user, give the default response of asking for mood. 
		//And no need to record it in the database. 
		else
		{
			log.debug("Begin chat with a new user. (browserid: "+sessionId+")");
			reply = "Hello, I am MeHA, your mental health assistant!";
			query = data.query;
			context = "begin-chatbot";
			// Check if the browserid has already been taken by a pushd user
			db.selectWhereQuery("user",["browserid"],[sessionId],function(result)
			{
				// if so assign a new browserid (reset browserid)
				if(result[0] && result[0].email && result[0].verified===1)
				{
					var random1 = getRandomInt(100000);
					var random2 = getRandomInt(100000);
					sessionId =  "" + parseInt(Date.now()) + random1 + random2;
					log.debug("Changing browserid: "+sessionId);
					socket.emit('setServerSessionId',sessionId);
					makeRequest(query,reply,context);
				}
				else
					makeRequest(query,reply,context);
			});
		}	
	});
	
		
	socket.on('matchOTP', function (data) 
	{
		db.selectWhereQuery("user",["browserid"],[data.options.sessionId],function(result)
		{
			log.debug(result);
			if(result[0])
			{
				var date = result[0].otp_sent_at;
				var now = new Date();
				log.debug("Date: "+date+" \tNow: ", now);
				var dateDiff = now.getTime()-date.getTime();
				dateDiff = dateDiff / (60 * 1000);
				log.debug("Minute diff: "+ dateDiff);
				if(data.query==result[0].otp && dateDiff<=10)
				{
					apiGetRes(socket,"Screener-Start",data.options);
					db.updateQuery("user",["verified"],[1],["browserid"],data.options.sessionId);
				}
				else
					apiGetRes(socket,"OTP invalid",data.options);
			}
		});
	});
	
	socket.on('sendMail', function (data) 
	{
		var otp = getRandomInt(1000000);
				
		mailer.sendMail(data.query,"Thank you for registering with MeHA",
			"Your OTP is "+otp, "<div><b>Your OTP is "+otp+"</b></div><div><b>This is valid for 10 minutes.</b></div>",
			function(error, response)
			{
				if(error)
				{
					log.error(error);
					apiGetRes(socket,"OTP error",data.options);
				}
				else
				{
					var date = new Date();
					db.updateQuery("user",["email","otp","otp_sent_at"],[data.query,otp,date],["browserid"],[data.options.sessionId]);
					apiGetRes(socket,"OTP sent",data.options);
				}
			});
	});
	
	socket.on('sentimentAnalysis', function(data)
	{
		log.debug(data.query);
		var emoticonScore = data.options.contexts[0].parameters.sentiScore;
		var freeTextScore = sentiment.sentimentAnalysis(data.query);
		var totalScore = parseInt(emoticonScore) + parseInt(freeTextScore);
		log.debug("emoticon score "+ emoticonScore);
		log.debug("free text score "+ freeTextScore);
		log.debug("total senti score "+ totalScore);
		if(parseInt(totalScore) < 0)
		{
			apiGetRes(socket,"Request Email Id", data.options);
		}
		else if(parseInt(totalScore) > 0 && parseInt(freeTextScore) > 0)
		{
			var options = 
				{
					sessionId: data.options.sessionId,
					contexts: [{
					name: "followup",
					parameters: {"reply":"Glad to hear that! "},
					lifespan:1
				},{
					name: "customWelcomeIntent",
					parameters: {},
					lifespan:1
				}]};
			apiGetRes(socket,"Custom welcome intent",options);
		}
		else if(parseInt(totalScore) > 0)
		{
			var options = 
				{
					sessionId: data.options.sessionId,
					contexts: [{
					name: "followup",
					parameters: {"reply":"Hmm okay.."},
					lifespan:1
				},{
					name: "customWelcomeIntent",
					parameters: {},
					lifespan:1
				}]};
			apiGetRes(socket,"Custom welcome intent",options);
		}
		else
		{
			var options = 
				{
					sessionId: data.options.sessionId,
					contexts: [{
					name: "Lighten-mood",
					parameters: {},
					lifespan:1
				}]};
			apiGetRes(socket,"lighten mood", options);
		}
	});	

	socket.on('hospitalFinder', function (data) 
	{	
		log.debug('latitude in server '+ data.query[0]);
		log.debug('longitude in server '+ data.query[1]);
		var a = data.query[0];
		var b = data.query[1];
		// a = 11.1273;
		// b = 75.8957;
		var hos = " ";
		var st = " ";
		var d = 99999999999999.9999999999999;
		db.selectQuery("Hospitals",function(result)
		{	
			log.debug(result);
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

	        log.debug('hospital in server '+ hos);
			log.debug('distance in server '+ d ); 
			apiGetRes(socket,"hospital " + hos ,data.options);

		});
		

	});

	socket.on('LocationDenied', function (data) 
	{	
		log.debug(data);
		apiGetRes(socket,"nolocation",data.options);
	});	
	
	socket.on('disconnect', () => 
	{
		log.info("Disconnecting session "+ sessionId);
		db.selectWhereQuery("user",["browserid"],[sessionId],function(result)
		{
			console.log(result);
			if(result[0] && result[0].chat_end.getTime()===0)
			{
				db.updateQuery("user",["chat_end"],[new Date()],["browserid"],[sessionId]);
				db.saveHistory("user","history_user",["browserid"],[sessionId],"chat_start");
			}
		});
	});
});

//setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
