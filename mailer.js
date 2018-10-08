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
var sendMail = function(toAddress,otp,callback)
{
	// setup e-mail data with unicode symbols
	var mailOptions = {
    from: "Mental Health Assistant <meha.nimhans@gmail.com>", // sender address
	to: toAddress,
    subject: "Thank you for registering with MeHA", // Subject line
    text: "Your OTP is "+otp, // plaintext body
    html: "<div><b>Your OTP is "+otp+"</b></div><div><b>This is valid for 10 minutes.</b></div>" // html body
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
    //smtpTransport.close(); // shut down the connection pool, no more messages
	});
};

module.exports = {sendMail}