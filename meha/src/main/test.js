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
*/
//-----------------------------Testing sentiment ----------------------------------------------------------------------------
var sentiment = require('./sentiment/sentimentAnalysis');
sentiment.sentimentAnalysis("big issue");
//-----------------------------Testing sentiment Ends------------------------------------------------------------------------
//-----------------------------Testing database------------------------------------------------------------------------------
//var db = require('./database');

//db.connectdb;
//db.upsertQuery("user",["email","otp"],["kpuranik08@gmail.com",123456],["browserid"],["test"]);
//db.saveHistory("user","history_user",["browserid"],["15433477358638753890021"],"chat_start",function(err)
//{
//	if(err) console.log("Err");
//	else
//		console.log('History saved');
//});
//db.insertQuery("user",["sessionid","last_visited"],["test2", new Date() ]);
//db.updateQuery("user",["email","chat_start"],["kkp", new Date() ],["browserid"],["test"],function(){});
/*db.selectWhereQuery("user",["sessionid","last_visited"],["15405336443718644775060","2018-10-26 12:06:23"],function(result)
{
	console.log(result);
});*/
/*db.selectQuery("user",function(result)
{
	console.log(result);
});*/
//-----------------------------Testing database Ends-------------------------------------------------------------------------

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
//const express = require('express');
//const socketIO = require('socket.io');
//var webhook = require('./webhook');
//var router = require('./router');

//const app = express();
//webhook.connectWebhook(app);
//const PORT = process.env.PORT || 3000;
//app.use('/chatbot', router);
//const server = app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
//const io = socketIO(server);
//-----------------------------Testing webhook Ends--------------------------------------------------------------------------

//-----------------------------Testing dict----------------------------------------------------------------------------------
//var request = require('request');
//const xml = require("xml-parse");
//	request('http://services.aonaware.com/DictService/DictService.asmx/DefineInDict?dictId=wn&word=depression', function (error, response, body) 
//	{
//		if (!error && response.statusCode == 200) 
//		{
//			var xmlBody = xml.parse(body);
//			for(var i in xmlBody)
//			{
//				if(xmlBody[i].hasOwnProperty('tagName') && xmlBody[i].tagName.localeCompare('WordDefinition')==0)
//				{
//						var wordDefinition = xmlBody[i].childNodes;
//						for(var j in wordDefinition)
//							if(wordDefinition[j].hasOwnProperty('tagName') &&  wordDefinition[j].tagName.localeCompare('Definitions')==0)
//							{
//									var definitions = wordDefinition[j].childNodes;
//									for(var k in definitions)
//										if(definitions[k].hasOwnProperty('tagName') && definitions[k].tagName.localeCompare('Definition')==0)
//										{
//											var definition = definitions[k].childNodes;
//											for(var l in definition)
//												if(definition[l].hasOwnProperty('tagName') && definition[l].tagName.localeCompare('WordDefinition')==0)
//														console.log(definition[l].childNodes[0].text);
//										}
//							}
//				}
//			}
//		}
//	});
//-----------------------------Testing dict Ends-----------------------------------------------------------------------------