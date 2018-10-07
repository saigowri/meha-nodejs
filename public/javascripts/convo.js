var socket = io();
var img = 'https://storage.googleapis.com/cloudprod-apiai/68e117a8-bb38-48c1-a461-59297f9af6c0_l.png';
var whoScore = 0;


function requestToDialogflow(text,context)
{
	var sessionId = setSessionId();
	socket.emit('fromClient', { client : text , sessionId : sessionId  , context : context } );
}

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
		if(localStorage.getItem("whoScore")==null)
		{
			localStorage.setItem("whoScore", whoScore);
		}
		whoScore = localStorage.getItem("whoScore");
		whoScore = parseInt(whoScore) + parseInt(currScore);
		localStorage.setItem("whoScore", whoScore);
		console.log("Score",whoScore);
}
		
function scoreDisplay(responseMessage)
{
	if(parseInt(whoScore)>=50)
	{
		responseMessage = responseMessage + "    <div class='col-sm-12 rcorners' style='margin-top:4px'>"+
					"Great! You have done well. Your WHO score is "+ whoScore + ". There is no need for you to worry."+
                    "    </div>";
		requestToDialogflow("WHO-High-Score",""); 	
	}
	else
	{
		responseMessage = responseMessage + "    <div class='col-sm-12 rcorners' style='margin-top:4px'>"+
					"Your WHO score is "+ whoScore + ". This is not a very good score. However, don't worry, I am here to help."+
                    "    </div>";
		requestToDialogflow("WHO-Low-Score",""); 	
	}
	localStorage.setItem("whoScore", 0);
	return responseMessage;
}

function setScore(disp,score,text) 
{
	calcScore(score);
	setInput(disp,text);
}

function setInput(disp,text) 
{
	$("#input").attr("disabled", false);
	$(".btn-xs").attr("disabled", true);
	requestToDialogflow(text,"");
	console.log("Input:", text);
	setResponse("<li class='pl-2 pr-2 bg-primary rounded text-white text-center send-msg mb-1'>"+
                                disp+"</li>");
	$("#input").val("");
}

function processOptions(responseMessage,payload) 
{
	$("#input").attr("disabled", true);
	var width = payload.width;
	var type = "";
	if(payload.hasOwnProperty('type'))
		type = payload.type;
	var return_val = "";			
	if(payload.hasOwnProperty('return'))
		return_val = "next";
	responseMessage = responseMessage +	"<div class='row' style='margin-top:4px'>";
	for (var key in payload.Option) 
	{
		if(type.localeCompare('WHO')== 0 )
		{
			var buttonClick = 'setScore(this.value,this.id,"'+return_val+'")';
		}
		else if(return_val.localeCompare('next')==0)
			var buttonClick = 'setInput(this.value,"'+return_val+'")';
		else
			var buttonClick = 'setInput(this.value,this.value)';
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
			responseMessage = scoreDisplay(responseMessage);
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
	// recieveing a reply from server.
	console.log(JSON.stringify(data));
	
							
	if(data.server.result.fulfillment.hasOwnProperty('source') && data.server.result.fulfillment.source.localeCompare('webhook')==0)
	{
		processWebhook(data.server.result.fulfillment.data);
	}
	else
	{
		processResponse(data.server.result.fulfillment);
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
	setInput('Home','Hi');
}

function usefulLinks()
{
	requestToDialogflow("lighten mood","Lighten-mood");
}