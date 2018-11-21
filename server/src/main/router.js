var express = require('express')
const path = require('path');
var router = express.Router();
var request = require('request');
var userInfo; 

request('http://localhost:8080/pushd/webapi/external/userInfo/tytuh6', function (error, response, body) 
{
    if (!error && response.statusCode == 200) 
        userInfo = JSON.parse(body);
});

const INDEX = path.join(__dirname, 'chatbot.html');

// middleware that is specific to this router
router.use(express.static(path.join(__dirname, 'webapp')))

// define the home page route
router.get('/', function (req, res) 
{
	var userid = req.query.userid;
	for (var key in userInfo)
	{
		console.log(userInfo[key].mailId);
		if(userid==userInfo[key].id)
		{
			res.cookie("email", userInfo[key].mailId);
			break;		
		}
	}
	res.sendFile(INDEX);
})

//console.log('Userid: '+userid);
module.exports = router