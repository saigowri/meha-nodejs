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
	log.debug("SELECT Query: "+ sql);
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

var updateQuery = function(table,fields,fieldVals,conditions,conditionValues,callback)
{
	var sql = "UPDATE " + table +" SET "+ fields.join(" = ?, ") + " = ?"+
			" WHERE "+ conditions.join(" = ? and ") + " = ?";
	var values = fieldVals.concat(conditionValues);
	log.debug("Update Query: " + sql + " "+ values);
	con.query(sql, values, function (err, result, fields) 
	{
		if (err) log.error("Error: "+err);
		else
		{
			log.debug("Successfully updated the row.");
			callback();
		}
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
	log.debug("Insert Query: "+ sql+" "+fieldVals);
	con.query(sql,fieldVals, function (err, result) 
	{
		if (err) 
			throw err;
		log.debug("1 record inserted");
	});
};


var upsertQuery = function(table,fields,fieldVals,conditions,conditionValues)
{ 
	selectWhereQuery(table,conditions,conditionValues,function(result)
	{
		if(result[0])
			updateQuery(table,fields,fieldVals,conditions,conditionValues,function(){});
		else
			insertQuery(table,fields,fieldVals);
	});
};

var truncateQuery = function(table)
{ 
	var sql = "TRUNCATE TABLE "+ table;
	log.debug("Truncate table Query: "+sql+" "+table);
	con.query(sql,function (err, result, fields) 
	{
		if (err) {
			log.error(err);
			console.log("table "+table+" not truncated");
		}

		else
			log.debug("table "+table+" has been truncated");
	});
};


var saveHistory = function(table,historyTable,conditions,conditionValues,dateField,callback)
{ 
	var tArray = [], htArray = [], fields = [], values = [];
	var sql = "SELECT * FROM "+table+" WHERE " + conditions.join(" = ? and ") + " = ?";
	con.query(sql, conditionValues , function (err, t_result, t_fields) 
	{
		if (err) callback(err);
		else if(!t_result[0]) callback("No such record") ;
		conditions.push(dateField);
		conditionValues.push(t_result[0][dateField]);
		sql = "SELECT * FROM "+historyTable+" WHERE " + conditions.join(" = ? and ") + " = ?";
		con.query(sql, conditionValues , function (err, ht_result, ht_fields) 
		{
			if (err) callback(err);
			for(var i in t_fields)
			{
				if(JSON.stringify(t_fields[i].name).length!=2 && t_fields[i].name!="id")
				tArray.push(t_fields[i].name);
				//console.log("Table field: "+t_fields[i].name+" len: "+JSON.stringify(t_fields[i].name).length);
			}
			for(var i in ht_fields)
			{
				if(JSON.stringify(ht_fields[i].name).length!=2 && ht_fields[i].name!="id")
				{
					htArray.push(ht_fields[i].name);
					//console.log("History Table field: "+ht_fields[i].name+" len: "+JSON.stringify(t_fields[i].name).length);
				}
			}
			fields = tArray.filter(value => -1 !== htArray.indexOf(value));
			if(fields.length!=tArray.length || fields.length!=htArray.length)
				log.warn("Please make sure that your history table is updated and is matching the table");
			log.debug(fields.join(", "));
			for(var i in fields)
				values.push(t_result[0][fields[i]]);
			if(ht_result[0])
			{
				updateQuery(historyTable,fields, values, conditions, conditionValues,function(){
					callback();
				});
				
			}
			else 
			{
				insertQuery(historyTable,fields, values);
				callback();
			}
		});
	});
};

//con.end();

module.exports = {connectdb, selectQuery, selectWhereQuery, truncateQuery,
					insertQuery, updateQuery, upsertQuery, saveHistory, deleteQuery}