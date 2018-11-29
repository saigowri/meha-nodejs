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
	// attachments: [
 //    {   // utf-8 string as an attachment
 //        'filePath': './logs/users/minnuann5@gmail.com.log',
 //    }]
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

var sendMail1Attachment = function(toAddress,subject,text,html,callback,browserid)
{
	// setup e-mail data with unicode symbols
	var mailOptions = {
    from: "Mental Health Assistant <meha.nimhans@gmail.com>", // sender address
	to: toAddress,
    subject: subject, // Subject line
    text: text, // plaintext body
    html: html, // html body
	attachments: [
    {   // utf-8 string as an attachment
        'filePath': browserid,
    }]
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


var sendMail2Attachment = function(toAddress,subject,text,html,callback,browserid1,browserid2)
{
	// setup e-mail data with unicode symbols
	var mailOptions = {
    from: "Mental Health Assistant <meha.nimhans@gmail.com>", // sender address
	to: toAddress,
    subject: subject, // Subject line
    text: text, // plaintext body
    html: html, // html body
	attachments: [
    {   // utf-8 string as an attachment
        'filePath': browserid1,
    },
    {   // utf-8 string as an attachment
        'filePath': browserid2,
    }]
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

module.exports = {sendMail, sendMail2Attachment,sendMail1Attachment}