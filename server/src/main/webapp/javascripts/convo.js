var socket = io();
var img = 'https://storage.googleapis.com/cloudprod-apiai/0b77b714-874b-4ddd-b719-6e24ed54dac4_l.png';
var score = 0;
var chat_start=null;
var last_reply=null;
var minutes = 1, the_interval = minutes * 60 * 1000;
var wellnessRating = 0;
var chatbotRating = 0;
var convo="";

var getCookies = function()
{
  var pairs = document.cookie.split(";");
  var cookies = {};
  for (var i=0; i<pairs.length; i++){
    var pair = pairs[i].split("=");
    cookies[(pair[0]+'').trim()] = unescape(pair[1]);
  }
  return cookies;
}
var myCookies = getCookies();
var mehaEmail = myCookies.mehaEmail;
var mehaName = myCookies.mehaName;
var email = mehaEmail.localeCompare("no-email")? mehaEmail : null;
var name = mehaName.localeCompare("no-name")? mehaName : null;
console.log("Email: ",mehaEmail);
console.log("Name: ",mehaName);

			
// Beginning Conversation From Chatbot
var contexts = [{
				name: "begin-chatbot",
				parameters: {"email":mehaEmail,"name":mehaName},
				lifespan:1
			}]; 
requestToServer("beginChatbot","Begin Chatbot",contexts);

setInterval(function() 
{
	var now = new Date();
	console.log("15 minutes check at", now);
	if(chat_start) 
	{
		var idleTime = now.getTime()-last_reply.getTime();
		idleTime = idleTime / (60 * 1000);
		console.log("Diff in min",idleTime);
		if(idleTime>minutes)
		{
			console.log("Time out, after ",last_reply);
			socket.emit("logChatEnd", 
			{
				sessionId: setBrowserId(),
				chat_start : chat_start.toISOString(), 
				chat_end : last_reply.toISOString()
			});
			chat_start = null;
		}
	}
	else
		console.log("Convo has not started");
}, the_interval);

var hashMap = {};
// add items
hashMap["very sad"] = -3;
hashMap["sad"] = -2;
hashMap["not so good"] = -1;
hashMap["neutral"] = 0;
hashMap["not so bad"] = 1;
hashMap["happy"] = 2;
hashMap["very happy"] = 3;

function requestToServer(req,text,contexts)
{
	var sessionId = setBrowserId();	
	var options = {
	    sessionId: sessionId,
	    contexts: contexts
	};
	if(req.localeCompare('fromClient')==0)
	{
		socket.emit(req, {query : text , options : options, convo : convo});
		convo = "";
	}
	else
		socket.emit(req, {query : text , options : options});
}

function resetBrowserId()
{
	if (typeof(Storage) !== "undefined") 
	{
		// Store
		var random1 = getRandomInt(100000);
		var random2 = getRandomInt(100000);
		var timestamp =  "" + parseInt(Date.now()) + random1 + random2;
		localStorage.setItem("sessionId", timestamp);
		var sessionId = localStorage.getItem("sessionId");
		return sessionId;		
	} 
	else 
	{
		//document.getElementById("response").innerHTML = "Sorry, your browser does not support Web Storage...";
		return "Dummy Session Id"
	}
}

function setBrowserId()
{
	if (typeof(Storage) !== "undefined") 
	{
		sessionId = (localStorage.getItem("sessionId")==null)? resetBrowserId() : localStorage.getItem("sessionId");
		return sessionId;		
	} 
	else 
	{
		//document.getElementById("response").innerHTML = "Sorry, your browser does not support Web Storage...";
		return "Dummy Session Id"
	}
}

function getRandomInt(max) 
{
	return Math.floor(Math.random() * Math.floor(max));
}

function calcScore(currScore)
{
		if(localStorage.getItem("score")==null || isNaN(localStorage.getItem("score")))
		{
			localStorage.setItem("score", score);
		}
		score = localStorage.getItem("score");
		score = parseInt(score) + parseInt(currScore);
		localStorage.setItem("score", score);
		console.log("Score ",score);
}

function setScore(text,score,contexts) 
{
	calcScore(score);
	setInput(text,contexts);
}

function setInput(text,contexts) 
{
	last_reply = new Date();
	if(!chat_start)
	{
		chat_start = last_reply;
		console.log("Record Start time");		
		socket.emit("logChatStart", 
			{
				sessionId: setBrowserId() ,
				chat_start : chat_start.toISOString(), 
				email : mehaEmail 
			});
	}
	console.log("start chat", chat_start);
	console.log("last reply", last_reply);
	$("#input").attr("disabled", false);
	$(".btn-xs").attr("disabled", true);
	requestToServer("fromClient",text,contexts);
	console.log("Input:", text);
	var logText = ""+new Date()+"\t[User]\t"+text+"\n";
	convo = convo + logText;
	setResponse("<li class='pl-2 pr-2 bg-primary rounded text-white text-center send-msg mb-1'>"+
                                text+"</li>");
	$("#input").val("");
}

