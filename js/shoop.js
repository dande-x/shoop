
function showHint(){
	//定时器函数

	var userId=getCookie("userId");
	//显示消息提示
	//ajaxJson('{"id":"'+userId+'"}',"http:",5);
	
	//获取当前选择的好友的消息
	var choose=document.getElementsByClassName("choose");
	var str=choose[0].id;
	var friendId=str.split("_")[1];
	ajaxJson('{"uid":'+userId+',"tid":'+friendId+'}',getCookie("serverAddress")+"getMessage.php",6);
	
}
function getFriend(){
createPrompt();
}
function showMessage(elem) {
	//选中一个好友，显示消息
	var friends = document.getElementsByClassName("friend");
	for(var i = 0; i < friends.length; i++) {
		var cla = friends[i].className;
		friends[i].className = cla.replace(/choose/, " ");
	}
	elem.className += ' choose ';
	var cls = elem.className;
	elem.className=cls.replace(/hint/," ");
	//delMessages();
	//网络请求，获取与该好友的聊天数据
	
	hideMessages();
	//隐藏所有消息
	
	//显示自己消息
	var str=elem.id;
	var friendId=str.split("_")[1];
	var messages =document.getElementsByClassName('friendId_'+friendId);
	for(var i=0;i<messages.length;i++){
		messages[i].style.display="inline";
	}
	var data='{"uid":'+getCookie('userId')+',"tid":'+friendId+'}';
	ajaxJson(data,getCookie("serverAddress")+"getMessage.php",6);
}

function delMessages() {
	var messages = document.getElementById("messages");
	while(messages.hasChildNodes()) {
		messages.removeChild(messages.firstChild);
	}

}
function hideMessages(){
	//隐藏所有消息
	var friends=document.getElementById("friends").getElementsByTagName("li");
	
	for(var j=0;j<friends.length;j++){
		var str=friends[j].id;
		var friendId=str.split("_")[1];
		var messages =document.getElementsByClassName('friendId_'+friendId);

		for(var i=0;i<messages.length;i++){
			
			messages[i].style.display="none";
		}
	}
}
function addMessages(data) {
	var messages = document.getElementById("messages");
	for(var i = 0; i < data.length; i++) {
		if(data[i].sendid=其他人){
			var li=createOtherMessage(data[i]);
			messages.appendChild(li);
		}else{
			var li=createMyMessage(data[i]);
			messages.appendChild(li);
		}
	}
	
} 
function getChooseId(){
	var chooseFriend=document.getElementsByClassName("choose");
	var str=chooseFriend[0].id;
	var friendId=str.split("_")[1];
	return friendId;
}

function keyEvent(){
	if(event.keyCode==13){
		sendMessage();
	}	
}
function sendMessage(){
	var content =document.getElementById("message-to-send").value;
	document.getElementById("message-to-send").value="";
	var friendId=getChooseId();
	var myDate=new Date();
	var data=Array;
	data['sendName']=getCookie("userName");
	data['sendTime']=myDate.toLocaleString();
	data['content']=content;
	data['friendId']=friendId;
	
	document.getElementById('messagesDiv').scrollTop =document.getElementById('messagesDiv').scrollHeight+100;
	var messages = document.getElementById("messages");
	var message=createMyMessage(data);
	messages.appendChild(message);
	var userId=getCookie("userId");
	
	var messageJson='{"uid":'+userId+',"tid":'+friendId+',"content":"'+content+'","type":"TEXT"}';
	ajaxJson(messageJson,getCookie("serverAddress")+"sendMessage.php",7);
}


function createOtherMessage(message) {
	var li = document.createElement("li");
	li.className+=' friendId_'+message.friendId+' ';
	var div1=document.createElement("div");
	div1.className+=' message-data ';
	var sname=document.createElement("span");
	sname.className+=' message-data-name ';
	sname.innerHTML=message.name;  //发送者姓名
	var sdate=document.createElement("span");
	sdate.className+=' message-data-time ';
	sdate.innerHTML=message.sendtime;
	div1.appendChild(sname);
	div1.appendChild(sdate);
	var div2=document.createElement("div");
	div2.className+=' message my-message ';
	div2.innerHTML=message.content;
	li.appendChild(div1);
	li.appendChild(div2);
	return li;
}


function createMyMessage(message){
	var li = document.createElement("li");
	li.className+=' friendId_'+message.friendId+' ';
	li.className+=" clearfix ";
	var div1=document.createElement("div");
	div1.className+=' message-data align-right ';
	var sname=document.createElement("span");
	sname.className+=' message-data-name ';
	sname.innerHTML=message.sendName;  //发送者姓名
	var sdate=document.createElement("span");
	sdate.className+=' message-data-time ';
	sdate.innerHTML=message.sendTime+"&nbsp&nbsp";
	div1.appendChild(sdate);
	div1.appendChild(sname);
	var div2=document.createElement("div");
	div2.className+=' message other-message float-right ';
	div2.innerHTML=message.content;
	li.appendChild(div1);
	li.appendChild(div2);
	return li;
}


            
function getFriends(){
	var userId=getCookie("userId");
	var data='{"id":"'+userId+'"}';
	ajaxJson(data,getCookie("serverAddress")+"friendList.php",3);
	//var friends=document.getElementById("friends");
	//var message='{"friendId":"1","name":"{{friendName}}","state":"online","avatar":"http:\/\/img.woyaogexing.com\/2016\/10\/25\/40fad41b077a5c5b!200x200.png"}';
	//var friend=JSON.parse(message);

	//var li=createFriend(friend);
	//friends.appendChild(li);
}

function createFriend(message){
	var li = document.createElement("li");
	li.className+=" clearfix friend ";
	
	li.id="friendId_"+message.friendId;
	
	var img=document.createElement("img");
	img.src=message.avatar;
	img.className+=" avatar ";
	img.alt="avatar";
	
	var div=document.createElement("div");
	var divName=document.createElement("div");
	var divState=document.createElement("div");
	var i=document.createElement("i");
	li.appendChild(img);
	div.className+=" about ";
	divName.className+=" name ";
	divState.className+=" status ";
	divName.innerHTML=message.name;
	i.className+=" fa  fa-circle offline ";
	i.innerHTML="&nbsp";
	divState.appendChild(i);
	divState.innerHTML+=message.state;
	div.appendChild(divName);
	div.appendChild(divState);
	li.appendChild(div);
	li.onclick=function(){showMessage(this);};
	//li.setAttribute("onclick","javascript:alert('测试');");
	return li;
}
