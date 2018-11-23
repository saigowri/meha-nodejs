var express = require('express')
const path = require('path');
var router = express.Router();
var request = require('request');
var config = require('./webapp/conf/config.json');
var userInfo; 

request(config.pushd_url+config.pushd_api_userinfo, function (error, response, body) 
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
	res.cookie("mehaEmail", "no-email");
	res.cookie("mehaName", "no-name");
	for (var key in userInfo)
	{
		//console.log(userInfo[key].mailId);
		if(userid==userInfo[key].id)
		{
			res.cookie("mehaEmail", userInfo[key].mailId);
			if(userInfo[key].hasOwnProperty('name'))
				res.cookie("mehaName", userInfo[key].name);
			break;		
		}
	}	
	res.sendFile(INDEX);
})

//console.log('Userid: '+userid);
module.exports = router