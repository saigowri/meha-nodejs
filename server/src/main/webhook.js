const bodyParser = require('body-parser');
var request = require('request');
const xml = require("xml-parse");
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
  // parameters are stored in req.body.result.parameters 
  var disease = req.body.queryResult.parameters['disease'];
  var webhookReply = "";
  request('http://services.aonaware.com/DictService/DictService.asmx/DefineInDict?dictId=wn&word=depression', function (error, response, body) 
	{
		if (!error && response.statusCode == 200) 
		{
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
													var webhookReply = definition[l].childNodes[0].text;
													//webhookReply = webhookReply.replace(/"/g, "-");
													//webhookReply = webhookReply.replace(/:/g, "-");
													//webhookReply = webhookReply.replace(/{/g, "(");
													//webhookReply = webhookReply.replace(/}/g, ")");
													//webhookReply = webhookReply.replace(/\[/g, "(");
													//webhookReply = webhookReply.replace(/]/g, ")");
													//webhookReply = webhookReply.split("\n")[0];
													console.log(webhookReply);
													  res.status(200).json({
														source: 'webhook-dm',
														//fulfillmentText: webhookReply,
														payload: { 
																instructions: [{
																			text: "According to aonaware, "+webhookReply
																		}, {
																			text: "For additional details please refer the link - "
																		}, {
																			link: {
																				title: "services.aonaware",
																				url: "http://services.aonaware.com/DictService/Default.aspx?action=define&dict=*&query=alzhimers+"
																			}
																		}]
															}
													  })
												}
										}
							}
				}
			}
		}
	});
  

})
};

module.exports = {connectWebhook}
