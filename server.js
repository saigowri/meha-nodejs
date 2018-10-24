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

io.on('connection', (socket) => 
{
	console.log('Client connected');
	
	socket.on('fromClient', function (data) 
	{
		apiGetRes(socket,data.query,data.options);
	});
	
	socket.on('matchOTP', function (data) 
	{
		db.selectWhereQuery("user","sessionid",data.options.sessionId,function(result)
		{
			console.log(result);
			if(result[0])
			{
				var date = new Date(result[0].otp_sent_at);
				var now = new Date();
				var dateDiff = now.getTime()-date.getTime();
				dateDiff = dateDiff / (60 * 1000);
				console.log("Date diff: ", dateDiff);
				if(data.query==result[0].otp && dateDiff<=10)
				{
					apiGetRes(socket,"Screener-Start",data.options);
					db.updateQuery("user", "verified = 1",
					"sessionid = '"+data.options.sessionId+"'", function(result){});
				}
				else
					apiGetRes(socket,"OTP invalid",data.options);
			}
		});
	});
	
	socket.on('sendMail', function (data) 
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
				var dt = new Date();
				var dtString = dt.toString();
				db.updateQuery("user",
					"email = '"+data.query+"',otp = "+otp+", otp_sent_at = '"+dtString+"'",
					"sessionid = '"+data.options.sessionId+"'",
				function(result)
				{
					console.log(result);
				});
				apiGetRes(socket,"OTP sent",data.options);
			}
		});
	});
	
	socket.on('findEmail', function (data) 
	{
		console.log("Find Email for session id: ", data.options.sessionId);
		db.selectWhereQuery("user","sessionid",data.options.sessionId,function(result)
		{
			console.log(result);
			if(result[0])
			{
				if((!result[0].email) || (result[0].verified!=13))
					apiGetRes(socket,"Request Email Id",data.options);
			}
			else
			{
				db.insertQuery("user","sessionid","'"+data.options.sessionId+"'",function(result)
				{
					console.log(result);
				});
				apiGetRes(socket,"Request Email Id",data.options);
			}
		});
	});	
	
	socket.on('disconnect', () => console.log('Client disconnected'));
});

//setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
