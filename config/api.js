var apiai = require('apiai');
var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');

// read the api.ai docs : https://api.ai/docs/

//Enter your API Key
var app = apiai('4efec7cafaf24ce098001d038606e132');

function getRandomInt(max) 
{
	return Math.floor(Math.random() * Math.floor(max));
}

// Function which returns speech from api.ai
var getRes = function(query) 
{
			var random1 = getRandomInt(100000);
			var random2 = getRandomInt(100000);
			var timestamp =  "" + parseInt(Date.now()) + random1 + random2;
			var sessionId ;
			//if (typeof(Storage) !== "undefined") 
			{
				// Store
				if(localStorage.getItem("sessionId")==null)
				{
					localStorage.setItem("sessionId", timestamp);
				}
				sessionId = localStorage.getItem("sessionId");
			} /*
			else 
			{
				document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
			}
			*/
	var request = app.textRequest(query, {
					sessionId: sessionId
	});
	const responseFromAPI = new Promise(
        function (resolve, reject) {
			request.on('error', function(error) {
				reject(error);
			});
			request.on('response', function(response) {
				//resolve(response.result.fulfillment.speech);
				resolve(response.result);
				console.log("Session id:", sessionId);
			});
		});
	request.end();
	return responseFromAPI;
};

// test the command :
//getRes('hello').then(function(res){console.log(res)});

module.exports = {getRes}