function processOptions(responseMessage,payload) 
{
	if(!payload.hasOwnProperty('enabled') || (payload.hasOwnProperty('enabled') && !payload.enabled))
		$("#input").attr("disabled", true);
	var width = payload.width;
	var type = "";
	if(payload.hasOwnProperty('type'))
		type = payload.type;
	
	var logText = "";
	responseMessage = responseMessage +	"<div class='row' style='margin-top:4px'>";
	for (var key in payload.Option) 
	{
		var contexts = [{
				name: "followup",
				parameters: {"reply":" "},
				lifespan:1
			}];
		if(payload.Option[key].hasOwnProperty('response'))
			contexts = [{
					name: "followup",
					parameters: {"reply":payload.Option[key].response},
					lifespan:1
				}];
		if(type.localeCompare('WHO')== 0 || type.localeCompare('Screener')== 0)
		{
			var buttonClick = 'setScore(this.value,this.id,'+JSON.stringify(contexts)+')';
		}
		else
		{ 
			var buttonClick = 'setInput(this.value,'+JSON.stringify(contexts)+')';
		}
		var buttons =	"    <div class='col-sm-"+width+"' style='margin-top:2px'>"+
						"		<button type='button' value='"+payload.Option[key].title+
						"		' id='"+payload.Option[key].score+"' onclick='"+buttonClick+"' class='btn btn-xs  btn-block btn-warning'>";
		if(payload.Option[key].hasOwnProperty('icon'))
			buttons = buttons +	"<i class='"+payload.Option[key].icon+" fa-3x'></i>&nbsp;";
		else
			buttons = buttons +payload.Option[key].title;
					
		buttons = buttons +"		</button></div>";
		responseMessage = responseMessage + buttons;
		logText = logText +"(Button "+(parseInt(key)+1)+")\t"+ payload.Option[key].title + "\n";
	}
	convo = convo + logText;
	responseMessage =	responseMessage + "  </div>";
	return responseMessage;
}

function processInstructions(responseMessage, instructions)
{	
	var logText = ""+new Date()+"\t[Chatbot]\t";
	responseMessage = responseMessage +	"<div class='row' style='margin-top:4px;margin-bottom:4px'>";
	for (var key in instructions) 
	{
		// Text bubbles
		if(instructions[key].hasOwnProperty('text'))
		{
			responseMessage = responseMessage +	"<div class='col-sm-12 rcorners' style='margin-top:4px'>"+
								instructions[key].text+"</div>";
			logText = logText + instructions[key].text + "\n";
		}
		/*
		if(instructions[key].hasOwnProperty('response'))
			contexts = [{
					name: "followup",
					parameters: {"reply":instructions[key].response},
					lifespan:1
				}];*/
				
			// Link URLs
		if(instructions[key].hasOwnProperty('link'))
		{
			responseMessage = responseMessage +	"<div class='col-sm-12 rcorners' style='margin-top:4px'>"+
											"<a href='"+instructions[key].link.url+"'"+
											" rel='noopener noreferrer' target='_blank'>"+
											instructions[key].link.title+"</a></div>";			
			logText = logText + instructions[key].link.title +" (" +instructions[key].link.url+ ")\n";
		}
	}
	responseMessage =	responseMessage + "</div>";
	convo = convo + logText;
	return responseMessage;
}

function processPayload(responseMessage, payload)
{				
	// For multiple texts and links
	if(payload.hasOwnProperty('instructions'))
	{
		responseMessage = processInstructions(responseMessage,payload.instructions);
	}
			
	if(payload.hasOwnProperty('Option'))
	{
		responseMessage = processOptions(responseMessage,payload);
	}
		
	return responseMessage;
}

function processResponse(fulfillment)
{
	var responseMessage = 	"<li class='p-1 rounded mb-1'>"+
							"	<div class='receive-msg'>"+
							"   	<img src='"+img+"'>"+
							"		<div class='container-fluid'>"+
							"  			<div class='row'>";
	for (var i in fulfillment.messages) 	
	{		
		// Custom Payload
		if(fulfillment.messages[i].type==4)
		{
			responseMessage = processPayload(responseMessage, fulfillment.messages[i].payload);
		}
	}
	responseMessage =	responseMessage +
						"			</div>"+
						"		</div>"+
						"	</div>"+
						"</li>";
						
	setResponse(responseMessage);
}
		
