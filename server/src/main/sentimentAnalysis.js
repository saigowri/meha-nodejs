var sentiment = require('node-sentiment');

var sentimentAnalysis = function(message) 
{
	var response = sentiment(message,'en');
	return response.score;
}

module.exports = {sentimentAnalysis}