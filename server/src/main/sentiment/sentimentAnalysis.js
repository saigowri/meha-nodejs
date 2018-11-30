var Sentiment = require('sentiment');
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
	return(response.score);
	if(response.positive.length==response.negative.length && parseInt(response.score)==0)
	{
		return 'a';
	}
}

module.exports = {sentimentAnalysis}