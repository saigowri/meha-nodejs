const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
var api = require('./api');
var app = express();
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = app
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('fromClient', function (data) 
	{
		console.log('req', data.client);
        api.getRes(data.client).then(function(res){
        console.log('response', res);
        socket.emit('fromServer', { server: res });
        });
	});
  socket.on('disconnect', () => console.log('Client disconnected'));
});

//setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
