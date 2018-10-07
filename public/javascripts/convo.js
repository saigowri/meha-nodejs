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
		
function scoreDisplay()
{
	if(parseInt(whoScore)>=50)
	{
		display("Great! You have done well. Your WHO score is "+ whoScore + ". There is no need for you to worry.");
		requestToDialogflow("WHO-High-Score",""); 	
	}
	else
	{
		display("Your WHO score is "+ whoScore + ". This is not a very good score. However, don't worry, I am here to help.");
		requestToDialogflow("WHO-Low-Score",""); 	
	}
	localStorage.setItem("whoScore", 0);
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

function buttonDisplay(fulfillment) 
{
	$("#input").attr("disabled", true);
	processResponse(fulfillment);
}

function processResponse(fulfillment)
{
	var totalMessages = Object.keys(fulfillment.messages).length;
	var responseMessage = "<li class='p-1 rounded mb-1'>"+
							"<div class='receive-msg'>"+
							"    <img src='"+img+"'>"+
							"<div class='container-fluid'>"+
						"  <div class='row'>";
	// Process Simple Response				
	for ( var i = 0; i < totalMessages; i++)
	{
		var type = JSON.stringify(fulfillment.messages[i].type);
		var val = JSON.stringify(fulfillment.messages[i].textToSpeech);
		if(type.includes('simple_response')&&!val.includes('"button"')&&!val.includes('"link"')&&!val.includes('"multiple"'))
		{
			responseMessage = responseMessage +	"    <div class='col-sm-12 rcorners' style='margin-top:4px'>"+
								fulfillment.messages[i].textToSpeech+"</div>";
		}
	}
	for ( var i = 0; i < totalMessages; i++)
	{
		var type = JSON.stringify(fulfillment.messages[i].type);
		var val = JSON.stringify(fulfillment.messages[i].textToSpeech);
		if(type==4)
		{
			var return_val = "";
			
			// For 2 messages (to be deprecated)
			if(fulfillment.messages[i].payload.hasOwnProperty('instruction'))
			responseMessage = responseMessage +	"    <div class='col-sm-12 rcorners' style='margin-top:4px'>"+
								fulfillment.messages[i].payload.instruction+"</div>";
			
			// For multiple texts and links
			if(fulfillment.messages[i].payload.hasOwnProperty('instructions'))
			{
				responseMessage = responseMessage +	"  </div><div class='row' style='margin-top:4px'>";
				var width = fulfillment.messages[i].payload.width;
				for (var key in fulfillment.messages[i].payload.instructions) 
				{
					// Text bubbles
					if(fulfillment.messages[i].payload.instructions[key].hasOwnProperty('text'))
						responseMessage = responseMessage +	"<div class='col-sm-12 rcorners' style='margin-top:4px'>"+
								fulfillment.messages[i].payload.instructions[key].text+"</div>";
					// Link URLs
					if(fulfillment.messages[i].payload.instructions[key].hasOwnProperty('link'))
						responseMessage = responseMessage +	"<div class='col-sm-12 rcorners' style='margin-top:4px'>"+
											"<a href='"+fulfillment.messages[i].payload.instructions[key].link.url+"'"+
											" rel='noopener noreferrer' target='_blank'>"+
											fulfillment.messages[i].payload.instructions[key].link.title+"</a></div>";
				}
				responseMessage =	responseMessage + "  </div>";
			}
			if(fulfillment.messages[i].payload.hasOwnProperty('return'))
							return_val = "next";
			if(fulfillment.messages[i].payload.hasOwnProperty('Option'))
			{
				responseMessage = responseMessage +	"  </div><div class='row' style='margin-top:4px'>";
				var width = fulfillment.messages[i].payload.width;
				for (var key in fulfillment.messages[i].payload.Option) 
				{
					console.log("return: ",return_val);
					if(fulfillment.messages[i].payload.hasOwnProperty('type') && 
						fulfillment.messages[i].payload.type.localeCompare('WHO')== 0 )
						{
							var buttonClick = 'setScore(this.value,this.id,"'+return_val+'")';
						}
					else if(return_val.localeCompare('next')==0)
						var buttonClick = 'setInput(this.value,"'+return_val+'")';
					else
						var buttonClick = 'setInput(this.value,this.value)';
					var buttons =	"    <div class='col-sm-"+width+"' style='margin-top:2px'>"+
									"		<button type='button' value='"+fulfillment.messages[i].payload.Option[key].title+
									"		' id='"+fulfillment.messages[i].payload.Option[key].score+"' onclick='"+buttonClick+"' class='btn btn-xs  btn-block btn-warning'>";
					if(fulfillment.messages[i].payload.Option[key].hasOwnProperty('icon'))
						buttons = buttons +	"<i class='"+fulfillment.messages[i].payload.Option[key].icon+" fa-3x'></i>&nbsp;";
					else
						buttons = buttons +fulfillment.messages[i].payload.Option[key].title;
					
					buttons = buttons +"		</button></div>";
					responseMessage = responseMessage + buttons;
				}
				responseMessage =	responseMessage + "  </div>";
			}
			if(fulfillment.messages[i].payload.hasOwnProperty('text'))
			responseMessage = responseMessage +	"    <div class='col-sm-12 rcorners' style='margin-top:4px'>"+
							fulfillment.messages[i].payload.text+"</div>";
			if(fulfillment.messages[i].payload.hasOwnProperty('Links'))
			{
				responseMessage = responseMessage +	"  </div><div class='row' style='margin-top:4px'>";
				var width = fulfillment.messages[i].payload.width;
				for (var key in fulfillment.messages[i].payload.Links) 
				{
					if(return_val.localeCompare('next')==0)
						var buttonClick = 'setInput(this.value,"'+return_val+'")';
					else
						var buttonClick = 'setInput(this.value,this.value)';
					var buttons =	"    <div class='col-sm-12 rcorners' style='margin-top:4px'>"+
									"<a href='"+fulfillment.messages[i].payload.Links[key].link+"'"+
									" rel='noopener noreferrer' target='_blank'>"+
									fulfillment.messages[i].payload.Links[key].title+"</a></div>";
					responseMessage = responseMessage + buttons;
				}
				responseMessage =	responseMessage + "  </div>";
			}
		}
	}
	responseMessage =	responseMessage +
						"		</div>"+
						"	</div>"+
						"</li>";
	setResponse(responseMessage);
}
		
function processWebhook(fulfillment)
{
	var responseMessage = "<li class='p-1 rounded mb-1'>"+
							"<div class='receive-msg'>"+
							"<div class='container-fluid'>"+
						"  <div class='row'>";
		for (var key in fulfillment.messages) 
		{
			// Link URLs
			// 0th element of link will be hardcoded to 'webhook-link'
			// 1st element of link will be link title
			// 2nd element of link will be link URL
			if(fulfillment.messages[key].speech[0].includes('webhook-link'))
			{
				responseMessage = responseMessage +	"<div class='col-sm-12 rcorners' style='margin-top:4px'>"+
								"<a href='"+fulfillment.messages[key].speech[2]+"'"+
								" rel='noopener noreferrer' target='_blank'>"+
								fulfillment.messages[key].speech[1]+"</a></div>";
			}
			else
				responseMessage = responseMessage +	"<div class='col-sm-12 rcorners' style='margin-top:4px'>"+
								fulfillment.messages[key].speech+"</div>";
		}
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
		
function display(output)
{
	setResponse("<li class='p-1 rounded mb-1'>"+
                    "<div class='receive-msg'>"+
                    "    <img src='"+img+"'>"+
                    "    <div class='col-sm-12 rcorners' style='margin-top:4px'>"+output+
                    "    </div>"+
                    "</div>"+
                "</li>");
}
		
socket.on('fromServer', function (data) 
{ 
	// recieveing a reply from server.
	console.log(JSON.stringify(data));
				  
	var output = data.server.result.fulfillment.speech;
	console.log(JSON.stringify(output));
	processResponse(data.server.result.fulfillment);
	/*if(output.localeCompare('WHO-End')==0)
	{
		scoreDisplay();
	}
	else if(output.localeCompare('button')==0)
	{
		buttonDisplay(data.server.result.fulfillment);
	}
	else if(output.localeCompare('link')==0 || output.localeCompare('multiple')==0)
	{
		processResponse(data.server.result.fulfillment);
	}
	else
		display(output);*/
				
				
	if(data.server.result.fulfillment.hasOwnProperty('source') && data.server.result.fulfillment.source.localeCompare('webhook-dm')==0)
	{
		processWebhook(data.server.result.fulfillment);
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