function processWebhook(data)
{						
	var responseMessage = 	"<li class='p-1 rounded mb-1'>"+
							"	<div class='receive-msg'>"+
							"   	<img src='"+img+"'>"+
							"		<div class='container-fluid'>"+
							"  			<div class='row'>";
	responseMessage = processPayload(responseMessage, data);
	responseMessage =	responseMessage +
						"			</div>"+
						"		</div>"+
						"	</div>"+
						"</li>";
						
	setResponse(responseMessage);
}

		
function whoScoreDisplay()
{
	var result = (parseInt(score)>=50)?  "who-high-score" : "who-low-score";
	var contexts = [{
            name: result,
            parameters: { "score":score},
			lifespan:1
        }];
	requestToServer("fromClient",result,contexts); 	
	localStorage.setItem("score", 0);
}

function screenerScoreDisplay()
{
	var result = (parseInt(score)>10)?  "Screener-severe-depression" : (parseInt(score)>5)?  "Screener-mild-depression" : "Screener-no-depression";
	var contexts = [{
            name: result,
            parameters: { "score":score},
			lifespan:1
        }];
	requestToServer("fromClient",result,contexts); 	
	localStorage.setItem("score", 0);
}

function emailDisplay(email)
{
	var contexts = [{
					name: "",
					parameters: {
						"email":email
					},
					lifespan:1
			}]; 
	requestToServer("sendMail",email,contexts);
}

function sentimentAnalysis(freeTextMsg) 
{
	console.log("Message is "+freeTextMsg);
	var score = localStorage.getItem("sentiScore");
	console.log("Score is " + score);
	var contexts = [{
					name: "",
					parameters: 
					{
						"freeTextMsg" : freeTextMsg,
						"sentiScore" : score
					},
					lifespan : 1
	}]; 
	requestToServer("sentimentAnalysis",freeTextMsg,contexts);
}

function findEmail()
{
	console.log("Registered email",email);
	if(!email)
	{
		var contexts = [{
					name: "",
					parameters: {},
					lifespan:1
			}];
		requestToServer("fromClient","Request Email Id",contexts);
	}
	else
	{
		var contexts = [{
					name: "followup",
					parameters: {"reply":email},
					lifespan:1
			},{
					name: "screener-start",
					parameters: {},
					lifespan:1
			}];
		requestToServer("fromClient","Screener-restart",contexts);
	}
		
}

function otpDisplay(otp)
{
	var contexts = [{
					name: "",
					parameters: {},
					lifespan:1
				}]; 
	requestToServer("matchOTP",otp,contexts);
}

function hospitalFinder()
{
	 getLocation();
}

function showPosition(position) {
	var contexts = [{
					name: "hospital-data",
					parameters: {},
					lifespan:1
			}]; 
	console.log('latitude inside convo.js',position.coords.latitude);
	console.log('longitude inside convo.js',position.coords.longitude);
	var arr = [position.coords.latitude, position.coords.longitude];
	requestToServer("hospitalFinder",arr,contexts);
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:{
        	var contexts = [{
					name: "hospitals-followup",
					parameters: {},
					lifespan:1
			}]; 
        	requestToServer("LocationDenied","",contexts);
            console.log("User denied the request for Geolocation.");
            break;
        }
        	
        case error.POSITION_UNAVAILABLE:
            console.log("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            console.log("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            console.log("An unknown error occurred.");
            break;
    }
}

function storeWellnessRating(data){
    // console.log("convo.js " , data.resolvedQuery);
    wellnessRating = data.resolvedQuery;
}

function storeWellnessFeedback(data){
    // console.log("convo.js feedback " , data.resolvedQuery);
    // console.log("convo.js in feedback" , wellnessRating);
	var contexts = [{
					name: "",
					parameters: {},
					lifespan:1
				}]
	var arr = [wellnessRating, data.resolvedQuery];
	requestToServer("storeWellnessRatingAndFeedback",arr,contexts);
}

function storeChatbotRating(data){
    console.log("chatbot rating " , data.resolvedQuery);
    wellnessRating = data.resolvedQuery;
}

function storeChatbotFeedback(data){
    // console.log("convo.js feedback " , data.resolvedQuery);
    // console.log("convo.js in feedback" , wellnessRating);
	var contexts = [{
					name: "",
					parameters: {},
					lifespan:1
				}]
	var arr = [chatbotRating, data.resolvedQuery];
	requestToServer("storeChatbotRatingAndFeedback",arr,contexts);
}

function welcomeBackFollowup(data)
{	
		resetBrowserId();
		var contexts = [{
			name: "begin-chatbot",
			parameters: {"email":mehaEmail,"name":mehaName},
			lifespan:1
		}]; 
		requestToServer("beginChatbot","Begin Chatbot",contexts);
}
		
socket.on('setServerBrowserId', function (data) 
{
	if (typeof(Storage) !== "undefined") 
		localStorage.setItem("sessionId", data);
});

