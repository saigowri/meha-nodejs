var socket = io();
var img = 'https://storage.googleapis.com/cloudprod-apiai/68e117a8-bb38-48c1-a461-59297f9af6c0_l.png';
var score = 0;


function requestToDialogflow(req,text,context)
{
	var sessionId = setSessionId();	
	var options = {
    sessionId: sessionId,
    contexts: [{
            name: context,
            parameters: {},
			lifespan:1
        }]
	};
	socket.emit(req, {query : text , options : options});
	//socket.emit('fromClient', { client : text , sessionId : sessionId  , context : context });
}
/*
function matchOTP(otp,context)
{
	var sessionId = setSessionId();
	var options = {
    sessionId: sessionId,
    contexts: [{
            name: context,
            parameters: {},
			lifespan:1
        }]
	};
	socket.emit('matchOTP', { otp : otp, sessionId : sessionId  , context : context } );
}

function requestToMailer(text,context)
{
	var sessionId = setSessionId();
	var options = {
    sessionId: sessionId,
    contexts: [{
            name: context,
            parameters: {},
			lifespan:1
        }]
	};
	socket.emit('sendMail', {query : text , options : options} );
}*/

function setSessionId()
{
	var random1 = getRandomInt(100000);
	var random2 = getRandomInt(100000);
	var timestamp =  "" + parseInt(Date.now()) + random1 + random2;
	var sessionId ;
	if (typeof(Storage) !== "undefined") 
	{
		// Store
		if(localStorage.getItem("sessionId")==null)
		{
			localStorage.setItem("sessionId", timestamp);
		}
		sessionId = localStorage.getItem("sessionId");
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
		if(localStorage.getItem("score")==null)
		{
			localStorage.setItem("score", score);
		}
		score = localStorage.getItem("score");
		score = parseInt(score) + parseInt(currScore);
		localStorage.setItem("score", score);
		console.log("Score",score);
}
		
function WHOScoreDisplay(responseMessage)
{
	if(parseInt(score)>=50)
	{
		responseMessage = responseMessage + "    <div class='col-sm-12 rcorners' style='margin-top:4px'>"+
					"Great! You have done well. Your WHO score is "+ score + ". There is no need for you to worry."+
                    "    </div>";
		requestToDialogflow("fromClient","WHO-High-Score",""); 	
	}
	else
	{
		responseMessage = responseMessage + "    <div class='col-sm-12 rcorners' style='margin-top:4px'>"+
					"Your WHO score is "+ score + ". This is not a very good score. However, don't worry, I am here to help."+
                    "    </div>";
		requestToDialogflow("fromClient","WHO-Low-Score",""); 	
	}
	localStorage.setItem("score", 0);
	return responseMessage;
}
function ScreenerScoreDisplay(responseMessage)
{
	if(parseInt(score)>10)
	{
		responseMessage = responseMessage + "    <div class='col-sm-12 rcorners' style='margin-top:4px'>"+
					"Your Screener score is "+ score + ". You seem to be having significant depression symptoms. I stongly"+
					" recommend you to consult a mental health professional."+
                    "    </div>";
		requestToDialogflow("fromClient","Screener-severe-depression",""); 	
	}
	else if(parseInt(score)<=10 && parseInt(score)>5)
	{
		responseMessage = responseMessage + "    <div class='col-sm-12 rcorners' style='margin-top:4px'>"+
					"Your Screener score is "+ score + ". You seem to be having mild depression symptoms. Don't worry"+
					" I am here to help you. I recommend you to start using the PUSH-D Application. "+
                    "    </div>";
		requestToDialogflow("fromClient","Screener-mild-depression",""); 	
	}
	else{

		responseMessage = responseMessage + "    <div class='col-sm-12 rcorners' style='margin-top:4px'>"+
					"Great! Your Screener score is "+ score + ". You do not seem to have any depression symptoms."+
					"    </div>";
		requestToDialogflow("fromClient","Screener-no-depression",""); 

	}
	localStorage.setItem("score", 0);
	return responseMessage;
}

function setScore(text,score) 
{
	calcScore(score);
	setInput(text);
}

function setInput(text) 
{
	$("#input").attr("disabled", false);
	$(".btn-xs").attr("disabled", true);
	requestToDialogflow("fromClient",text,"");
	console.log("Input:", text);
	setResponse("<li class='pl-2 pr-2 bg-primary rounded text-white text-center send-msg mb-1'>"+
                                text+"</li>");
	$("#input").val("");
}

function processOptions(responseMessage,payload) 
{
	$("#input").attr("disabled", true);
	var width = payload.width;
	var type = "";
	if(payload.hasOwnProperty('type'))
		type = payload.type;
	responseMessage = responseMessage +	"<div class='row' style='margin-top:4px'>";
	for (var key in payload.Option) 
	{
		if(type.localeCompare('WHO')== 0 )
		{
			var buttonClick = 'setScore(this.value,this.id)';
		}
		else if(type.localeCompare('Screener')== 0 )
		{
			var buttonClick = 'setScore(this.value,this.id)';
		}
		else
			var buttonClick = 'setInput(this.value)';
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
	if(payload.hasOwnProperty('type'))
	{
		if(payload.type.localeCompare('WHO-End')==0)
		{
			responseMessage = WHOScoreDisplay(responseMessage);
		}
		else if(payload.type.localeCompare('Screener-End')==0)
		{
			responseMessage = ScreenerScoreDisplay(responseMessage);
		}
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
		
			/*
		function sendReply() 
		{
			var text = $("#input").val();
			$("#input").val("");

		/*		error: function() {
					setResponse("<li class='p-1 rounded mb-1'>"+
                                "<div class='receive-msg'>"+
                                "    <div class='receive-msg-desc  text-center mt-1 ml-1 pl-2 pr-2'>"+
                                "        <p class='pl-2 pr-2 rounded' style='color:red'>Internal Server Error</p>"+
                                "    </div>"+
                                "</div>"+
                            "</li>");
				}
			});
		
		}*/
		
		
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
		
		if(data.server.result.hasOwnProperty('action') && data.server.result.action.localeCompare('EmailVerify')==0)
		{
			var email = data.server.result.parameters.email;
			requestToDialogflow("sendMail",email,'');
		}
		/*if(data.server.result.hasOwnProperty('action') && data.server.result.action.localeCompare('OtpVerify')==0)
		{
			var otp = data.server.result.parameters.otp;
			matchOTP(email,'');
		}*/						
		else if(data.server.result.fulfillment.hasOwnProperty('source') && data.server.result.fulfillment.source.localeCompare('webhook')==0)
		{
			processWebhook(data.server.result.fulfillment.data);
		}
		else
		{
			processResponse(data.server.result.fulfillment);
		}
	}
})

function setResponse(val) 
{
	$("#response").append(val);
	var chat_scroll=document.getElementById("chat-scroll");
	chat_scroll.scrollTop=chat_scroll.scrollHeight;
}
			
function home()
{
	setInput('Home');
}

function usefulLinks()
{
	requestToDialogflow("fromClient","Useful Links","Useful-Links");
}