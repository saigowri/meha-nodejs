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


io.on('connection', (socket) => 
{
	console.log('Client connected');
	
	socket.on('fromClient', function (data) 
	{
		console.log('req', data.query);
		api.getRes(data.query,data.options).then(function(res)
		{
			console.log('response', res);
			socket.emit('fromServer', { server: res });
		}).catch(function(error)
		{
			console.log(error);
			socket.emit('fromServer', { error: 'ERROR' });
		});
	});
	
	socket.on('matchOTP', function (data) 
	{
		console.log('Match OTP req: ', data.query);
		if(data.query==123456)
		{
			api.getRes("Screener-Start",data.options).then(function(res)
			{
				console.log('response', res);
				socket.emit('fromServer', { server: res });
			}).catch(function(error)
			{
				console.log(error);
				socket.emit('fromServer', { error: 'ERROR' });
			});
		}
		else
		{
			api.getRes("OTP invalid",data.options).then(function(res)
			{
				console.log('response', res);
				socket.emit('fromServer', { server: res });
			}).catch(function(error)
			{
				console.log(error);
				socket.emit('fromServer', { error: 'ERROR' });
			});
		}
	});
	
	socket.on('sendMail', function (data) 
	{
		mailer.sendMail(data.query,getRandomInt(1000000),function(error, response)
		{
			if(error)
			{
				console.log(error);
				api.getRes("OTP error",data.options).then(function(res)
				{
					console.log('response', res);
					socket.emit('fromServer', { server: res });
				}).catch(function(error)
				{
					console.log(error);
					socket.emit('fromServer', { error: 'ERROR' });
				});

			}
			else
			{
				console.log(response);
				api.getRes("OTP sent",data.options).then(function(res)
				{
					console.log('response', res);
					socket.emit('fromServer', { server: res });
				}).catch(function(error)
				{
					console.log(error);
					socket.emit('fromServer', { error: 'ERROR' });
				});
			}
		});
	});
	
	socket.on('disconnect', () => console.log('Client disconnected'));
});

//setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
