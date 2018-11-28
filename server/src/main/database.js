var log = require('./logger/logger')(module);
var mysql = require('mysql');
var config = require('./webapp/conf/config.json');

var con = mysql.createConnection({
  host: config.db_host,
  user: config.user,
  password: config.password,
  database: config.database
});

var connectdb = con.connect(function(err) 
{
  if (err) throw err;
  log.info("Connected to mehaDB!");
});

var selectQuery = function(table,callback)
{
	var sql = "SELECT * FROM " + table;
	log.debug("SELECT Query: ", sql);
	con.query(sql , function (err, result, fields) 
	{
		if (err) throw err;
		callback(result);
	});
};

var selectWhereQuery = function(table,fields,fieldVals,callback)
{
	var sql = "SELECT * FROM " + table +" WHERE " + fields.join(" = ? and ") + " = ?";
	log.debug("SELECT Query: " + sql +" "+fieldVals);
	con.query(sql,fieldVals , function (err, result, fields) 
	{
		if (err) throw err;
		callback(result);
	});
};

var updateQuery = function(table,fields,fieldVals,conditions,conditionValues)
{
	var sql = "UPDATE " + table +" SET "+ fields.join(" = ?, ") + " = ?"+
			" WHERE "+ conditions.join(" = ? and ") + " = ?";
	var values = fieldVals.concat(conditionValues);
	log.debug("Update Query: " + sql + " "+ values);
	con.query(sql, values, function (err, result, fields) 
	{
		if (err) log.error("Error: "+err);
		log.debug("Successfully updated the row.");
	});
};

var deleteQuery = function(table,conditions,conditionValues)
{
	var sql = "DELETE from " + table +
			" WHERE "+ conditions.join(" = ? and ") + " = ?";
	var values = conditionValues;
	log.debug("Delete Query: " + sql +" "+ values);
	con.query(sql, values, function (err, result) 
	{
		if (err) log.error("Error: "+err);
		log.debug("Successfully deleted "+result.affectedRows + " rows.");
	});
};


var insertQuery = function(table,fields,fieldVals)
{ 
	var sql = "INSERT INTO "+ table+ " SET "+ fields.join(" = ?, ") + " = ?";
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
	var sql = "INSERT INTO "+ table+ " SET "+ fields.join(" = ?, ") + " = ?";
	console.log("Insert Query: ", sql, fieldVals);
	con.query(sql,fieldVals, function (err, result) 
	{
		if (err && err.code == 'ER_DUP_ENTRY') 
			updateQuery(table,fields,fieldVals,conditions,conditionValues);
		else
			console.log("1 record inserted");
	});
};

var truncateQuery = function(table)
{ 
	var sql = "TRUNCATE TABLE "+ table;
	console.log("Truncate table Query: ", sql);
	con.query(sql,function (err, result, fields) 
	{
		if (err) {
			log.error(err);
			console.log("table "+table+" not truncated");
		}

		else
			console.log("table "+table+" has been truncated");
	});
};


var saveHistory = function(table,historyTable,conditions,conditionValues,dateField)
{ 
	var tArray = [], htArray = [], fields = [], values = [];
	var sql = "SELECT * FROM "+table+" WHERE " + conditions.join(" = ? and ") + " = ?";
	con.query(sql, conditionValues , function (err, t_result, t_fields) 
	{
		if (err) throw err;
		else if(!t_result[0])throw "No such record";
		conditions.push(dateField);
		conditionValues.push(t_result[0][dateField]);
		sql = "SELECT * FROM "+historyTable+" WHERE " + conditions.join(" = ? and ") + " = ?";
		con.query(sql, conditionValues , function (err, ht_result, ht_fields) 
		{
			console.log(t_result);
			if (err) throw err;
			for(var i in t_fields)
			{
				if(t_fields[i].name!="id")
				tArray.push(t_fields[i].name);
			}
			for(var i in ht_fields)
			{
				if(ht_fields[i].name!="id")
				htArray.push(ht_fields[i].name);
			}
			fields = tArray.filter(value => -1 !== htArray.indexOf(value));
			if(fields.length!=tArray.length || fields.length!=htArray.length)
				console.log("Please make sure that your history table is updated and is matching the table");
			console.log(fields.join(", "));
			for(var i in fields)
				values.push(t_result[0][fields[i]]);
			if(ht_result[0])
				updateQuery(historyTable,fields, values, conditions, conditionValues);
			else 
				insertQuery(historyTable,fields, values);
		});
	});
};

//con.end();

module.exports = {connectdb, selectQuery, selectWhereQuery, truncateQuery,
					insertQuery, updateQuery, upsertQuery, saveHistory, deleteQuery}