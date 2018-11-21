var nodemailer = require("nodemailer");

// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
    user: 'meha.nimhans@gmail.com',
    pass: 'nimhans.meha1'
    }
});


// send mail with defined transport object
var sendMail = function(toAddress,subject,text,html,callback)
{
	// setup e-mail data with unicode symbols
	var mailOptions = {
    from: "Mental Health Assistant <meha.nimhans@gmail.com>", // sender address
	to: toAddress,
    subject: subject, // Subject line
    text: text, // plaintext body
    html: html // html body
	}
	smtpTransport.sendMail(mailOptions, function(error, response)
	{
		if(error)
		{
			callback(error);
		}
		else
		{
			callback(null, "Message sent: " + response.message);
		}

    // if you don't want to use this transport object anymore, uncomment following line
    smtpTransport.close(); // shut down the connection pool, no more messages
	});
};

module.exports = {sendMail}