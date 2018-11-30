var Sentiment = require('sentiment');
var db = require('../database');

var sentiment = new Sentiment();
var english = {
  labels: require('./labels.json'),
  scoringStrategy: require('./scoring-strategy')
};
sentiment.registerLanguage('eng', english);

var sentimentAnalysis = function(message) 
{
	var response = sentiment.analyze(message,{ language: 'eng' });
	console.log(response);
	db.insertQuery("free_text_details",["senti_score", "free_text"],[parseInt(response.score), message]);
	
	if(response.positive.length==response.negative.length && parseInt(response.score)==0)
	{
		return 'a';
	}
	return(response.score);
}

module.exports = {sentimentAnalysis}