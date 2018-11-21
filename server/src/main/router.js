var express = require('express')
const path = require('path');
var router = express.Router();

const INDEX = path.join(__dirname, 'chatbot.html');

// middleware that is specific to this router
router.use(express.static(path.join(__dirname, 'webapp')))

// define the home page route
router.get('/', function (req, res) 
{
	console.log('Userid: '+req.query.userid);
	res.sendFile(INDEX)
})

module.exports = router