var apiai = require('apiai');

// read the api.ai docs : https://api.ai/docs/

//Enter your API Key
var app = apiai('4efec7cafaf24ce098001d038606e132');

// Function which returns speech from api.ai
var getRes = function(query,sessionId,context) 
{
	var options = {
    sessionId: sessionId,
    contexts: [{
            name: context,
            parameters: {}
        }]
	};
	var request = app.textRequest(query, options);
	const responseFromAPI = new Promise(
        function (resolve, reject) {
			request.on('error', function(error) {
				reject(error);
			});
			request.on('response', function(response) {
				//resolve(response.result.fulfillment.speech);
				resolve(response);
			});
		});
	request.end();
	return responseFromAPI;
};

// test the command :
//getRes('hello').then(function(res){console.log(res)});

module.exports = {getRes}
