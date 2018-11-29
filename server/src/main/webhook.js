const bodyParser = require('body-parser');
var request = require('request');
const xml = require("xml-parse");
var config = require('./webapp/conf/config.json');

var wordNotFound = function(res)
{
	var fulfillment= 
		{
			source: 'webhook',
			payload: { 
				instructions: [{
					text: "Sorry I am not able understand. If you provide the name of any illness/disease, I can help you with details about the same."
				}],
				width:12,
				enabled:true,
				Option:[
					{title:"Ask again"},
					{title:"Continue with the conversation"}
				]
			}
		};
	res.status(200).json(fulfillment);
};

var searchWord = function(disease,res, callback)
{
	request(config.webhook_dictionary+disease, function (error, response, body) 
	{
		var webhookReply = "";
		if (!error && response.statusCode == 200) 
		{
			var found = false;
			var xmlBody = xml.parse(body);
			for(var i in xmlBody)
			{
				if(xmlBody[i].hasOwnProperty('tagName') && xmlBody[i].tagName.localeCompare('WordDefinition')==0)
				{
						var wordDefinition = xmlBody[i].childNodes;
						for(var j in wordDefinition)
							if(wordDefinition[j].hasOwnProperty('tagName') &&  wordDefinition[j].tagName.localeCompare('Definitions')==0)
							{
									var definitions = wordDefinition[j].childNodes;
									for(var k in definitions)
										if(definitions[k].hasOwnProperty('tagName') && definitions[k].tagName.localeCompare('Definition')==0)
										{
											var definition = definitions[k].childNodes;
											for(var l in definition)
												if(definition[l].hasOwnProperty('tagName') && definition[l].tagName.localeCompare('WordDefinition')==0)
												{
													found = true;
													var webhookReply = definition[l].childNodes[0].text;
													webhookReply = webhookReply.replace(/\n/g, "</br>");
													//console.log(webhookReply);
													  res.status(200).json({
														source: 'webhook',
														//fulfillmentText: webhookReply,
														payload: { 
																instructions: [{
																			text: "According to services.aonaware, under WordNet (r) 2.0 dictionary,"
																		},{
																			text: ""+webhookReply
																		}, {
																			text: "For additional details please refer the link - "
																		}, {
																			link: {
																				title: "services.aonaware",
																				url: "http://services.aonaware.com/DictService/Default.aspx"
																			}
																		},{
																			text: "Was the information provided helpful?"
																		}],
																	width:6,
																	Option:[
																		{title:"Yes"},
																		{title:"No"},
																		{title:"Another query"}
																	]
															}
													  })
												}
										}
							}
				}
			}
			if(!found) callback();
		}
		else
			callback();
	});
	//callback();
 }
 
 var matchWord = function(disease,res)
 {
  // match closest words
  request(config.webhook_match+disease, function (error, response, body) 
	{
		var fulfillment= 
		{
			source: 'webhook',
			payload: { 
				instructions: [{
					text: "Sorry I am not able to find the meaning of the word "+disease+", under WordNet (r) 2.0 dictionary, in the following link -"
				},{
					link: {
							title: "services.aonaware",
							url: "http://services.aonaware.com/DictService/Default.aspx"
					}
				}],
				width:12,
				Option:[]
			}
		};
		var found = false;
		if (!error && response.statusCode == 200) 
		{
			var xmlBody = xml.parse(body);
			for(var i in xmlBody)
			{
				if(xmlBody[i].hasOwnProperty('tagName') && xmlBody[i].tagName.localeCompare('ArrayOfDictionaryWord')==0)
				{
						var arrayOfDictionaryWord = xmlBody[i].childNodes;
						for(var j in arrayOfDictionaryWord)
							if(arrayOfDictionaryWord[j].hasOwnProperty('tagName') &&  arrayOfDictionaryWord[j].tagName.localeCompare('DictionaryWord')==0)
							{
									var dictionaryWord = arrayOfDictionaryWord[j].childNodes;
									for(var k in dictionaryWord)
										if(dictionaryWord[k].hasOwnProperty('tagName') && dictionaryWord[k].tagName.localeCompare('Word')==0)
										{
											found = true;
											fulfillment.payload.Option.push({title:"What is "+dictionaryWord[k].childNodes[0].text+" ?"});
											console.log(dictionaryWord[k].childNodes[0].text);
										}
							}
				}
			}
		}
		if(found) 
		{
			fulfillment.payload.instructions.push({text:"Did you mean to ask, "});
			fulfillment.payload.Option.push({title:"No, Continue with the conversation"});
		}
		else
			fulfillment.payload.Option.push({title:"Continue with the conversation"});
		res.status(200).json(fulfillment);
		//else
			//wordNotFound(res);
	});
 }

var mentalHealthInfo = function(req, res)
{
  // parameters are stored in req.body.queryResult.parameters 
  if(!req.body.queryResult.parameters.hasOwnProperty('disease')) wordNotFound(res);
  var disease = req.body.queryResult.parameters['disease'];
  searchWord(disease,res, function()
  {
	  matchWord(disease,res);
  });
   
  }

var connectWebhook = function(app)
{
app.use(bodyParser.json())

const REQUIRE_AUTH = true
const AUTH_TOKEN = '4efec7cafaf24ce098001d038606e132'

app.get('/', function (req, res) {
  res.send('Use the /webhook endpoint.')
})
app.get('/webhook', function (req, res) {
  res.send('You must POST your request')
})

app.post('/webhook', function (req, res) {
  // we expect to receive JSON data from api.ai here.
  // the payload is stored on req.body
  console.log(req.body)

  // we have a simple authentication
  if (REQUIRE_AUTH) {
    if (req.headers['auth-token'] !== AUTH_TOKEN) {
      return res.status(401).send('Unauthorized')
    }
  }

  // and some validation too
  if (!req.body || !req.body.queryResult ) {
    return res.status(400).send('Bad Request')
  }

  // the value of Action from api.ai is stored in req.body.result.action
  console.log('* Received action -- %s', req.body.queryResult.action)

  var action = req.body.queryResult.action;
  if(req.body.queryResult.hasOwnProperty('action') && req.body.queryResult.action.localeCompare('mental-health-info')==0)
	mentalHealthInfo(req, res);
  else
	  res.status(404).send('Webhook undefined');
  
  
})
};

module.exports = {connectWebhook}
