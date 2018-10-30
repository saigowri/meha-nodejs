
var db = require('./database');
db.connectdb;
//db.insertQuery("user",["sessionid","last_visited"],["test2", new Date() ]);
///db.updateQuery("user",["email","last_visited"],["kkp", new Date() ],["sessionid"],["test2"]);
/*db.selectWhereQuery("user",["sessionid","last_visited"],["15405336443718644775060","2018-10-26 12:06:23"],function(result)
{
	console.log(result);
});*/
db.selectQuery("user",function(result)
{
	console.log(result);
});
//db.saveHistory("user","history_user",["sessionid"],["15405358294681413562583"],"last_visited");