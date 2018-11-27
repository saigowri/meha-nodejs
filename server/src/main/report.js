var cron = require('node-schedule');
var config = require('./webapp/conf/config.json');
var log = require('./logger/logger')(module);
var mailer = require('./mailer');
var db = require('./database');
var date = new Date();
var schedule = cron.scheduleJob(config.reporting_time, function()
{
	var subject = "Daily Summary of Chatbot usage";
	var content = "Daily Summary of Chatbot usage is as follows";
	var htmlContent = "<div><p>Follwoing is the Daily Summary of NIMHANS Mental Health Chatbot sent on "+ date+". </p></div>"
	htmlContent += "<div><table border='1'>"+
    "<tr>"+
    "<th>Duration in minutes</th>"+
    "<th>Screener Score</th>"+
    "<th>WHO Score</th>"+
    "<th>Feeling</th>"+
    "<th>Sentiment Analysis Score</th>"+
    "<th>User email</th>"+
    "</tr>";
  
	db.selectQuery("summary",function(result)
		{	
			log.debug(result);
			for ( var i in result) {

                var duration = result[i].duration;
                var screener_score = result[i].screener_score;
                if(screener_score == -999){
                	screener_score = "NA";
                }
                var who_score = result[i].who_score;
                if(who_score == -999){
                	who_score = "NA";
                }
                var feeling = result[i].feeling;
                var senti_score = result[i].senti_score;
                if(senti_score == -999){
                	senti_score = "NA";
                }
                var useremail = result[i].email;
                
                htmlContent += "<tr><td>"+duration+"</td><td>"+screener_score+"</td><td>"+who_score+"</td>"+
                "<td>"+feeling+"</td><td>"+senti_score+"</td><td>"+useremail+"</td></tr>";
            }
            htmlContent += "</table><p><b>NA : Not Available</b></p></div>";
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

	
});

module.exports = schedule