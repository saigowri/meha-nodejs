<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ page import="properties.AccessProperties"%>	
<%@ page import="properties.CreateProperties"%>	
<%
	CreateProperties cp = new CreateProperties();
	AccessProperties ap = new AccessProperties();
%>
<!DOCTYPE html>
<html>

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script> 
    <link rel="stylesheet" type="text/css" href="css/chatbox.css" />
	<script>
    	var test = "<%=ap.getImageServerURL()%>";
		var currUserId = null;
		$(document).ready(function() 
		{
			alert(test);
			$('#chatbot-maximize').hide();
			  
			$('#chatbot-minimize').click(function() 
			{
			  $('#chatbot-iframe').toggle();
			  $('#chatbot-minimize').hide();
			  $('#chatbot-maximize').show();
			});
			$('#chatbot-maximize').click(function() 
			{
			  $('#chatbot-iframe').toggle();
			  $('#chatbot-minimize').show();
			  $('#chatbot-maximize').hide();
			});
			currUserId = document.getElementById('pushd-iframe').contentWindow.userId;
			$('#chatbot-iframe').attr('src','http://localhost:3000?userid='+currUserId);
		});
		function pushdReload(pushd)
		{
			var nextUserId = pushd.contentWindow.userId;
	  		console.log("Curr user id : ",nextUserId);
	  		if(currUserId != nextUserId)
	  		{
	  			currUserId = nextUserId; 
	  			$('#chatbot-iframe').attr('src','http://localhost:3000?userid='+currUserId);
	  		}
		}
		
	</script>
<iframe id="pushd-iframe" src="http://localhost:8080/pushd"  onload="pushdReload(this)"
style="position:fixed; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:0;" onLoad="alertSrc(this);">
    Your browser doesn't support iframes
</iframe>
<iframe id="chatbot-iframe"  class="chat-main">
    Your browser doesn't support iframes
</iframe>
<button id='chatbot-minimize' class="hide-chat-box"></button>
<img id='chatbot-maximize' class="chat-icon" src="images/Chatbox.png" alt="start chat">
</html>