socket.on('fromServer', function (data) 
{ 
	if(data.hasOwnProperty('error'))
	{
		var text = "Something went wrong. Please try later. Sorry for the inconvinience.";
		var logText = ""+new Date()+"\t[Chatbot]\t"+text;
		convo = convo + logText;
		setResponse("<li class='p-1 rounded mb-1'>"+
					"	<div class='receive-msg'>"+
					"		<div class='receive-msg-desc  text-center mt-1 ml-1 pl-2 pr-2'>"+
					"			<p class='pl-2 pr-2 rounded' style='color:red'>"+text+"</p>"+
					"   	</div>"+
					"	</div>"+
					"</li>");
	}
	else if(data.hasOwnProperty('home'))
	{
		var contexts = [{
					name: "welcome",
					parameters: {"reply":""},
					lifespan:1
				}];
		requestToServer("fromClient","home","");
	}
	else
	{
		// recieveing a reply from server.
		//console.log(JSON.stringify(data));
		console.log("BrowserId: ", JSON.stringify(data.server.sessionId));
		console.log("Request: ", JSON.stringify(data.server.result.resolvedQuery)); 
		console.log("action: ", JSON.stringify(data.server.result.action)); 
		console.log("parameters: ", JSON.stringify(data.server.result.parameters));
		console.log("contexts: ", JSON.stringify(data.server.result.contexts)); 
		console.log("intentName: ", JSON.stringify(data.server.result.metadata.intentName)); 
		console.log("fulfillment: ", JSON.stringify(data.server.result.fulfillment)); 
		
		var action = data.server.result.hasOwnProperty('action');
		var actionVal = (action) ? data.server.result.action : "";
		var source = data.server.result.fulfillment.hasOwnProperty('source');
		var sourceVal = (source) ? data.server.result.fulfillment.source : "";
		
		if(actionVal.localeCompare('WHO-End')==0) whoScoreDisplay();
		else if(actionVal.localeCompare('Screener-End')==0) screenerScoreDisplay();	
		else if(actionVal.localeCompare('FindEmail')==0) findEmail();		
		else if(actionVal.localeCompare('WelcomeBackFollowup')==0) welcomeBackFollowup(data.server);
		else if(actionVal.localeCompare('EmailVerify')==0) emailDisplay(data.server.result.parameters.email);
		else if(actionVal.localeCompare('OtpVerify')==0) otpDisplay(data.server.result.parameters.otp);				
		else if(actionVal.localeCompare('HospitalFinder')==0) hospitalFinder();		
		else if(actionVal.localeCompare('HowAreYouFeeling')==0) sentimentAnalysis(data.server.result.resolvedQuery);
		else if(sourceVal.localeCompare('webhook')==0) processWebhook(data.server.result.fulfillment.data);		
		
		else 
			processResponse(data.server.result.fulfillment);
		if(actionVal.localeCompare('MoodofUserFollowup')==0) 
		{
			var sentiScore = hashMap[data.server.result.parameters.Feelings];
			localStorage.setItem("sentiScore",sentiScore);
			console.log(sentiScore);
			requestToServer("recordFeelings",data.server.result.parameters.Feelings,"");	
		}
		else if(actionVal.localeCompare('ReceiveWellnessRating')==0) storeWellnessRating(data.server.result);		
		else if(actionVal.localeCompare('RecieveWellnessFeedback')==0) storeWellnessFeedback(data.server.result);		
		else if(actionVal.localeCompare('ReceiveChatbotRating')==0) storeChatbotRating(data.server.result);		
		else if(actionVal.localeCompare('RecieveWellnessFeedback')==0) storeChatbotFeedback(data.server.result);		
		
	}
});

function setResponse(val) 
{
	$("#response").append(val);
	var chat_scroll=document.getElementById("chat-scroll");
	chat_scroll.scrollTop=chat_scroll.scrollHeight;
}
			
function home()
{	
	var contexts = [{
            name: "welcome",
            parameters: {"reply":" "},
			lifespan:1
        }]; 
	setInput("Home",contexts);
}

function usefulLinks()
{
	var contexts = [{
					name: "Useful-Links",
					parameters: {},
					lifespan:1
				}]; 
	setInput("Useful Links",contexts);
}


$(document).ready(function() 
{
    $('.hide-chat-box').click(function(){
    $('#chatbot-iframe', window.parent.document).remove();
	});
	$('.hide-chatbox').click(function()
	{
		$('.chat-content').slideToggle();
		$('#minimize-icon').toggle();
		$('#maximize-icon').toggle();
	});
			
	$("#input").keypress(function(event) 
	{
		if (event.which == 13) 
		{
			event.preventDefault();
			var text = $("#input").val();
			var contexts = [{
							name: "followup",
							parameters: {"reply":" "},
							lifespan:1
						}]; 
			setInput(text,contexts);
		}
	});
});