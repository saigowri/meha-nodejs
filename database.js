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
  console.log("Connected to mehaDB!");
});

var selectQuery = function(table,callback)
{
	var sql = "SELECT * FROM " + table;
	console.log("SELECT Query: ", sql);
	con.query(sql , function (err, result, fields) 
	{
		if (err) throw err;
		//console.log(result);
		callback(result);
	});
};

var selectWhereQuery = function(table,fields,fieldVals,callback)
{
	var sql = "SELECT * FROM " + table +" WHERE ";
	for(var i in fields )
	{
		if(i!=0) sql = sql + ", ";
		sql = sql + fields[i]+" = ?";
	}
	console.log("SELECT Query: ", sql, fieldVals);
	con.query(sql,fieldVals , function (err, result, fields) 
	{
		if (err) throw err;
		callback(result);
	});
};

var updateQuery = function(table,fields,fieldVals,conditions,conditionValues)
{
	var sql = "UPDATE " + table +" SET ";
	for(var i in fields )
	{
		if(i!=0) sql = sql + ", ";
		sql = sql + fields[i]+" = ?";
	}
	sql = sql + " WHERE ";
	for(var i in conditions )
	{
		if(i!=0) sql = sql + ", ";
		sql = sql + conditions[i]+" = ?";
	}
	var values = fieldVals.concat(conditionValues);
	console.log("Update Query: ", sql, values);
	con.query(sql, values, function (err, result, fields) 
	{
		if (err) throw err;
		console.log("Successfully updated the row.");
	});
};


var insertQuery = function(table,fields,fieldVals)
{ 
	var sql = "INSERT INTO "+ table+ " SET ";
	for(var i in fields )
	{
		if(i!=0) sql = sql + ", ";
		sql = sql + fields[i]+" = ?";
	}
	console.log("Insert Query: ", sql, fieldVals);
	con.query(sql,fieldVals, function (err, result) 
	{
		if (err) 
			throw err;
		console.log("1 record inserted");
	});
};


var upsertQuery = function(table,fields,fieldVals,conditions,conditionValues)
{ 
	var sql = "INSERT INTO "+ table+ " SET ";
	for(var i in fields )
	{
		if(i!=0) sql = sql + ", ";
		sql = sql + fields[i]+" = ?";
	}
	console.log("Insert Query: ", sql, fieldVals);
	con.query(sql,fieldVals, function (err, result) 
	{
		if (err && err.code == 'ER_DUP_ENTRY') 
			updateQuery(table,fields,fieldVals,conditions,conditionValues);
		else
			console.log("1 record inserted");
	});
};


var saveHistory = function(table,historyTable,conditions,conditionValues)
{ 
	var sql = "INSERT INTO "+ table+ " SET ";
	for(var i in fields )
	{
		if(i!=0) sql = sql + ", ";
		sql = sql + fields[i]+" = ?";
	}
	console.log("Insert Query: ", sql);
	con.query(sql,fieldVals, function (err, result) 
	{
		if (err && err.code == 'ER_DUP_ENTRY') 
			updateQuery(table,fields,fieldVals,conditions,conditionValues);
		else
			console.log("1 record inserted");
	});
};

//con.end();

module.exports = {connectdb, selectQuery, selectWhereQuery, 
					insertQuery, updateQuery, upsertQuery, saveHistory}