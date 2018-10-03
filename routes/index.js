var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/chatbot', function(req, res, next) 
{
  res.render('index', { title: 'Mental Health Assistant' });
});




module.exports = router;
