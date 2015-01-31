// recentMessage.js

const ACC_SID = "Enter Account SID";
const AUTH_TOKEN = "Enter Authentication Token";

var client = require ('twilio') (ACC_SID, AUTH_TOKEN);
var cron = require ('./cron');

var d;

// Logs all the messages sent after the given timeString (H:m:s in 24 hours format)
var getMessage = function (timeString) {
	client.messages.list(function(err, data) {
		data.messages.forEach(function(message) {
			var messageTime = message.dateSent.substring(17,25);
			if (message.status == "received" &&
				messageTime >= timeString) {
				console.log ("From: " + message.from);
				console.log ("Message: " + message.body);
				console.log ("\n");
			}
		});
	});
};

// See how to use cron at https://github.com/ncb000gt/node-cron
var cronJob = cron.job('*/10 * * * * *', function (){
	d = new Date();
	var timeString = d.getUTCHours() + ":" + 
			d.getUTCMinutes() + ":" + d.getUTCSeconds();
	console.log("---------------------------------");
	console.log(timeString);
	getMessage(timeString);
});

cronJob.start();
