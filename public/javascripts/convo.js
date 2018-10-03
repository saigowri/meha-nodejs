var socket = io.connect('http://localhost:8010');

		$(document).ready(function() 
		{
			$('.hide-chat-box').click(function()
			{
					$('.chat-content').slideToggle();
					$('#minimize-icon').toggle();
					$('#maximize-icon').toggle();
			});
			
			$("#input").keypress(function(event) {
				if (event.which == 13) {
					event.preventDefault();
					send();
				}
			});
		});

		function setInput(disp,text) 
		{
			$("#input").attr("disabled", false);
			$(".btn-xs").attr("disabled", true);
			setResponse("<li class='pl-2 pr-2 bg-primary rounded text-white text-center send-msg mb-1'>"+
                                disp+"</li>");
			$("#input").val(text);
			socket.emit('fromClient', { client : text });
			//sendReply();
			$("#input").val("");
		}
		
		
		function send() 
		{
			var text = $("#input").val();
			socket.emit('fromClient', { client : text });
			console.log("User says:", text);
			setResponse("<li class='pl-2 pr-2 bg-primary rounded text-white text-center send-msg mb-1'>"+
                                text+"</li>");
			//sendReply();
			$("#input").val("");
		}

		function buttonDisplay(data) 
		{
					$("#input").attr("disabled", true);
					var totalMessages = Object.keys(data.server.fulfillment.messages).length;
					var responseMessage = "<li class='p-1 rounded mb-1'>"+
											"<div class='receive-msg'>"+
											"    <img src='https://storage.googleapis.com/cloudprod-apiai/68e117a8-bb38-48c1-a461-59297f9af6c0_l.png'>"+
											"<div class='container-fluid'>"+
											"  <div class='row'>";
					
					for ( var i = 0; i < totalMessages; i++)
					{
						var type = JSON.stringify(data.server.fulfillment.messages[i].type);
						var val = JSON.stringify(data.server.fulfillment.messages[i].textToSpeech);
						if(type.includes('simple_response')&&!val.includes('"button"'))
						{
						responseMessage = responseMessage +	"    <div class='col-sm-12 rcorners' style='margin-top:4px'>"+
											data.server.fulfillment.messages[i].textToSpeech+"</div>";
						}
					}
					for ( var i = 0; i < totalMessages; i++)
					{
						var type = JSON.stringify(data.server.fulfillment.messages[i].type);
						var val = JSON.stringify(data.server.fulfillment.messages[i].textToSpeech);
						if(type==4)
						{
							var return_val = "";
							if(data.server.fulfillment.messages[i].payload.hasOwnProperty('instruction'))
								responseMessage = responseMessage +	"    <div class='col-sm-12 rcorners' style='margin-top:4px'>"+
											data.server.fulfillment.messages[i].payload.instruction+"</div>";
							if(data.server.fulfillment.messages[i].payload.hasOwnProperty('return'))
								return_val = "next";
							if(data.server.fulfillment.messages[i].payload.hasOwnProperty('Option'))
							{
								responseMessage = responseMessage +	"  </div><div class='row' style='margin-top:4px'>";
								var width = data.server.fulfillment.messages[i].payload.width;
								for (var key in data.server.fulfillment.messages[i].payload.Option) 
								{
									if(return_val.localeCompare('next')==0)
										var buttonClick = 'setInput(this.value,"'+return_val+'")';
									else
										var buttonClick = 'setInput(this.value,this.value)';
									var buttons =	"    <div class='col-sm-"+width+"' style='margin-top:2px'>"+
											"		<button type='button' value='"+data.server.fulfillment.messages[i].payload.Option[key].title+
											"' onclick='"+buttonClick+"' class='btn btn-xs  btn-block btn-warning'>"+
											data.server.fulfillment.messages[i].payload.Option[key].title+
											"</button></div>";
									responseMessage = responseMessage + buttons;
								}
								responseMessage =	responseMessage + "  </div>";
							}
						}
					}
					responseMessage =	responseMessage +
											"</div>"+
											"</div>"+
										"</li>";
					setResponse(responseMessage);
		}
		
		function linkDisplay(data) 
		{
					var totalMessages = Object.keys(data.server.fulfillment.messages).length;
					var responseMessage = "<li class='p-1 rounded mb-1'>"+
											"<div class='receive-msg'>"+
											"    <img src='https://storage.googleapis.com/cloudprod-apiai/68e117a8-bb38-48c1-a461-59297f9af6c0_l.png'>"+
											"<div class='container-fluid'>"+
											"  <div class='row'>";
					
					for ( var i = 0; i < totalMessages; i++)
					{
						var type = JSON.stringify(data.server.fulfillment.messages[i].type);
						var val = JSON.stringify(data.server.fulfillment.messages[i].textToSpeech);
						if(type==4)
						{
							var return_val = "";
							if(data.server.fulfillment.messages[i].payload.hasOwnProperty('text'))
								responseMessage = responseMessage +	"    <div class='col-sm-12 rcorners' style='margin-top:4px'>"+
											data.server.fulfillment.messages[i].payload.text+"</div>";
							if(data.server.fulfillment.messages[i].payload.hasOwnProperty('Links'))
							{
								responseMessage = responseMessage +	"  </div><div class='row' style='margin-top:4px'>";
								var width = data.server.fulfillment.messages[i].payload.width;
								for (var key in data.server.fulfillment.messages[i].payload.Links) 
								{
									if(return_val.localeCompare('next')==0)
										var buttonClick = 'setInput(this.value,"'+return_val+'")';
									else
										var buttonClick = 'setInput(this.value,this.value)';
									var buttons =	"    <div class='col-sm-12 rcorners' style='margin-top:4px'>"+
											"<a href='"+data.server.fulfillment.messages[i].payload.Links[key].link+"'"+
											" rel='noopener noreferrer' target='_blank'>"+
											data.server.fulfillment.messages[i].payload.Links[key].title+"</a></div>";
									responseMessage = responseMessage + buttons;
								}
								responseMessage =	responseMessage + "  </div>";
							}
						}
					}
					responseMessage =	responseMessage +
											"</div>"+
											"</div>"+
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
				{ // recieveing a reply from server.
				  console.log(data.server);
				  
					var output = data.server.fulfillment.speech;
					if(output.localeCompare('button')==0)
					{
						buttonDisplay(data);
					}
					else if(output.localeCompare('link')==0)
					{
						linkDisplay(data);
					}
					else
					setResponse("<li class='p-1 rounded mb-1'>"+
                                "<div class='receive-msg'>"+
                                "    <img src='https://storage.googleapis.com/cloudprod-apiai/68e117a8-bb38-48c1-a461-59297f9af6c0_l.png'>"+
                                "    <div class='receive-msg-desc  text-center mt-1 ml-1 pl-2 pr-2'>"+
                                "        <p class='pl-2 pr-2 rounded'>"+output+"</p>"+
                                "    </div>"+
                                "</div>"+
                            "</li>");
				})
				
		function setResponse(val) 
		{
			$("#response").append(val);
			var chat_scroll=document.getElementById("chat-scroll");
			chat_scroll.scrollTop=chat_scroll.scrollHeight;
		}