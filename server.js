const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
var api = require('./api');
var mailer = require('./mailer');
var app = express();
app.use(express.static(path.join(__dirname, 'public')));


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

var apiRequestResponse = function(query,sessionId,context)
{
	api.getRes(query,sessionId,context).then(function(res)
	{
		console.log('response', res);
		socket.emit('fromServer', { server: res });
	});
}

io.on('connection', (socket) => 
{
	console.log('Client connected');
	socket.on('fromClient', function (data) 
	{
		console.log('req', data.client);
		apiRequestResponse(data.client,data.sessionId,data.context);
	});
	
	socket.on('sendMail', function (data) 
	{
		mailer.sendMail(data.email,getRandomInt(1000000),function(error, response)
		{
			if(error)
			{
				console.log(error);
				apiRequestResponse("OTP error",data.sessionId,data.context);
			}
			else
			{
				console.log(response);
				apiRequestResponse("OTP sent",data.sessionId,data.context);
			}
		});
	});
	
	socket.on('disconnect', () => console.log('Client disconnected'));
});

//setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
