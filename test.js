
var db = require('./database');
db.connectdb;
//db.insertQuery("user",["sessionid","last_visited"],["test2", new Date() ]);
db.updateQuery("user",["email","last_visited"],["kkp", new Date() ],["sessionid"],["15385417090697801389572"]);
db.selectWhereQuery("user",["sessionid"],["15385417090697801389572"],function(result)
{
	console.log(result);
});