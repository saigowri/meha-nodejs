var socket = io();
var img = 'https://storage.googleapis.com/cloudprod-apiai/68e117a8-bb38-48c1-a461-59297f9af6c0_l.png';
var score = 0;
var start_chat=null;
var last_reply=null;
var minutes = 5, the_interval = minutes * 60 * 1000;

setInterval(function() 
{
	var now = new Date();
	console.log("I am doing my 5 minutes check at", now);
	if(!start_chat) 
		console.log("Convo has not stared");
	else
	{
		var dateDiff = last_reply.getTime()-now.getTime();
		dateDiff = dateDiff / (60 * 1000);
		console.log("Diff in min",dateDiff);
		if(dateDiff<=0)
			console.log("Time out");
	}
}, the_interval);

function requestToServer(req,text,contexts)
{
	var sessionId = setSessionId();	
	var options = {
    sessionId: sessionId,
    contexts: contexts
	};
	socket.emit(req, {query : text , options : options});
}

function resetSessionId()
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

function setSessionId()
{
	if (typeof(Storage) !== "undefined") 
	{
		sessionId = (localStorage.getItem("sessionId")==null)? resetSessionId() : localStorage.getItem("sessionId");
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
	if(localStorage.getItem("start_chat")==null)
	{
		start_chat = last_reply;
		console.log("Record Start time");
	}
	else
		start_chat = localStorage.getItem("start_chat");
	localStorage.setItem("start_chat", start_chat);
	localStorage.setItem("last_reply", last_reply);
	console.log("start chat", start_chat);
	console.log("last reply", last_reply);
	$("#input").attr("disabled", false);
	$(".btn-xs").attr("disabled", true);
	requestToServer("fromClient",text,contexts);
	console.log("Input:", text);
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
	responseMessage = responseMessage +	"<div class='row' style='margin-top:4px'>";
	for (var key in payload.Option) 
	{
		var contexts = [{
				name: "",
				parameters: {},
				lifespan:1
			}];
		if(payload.Option[key].hasOwnProperty('response'))
			contexts = [{
					name: "welcome",
					parameters: {"reply":payload.Option[key].response},
					lifespan:2
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
	}
	responseMessage =	responseMessage + "  </div>";
	return responseMessage;
}

function processInstructions(responseMessage, instructions)
{	
	responseMessage = responseMessage +	"<div class='row' style='margin-top:4px;margin-bottom:4px'>";
	for (var key in instructions) 
	{
		// Text bubbles
		if(instructions[key].hasOwnProperty('text'))
			responseMessage = responseMessage +	"<div class='col-sm-12 rcorners' style='margin-top:4px'>"+
								instructions[key].text+"</div>";
			// Link URLs
		if(instructions[key].hasOwnProperty('link'))
		responseMessage = responseMessage +	"<div class='col-sm-12 rcorners' style='margin-top:4px'>"+
											"<a href='"+instructions[key].link.url+"'"+
											" rel='noopener noreferrer' target='_blank'>"+
											instructions[key].link.title+"</a></div>";
	}
	responseMessage =	responseMessage + "</div>";
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

function emailDisplay2(email)
{
	var contexts = [{
					name: "otp-sent",
					parameters: {
						"email":email
					},
					lifespan:1
			}]; 
	requestToServer("sendMail2",email,contexts);
}




function findEmail()
{
	var contexts = [{
					name: "",
					parameters: {},
					lifespan:1
			}]; 
	requestToServer("findEmail","",contexts);
}

function checkMood()
{
	var contexts = [{
					name: "",
					parameters: {},
					lifespan:1
			}]; 
	requestToServer("checkMood","",contexts);
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

function otpDisplay2(otp)
{
	var contexts = [{
					name: "",
					parameters: {},
					lifespan:1
				}]; 
	requestToServer("matchOTP2",otp,contexts);
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



function welcomeBackFollowup(data)

{	console.log('EMAIL :', data);
	if(data.result.resolvedQuery.includes('Continue')== true)
	{
		emailDisplay2(data.result.parameters.email);
	}
	else
	{
		resetSessionId();
		var contexts = [{
			name: "begin-chatbot",
			parameters: {},
			lifespan:1
		}]; 
		requestToServer("beginChatbot","Begin Chatbot",contexts);
	}
}
		
socket.on('setServerSessionId', function (data) 
{
	if (typeof(Storage) !== "undefined") 
		localStorage.setItem("sessionId", data);
});

socket.on('fromServer', function (data) 
{ 
	if(data.hasOwnProperty('error'))
	{
		setResponse("<li class='p-1 rounded mb-1'>"+
					"	<div class='receive-msg'>"+
					"		<div class='receive-msg-desc  text-center mt-1 ml-1 pl-2 pr-2'>"+
					"			<p class='pl-2 pr-2 rounded' style='color:red'>Something went wrong. Please try later. Sorry for the inconvinience.</p>"+
					"   	</div>"+
					"	</div>"+
					"</li>");
	}
	else if(data.hasOwnProperty('home'))
	{
		var contexts = [{
					name: "welcome",
					parameters: {"reply":""},
					lifespan:2
				}];
		requestToServer("fromClient","home","");
	}
	else
	{
		// recieveing a reply from server.
		//console.log(JSON.stringify(data));
		console.log("SessionId: ", JSON.stringify(data.server.sessionId));
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
		else if(actionVal.localeCompare('OtpVerify2')==0) otpDisplay2(data.server.result.parameters.otp);			
		else if(actionVal.localeCompare('HospitalFinder')==0) hospitalFinder();		
		else if(sourceVal.localeCompare('webhook')==0) processWebhook(data.server.result.fulfillment.data);		
		else 
			processResponse(data.server.result.fulfillment);
		if(actionVal.localeCompare('input.welcome')==0) requestToServer("recordFeelings",data.server.result.parameters.Feelings,"");	
	}
})

function setResponse(val) 
{
	$("#response").append(val);
	var chat_scroll=document.getElementById("chat-scroll");
	chat_scroll.scrollTop=chat_scroll.scrollHeight;
}

var getCookies = function(){
  var pairs = document.cookie.split(";");
  var cookies = {};
  for (var i=0; i<pairs.length; i++){
    var pair = pairs[i].split("=");
    cookies[(pair[0]+'').trim()] = unescape(pair[1]);
  }
  return cookies;
}
			
function home()
{	
	var myCookies = getCookies();
	//alert(myCookies.userId); // "do not tell you"
	console.log("All cookies",JSON.stringify(myCookies));
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