var express = require('express')
const path = require('path');
var router = express.Router();
var userid = null;

const INDEX = path.join(__dirname, 'chatbot.html');

// middleware that is specific to this router
router.use(express.static(path.join(__dirname, 'webapp')))

// define the home page route
router.get('/', function (req, res) 
{
	userid = req.query.userid;
	res.cookie("userid", userid); 
	res.sendFile(INDEX);
})

//console.log('Userid: '+userid);
module.exports = router