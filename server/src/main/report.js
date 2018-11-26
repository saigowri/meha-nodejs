var cron = require('node-schedule');
var config = require('./webapp/conf/config.json');
var log = require('./logger/logger')(module);
var mailer = require('./mailer');
var db = require('./database');

var schedule = cron.scheduleJob(config.reporting_time, function()
{
	var subject = "test";
	var content = "test";
	
	var htmlContent = "<div><table border="1">"+
  "<tr >"+
    "<th>Company</th>"+
    "<th>Contact</th>"+
    "<th>Country</th>"+
  "</tr>"+
  "<tr>"+
    "<td>Alfreds Futterkiste</td>"+
    "<td>Maria Anders</td>"+
    "<td>Germany</td>"+
  "</tr>"+
	"</table></div>";
	// db.selectQuery("history_user",function(result)
	// 	{	
	// 		log.debug(result);
	// 		for (i in result) {

 //                var x = result[i].name;
 //                var y = result[i].email;
 //                console.log("x--- " , x);
 //                console.log("y--- " , y);
 //            }
	// });

	log.info('Sending daily report at '+config.reporting_time.hour+':'+config.reporting_time.minute+' to '+config.doctor_email);
	mailer.sendMail(config.doctor_email,subject,content,htmlContent,
	function(error, response)
	{
		if(error)
		{
			log.error("Unable to send daily report");
			log.error(error);
		}
		else
		{
			log.info("Daily report sent to "+config.doctor_email);
			log.error(error);
		}
	});
});

module.exports = schedule