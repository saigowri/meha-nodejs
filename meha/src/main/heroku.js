const express = require('express');
const socketIO = require('socket.io');
var webhook = require('./webhook');
var router = require('./router');

const app = express();
webhook.connectWebhook(app);
const PORT = process.env.PORT || 3000;
app.use('/chatbot', router);
const server = app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
const io = socketIO(server);