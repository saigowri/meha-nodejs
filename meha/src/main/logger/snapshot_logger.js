const fs = require('fs');

var folder = './logs';
// Create the log directory if it does not exist
if (!fs.existsSync(folder)) 
{
	fs.mkdirSync(folder);
}
folder = './logs/users';
// Create the log directory if it does not exist
if (!fs.existsSync(folder)) 
{
	fs.mkdirSync(folder);
}

var logChat = function(filename,convo)
{
	var message = "\n\nChat logged at: " + new Date() +"\n"+convo;
	fs.appendFile(folder+'/'+filename, message, function(err) 
	{
		if(err) 
		{
			return console.log(err);
		}
		console.log("The file was saved!");
	}); 
};

module.exports = {logChat}