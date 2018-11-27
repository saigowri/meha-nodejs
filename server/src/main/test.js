//var http = require('http');

/*function parseCookies (request) {
    var list = {},
        rc = request.headers.cookie;

    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });
	console.log("List o cookies",list);
    //return list;
}
http.createServer(function (request, response) {

  // To Read a Cookie
  var cookies = parseCookies(request);

  // To Write a Cookie
  response.writeHead(200, {
    'Set-Cookie': 'mycookie=test',
    'Content-Type': 'text/plain'
  });
  response.end('Hello World\n');
}).listen(8124);
*/
//console.log('Server running at http://127.0.0.1:8124/');
//var db = require('./database');

//db.connectdb;
//db.insertQuery("user",["sessionid","last_visited"],["test2", new Date() ]);
///db.updateQuery("user",["email","last_visited"],["kkp", new Date() ],["sessionid"],["test2"]);
/*db.selectWhereQuery("user",["sessionid","last_visited"],["15405336443718644775060","2018-10-26 12:06:23"],function(result)
{
	console.log(result);
});*/
/*db.selectQuery("user",function(result)
{
	console.log(result);
});*/
//db.saveHistory("user","history_user",["sessionid"],["15405358294681413562583"],"last_visited");

//var sentiment = require('./sentimentAnalysis');
//var freeTextScore = sentiment.sentimentAnalysis('I dont know');
//console.log(freeTextScore);


//-----------------------------Testing logger--------------------------------------------------------------------------------
//var log = require('./logger/logger')(module);
//log.info("Test");
//-----------------------------Testing logger Ends---------------------------------------------------------------------------

//-----------------------------Testing chat snapshot logger------------------------------------------------------------------
//var chat_snapshot = require('./logger/snapshot_logger');
//chat_snapshot.logChat("test.log","again");
//-----------------------------Testing chat snapshot logger Ends-------------------------------------------------------------

//-----------------------------Testing webhook-------------------------------------------------------------------------------
const express = require('express');
const socketIO = require('socket.io');
var webhook = require('./webhook');
var router = require('./router');
//var report = require('./report');
var api = require('./api');
//var mailer = require('./mailer');
//var sentiment = require('./sentimentAnalysis');
//var db = require('./database');
//var config = require('./webapp/conf/config.json');
//var log = require('./logger/logger')(module);
//var chat_snapshot = require('./logger/snapshot_logger');

const app = express();
webhook.connectWebhook(app);
const PORT = process.env.PORT || 3000;
app.use('/chatbot', router);
const server = app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
const io = socketIO(server);
//-----------------------------Testing webhook Ends--------------------------------------------------------------------------