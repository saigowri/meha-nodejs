var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "meha",
  password: "Password1",
  database: "mehaDB"
});

var connectdb = con.connect(function(err) 
{
  if (err) throw err;
  console.log("Connected!");
});

var selectQuery = function(table,callback)
{
	con.query("SELECT * FROM " + table , function (err, result, fields) 
  {
    if (err) throw err;
    //console.log(result);
	callback(result);
  });
};

var selectWhereQuery = function(table,field,fieldVal,callback)
{
	con.query("SELECT * FROM " + table +" WHERE "+ field + " = '"+fieldVal+"'", function (err, result, fields) 
  {
    if (err) throw err;
    //console.log(result);
	callback(result);
  });
};

var updateQuery = function(table,set,conditions,callback)
{
	var sql = "UPDATE " + table +" SET "+ set + " WHERE "+ conditions;
	console.log("Update Query: ", sql);
	con.query(sql, function (err, result, fields) 
  {
    if (err) throw err;
    console.log(result);
	callback(result);
  });
};


var insertQuery = function(table,fields,fieldVals,callback)
{
	con.query("INSERT INTO " + table +" ( "+ fields + " ) VALUES ( "+fieldVals+" ) ", function (err, result) 
  {
    if (err) throw err;
    //console.log(result);
    console.log("1 record inserted");
	callback(result);
  });
};
/*
  var sql = "INSERT INTO user ( name, email, sessionid ) VALUES ( 'Name3', 'a@xyz.com', 'Sample data3' );";
  con.query(sql, function (err, result) 
  {
    if (err) throw err;
    console.log("1 record inserted");
  });*/

//con.end();

module.exports = {connectdb, selectQuery, selectWhereQuery, insertQuery, updateQuery}