
function init(){
	setCookie("serverAddress","http://127.0.0.1/shoop/server/controller/",1);
}
function setCookie(cookiename, cookievalue, hours) {
var date = new Date();
date.setTime(date.getTime() + Number(hours) * 3600 * 1000);
document.cookie = cookiename + "=" + cookievalue + "; path=/;expires = " + date.toGMTString();

}

function getCookie(name){  
        var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));  
        if(arr != null){  
            return (arr[2]);  
        }else{  
            return "";  
        }  
  } 
  function delcookie(name){  
        var exp = new Date();  
        exp.setTime(exp.getTime() - 1);  
        var cval=getCookie(name);  
        if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();  
    }
function showHint(){
	//定时器函数
	var userId=getCookie("userId");
	//显示消息提示
	//ajaxJson('{"id":"'+userId+'"}',"http:",5);

	//获取请求好友信息
	//acceptAddFriend();

	//获取当前选择的好友的消息
	var choose=document.getElementsByClassName("choose");
	if(choose.length>0&&choose[0].id!="requestFriend") {
		var str = choose[0].id;
		var friendId = str.split("_")[1];
		ajaxJson('{"uid":' + userId + ',"tid":' + friendId + '}', getCookie("serverAddress") + "getMessage.php", 6);
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

function initUser(){
	if(getCookie("email")==""){
		alert("请先登陆！");
		window.location.href="login.html";
		return ;
	}
	var email=getCookie("email");
	var data ='{"email":"'+email+'"}';
	ajaxJson(data,getCookie("serverAddress")+"userInfo.php",4);
	//delcookie("email");
		
}
function ale(data,flag){
	if(typeof(data.state)=="undefined"){
		if(flag==3){
			//请求好友列表的操作
			var friends=document.getElementById("friends");

			for(var i=0;i<data.length;i++){
			var li=createFriend(data[i]);
			friends.appendChild(li);
			}
			return;
		}else if(flag==4){
			//保存用户信息
			var name=data.name;
			document.getElementById("userName").innerHTML=name;
			document.getElementById("userAvatar").src=data.avatar;
			setCookie("userId",data.id,1);
			setCookie("userName",name,1);
			getFriends();
			return;
			
		}else if(flag==5){
			//提示消息
			for(var i=0;i<data.length;i++){
				var friend=document.getElementById("friendID"+data[i]);
				friend.className+=" hint ";
			}
			
		}else if(flag==6){
			//为当前选中的好友添加消息
			if(data.length==0){
				return;
			}
			var friendId=data[0].uid;
			var messages=document.getElementById("messages");
			var choose=document.getElementsByClassName("choose");
			var str=choose[0].id;
			var newFriendId=str.split("_")[1];
			//如果异步请求导致用户切换了好友，则判断当前选中和该消息好友是否相同
			for(var i=0;i<data.length;i++){
				var message=data[i];
				message['friendId']=friendId;
				var li=createOtherMessage(message);
				if(newFriendId==friendId){
					li.style.display="inline";
				}else{
					li.style.display="none";
				}
				messages.appendChild(li);
			}    
			return ;
		}else if(flag==7){
			//发消息
		}else if(flag==8){
			//查找用户
			alert('已查找到该用户，用户名：'+data.name);
			return ;
		}else if(flag==10){
			//获取加好友信息
			var messages=document.getElementById("messages");
			for(var i=0;i<data.length;i++){
				var li=createFriendMessage(data[i]);
				messages.appendChild(li);
			}
			return;
		}else if(flag==11){

		}
	}
	
	switch (data.state){
		case 1004:
			window.location.href="login.html";
			
			return true;
		break;
		case 1000:{
			var email=document.getElementById("lemail").value;
			setCookie("email",email,1);
	
		 	window.location.href="MainChat.html";
		 	return false;
			break;
		}
		case 1001:
			alert("用户名不存在!");
			return false;
		break;
		case 1002:
			alert("密码错误!");
			
			return false;
		break;
		case 1003:
			alert("用户已存在!");
			return false;
		break;
		case 1005:
			alert("验证码错误!");
		return false;
		case 1006:
			//请求好友成功
			alert("请求好友成功！");
			break;
		case 1007:
			alert("添加好友成功！");
			break;
		case 1021:
			alert("网络错误!");
			break;
		default:
			alert("网络错误");
			return false;
		break;
	}
}
function ajaxJson(data,Url,flag){
	var request = new XMLHttpRequest();
	request.open("POST",Url);
	console.log("ajaxJson"+data);
	request.setRequestHeader("Content-Type", "application/json; charset=utf-8");
	request.send(data);
	request.onreadystatechange = function() {
		if(request.readyState === 4) {
			if(request.status === 200) {
				//console.log("responseText"+request.responseText);
				var data = JSON.parse(request.responseText);
				console.log(data);
				if(!ale(data,flag)){
					return ;
				}
				
			} else {
				return false;
				alert("网络错误");
			}
		} else {
			return false;
			alert("网络错误");
		}
	}
	
}
function closeSearch(){
	document.getElementById("promptID").parentNode.removeChild(document.getElementById("promptID"));
	document.getElementById("mask").parentNode.removeChild(document.getElementById("mask"));
}
