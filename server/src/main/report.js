var cron = require('node-schedule');
var config = require('./webapp/conf/config.json');


cron.scheduleJob(config.reporting_time, function()
	{
		console.log('This runs at 2:30AM on every Sunday');
	});