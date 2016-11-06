
function register() {
	if(!checkRegInput()) {
		return;
	}
	var email = document.getElementById("remail").value;
	var password = document.getElementById("password1").value;
	var code = document.getElementById("code").value;
	var data='{"email":"'+email+'","password":"'+password+'","code":"'+code+'"}';
	ajaxJson(data,getCookie("serverAddress")+"register.php",0);
		
}
function turnRegister(){
	window.location.href="register.html";
}
function turnLogin(){
	window.location.href="login.html";
}
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
function login(){
	if(!checkLogInput()){
		return;
	}
	var email=document.getElementById("lemail").value;
	var password=document.getElementById("lpassword").value;
	var data='{"email":"'+email+'","password":"'+password+'"}';
	ajaxJson(data,getCookie("serverAddress")+"login.php",1);
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
	delcookie("email");
		
}
function ale(data,flag){
	if(typeof(data.state)=="undefined"){
		if(flag==3){
			//请求好友列表的操作
			var friends=document.getElementById("friends");
			console.log(data);
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
			//查找好友
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
			var friends=document.getElementById("friends");
			for(var i=0;i<data.length;i++){
			var li=createFriend(data[i]);
			}
			
			friends.appendChild(li);
			return true;
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
function checkLogInput() {
	if(document.getElementById("lemail").value==""){
		alert("请检查您输入的邮箱。");
		return false;
	}
	if(document.getElementById("lpassword").value==""){
		alert("请检查您输入的密码。");
		return false;
	}
	return true;
}
function isEmail(str){
  var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
  return reg.test(str);
}
function checkRegInput() {
	if(!confirmPassword()) {
		alert("请检查您输入的密码。");
		return false;
	}
	if(!checkEmail()) {
		alert("请检查您输入的邮箱。");
		return false;
	}
	if(document.getElementById("t1").checked) {
		return true;
	} else {
		alert("请同意shoop条款。");
		return false;
	}

}

function checkEmail() {
	//判断邮箱地址是否合法，是否已经存在
	var email = document.getElementById("remail").value;
	if(!isEmail(email)){
		return false;
	}
	//if(emial)
	return true;
}
//判断两次密码输入是否相同
function confirmPassword() {
	var password = document.getElementById("password1").value;
	var confirmpassword = document.getElementById("password2").value;
	if(password.length < 6) {
		document.getElementById("passwordlength").innerHTML = "输入密码长度小于6位！";
		document.getElementById("passwordlength").style.color = "red";
		return false;
	} else {
		document.getElementById("passwordlength").innerHTML = "";
		if(password != "" && confirmpassword != "") {
			if(password != confirmpassword) {
				document.getElementById("alertpassword").innerHTML = "输入密码不一致！";
				document.getElementById("alertpassword").style.color = "red";
				return false;
			} else {
				document.getElementById("alertpassword").innerHTML = "输入密码一致。";
				document.getElementById("alertpassword").style.color = "green";
			}
		}
	}

	return true;
}
function closeSearch(){
	document.getElementById("promptID").parentNode.removeChild(document.getElementById("promptID"));
	document.getElementById("mask").parentNode.removeChild(document.getElementById("mask"));
}
function searchFriend(){
	var email=document.getElementById("searchInput").value;
	var data='{"email":"'+email+'"}';
	ajaxJson(data,getCookie("serverAddress")+"",8);
}
function addFriend(){
	var email=document.getElementById("searchInput").value;
	var data='{"email":"'+email+'"}';
	ajaxJson(data,getCookie("serverAddress")+"",9);
}
function createPrompt()
{
    var divSp = document.createElement("div");    //弹出对话框
    var newMask = document.createElement("div");  //遮罩层，用来屏蔽灰掉背部界面
    var btnSub = document.createElement("input"); // 弹出对话框中按钮
    var inner;

    // 弹出对话框中要呈现的页面元素布局等html代码
    inner = '<div class="fieldset" style="height:300px  background:#A9A9A9">';
    inner += ' <div class="fs-heading" style=" background:#6a6c75">';
    inner += ' <h2 >请输入用户的邮箱地址。</h2>';
    inner += ' </div>';
    inner += ' <ul class="fs-fieldgroup">';
    inner += ' <li><br/>';
    inner += ' 邮箱地址：<input id="searchInput" type="text"  class="searchinput">    ';
    inner += ' </li>';
    inner += ' <li><br/>';
    inner += ' <button onclick="searchFriend()" style="width:70px; height:30px">搜索</button>'+
    '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp'+
    '<button onclick="addFriend()" style="width:70px; height:30px">添加</button>'+
    '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp'+
    '<button onclick="closeSearch()" style="width:70px; height:30px">关闭</button>';
    inner += '</li>';
    inner += ' </ul>';
    inner += '</div>';

    // 创建弹出层 遮罩层 等 
    if ( !document.getElementById("mask") && 1)
    {      
        //mask div    
        newMask.id = "mask";
        newMask.style.position = "absolute";
        newMask.style.zIndex = "1";
        newMask.style.width = "100%";
        newMask.style.height = Math.max(document.body.scrollHeight,document.documentElement.scrollHeight) + 100 + "px";
        newMask.style.top = "0px";
        newMask.style.left = "0px";
        newMask.style.background = "6a6c75";
        newMask.style.filter = "alpha(opacity=80)";
        newMask.style.opacity = "0.5";
        document.body.appendChild(newMask);      
    }
     
    if ( !document.getElementById("promptID"))
    {
        //new div (prompt)
        divSp.setAttribute("id", "promptID");
        divSp.style.position = "absolute";
        divSp.style.padding = "8px";
        divSp.style.width = "10px";
        divSp.style.height = "10px";
        divSp.style.zIndex = "5000"; 
        divSp.style.top = parseInt(window.screen.height * 0.21)+document.body.scrollTop+document.documentElement.scrollTop + 30 + "px";
        divSp.style.left = parseInt(document.body.offsetWidth * 0.31)+document.body.scrollLeft+document.documentElement.scrollLeft + "px";
        divSp.style.border = "1px dotted #6a6c75";
        divSp.style.backgroundColor = "#6a6c75";
        divSp.innerHTML = inner;
        document.body.appendChild(divSp);
        openDiv();
    } 
    //it can be operated in Android
    if (merfound != 1)
    {
    document.getElementsByName("adsl_username")[0].disabled = "disabled";
    document.getElementsByName("adsl_pwd")[0].disabled = "disabled";
    } 

    if ( !document.getElementById("btnSubID"))
    {
        btnSub.setAttribute("id", "btnSubID");
        btnSub.setAttribute("class", "btn-subtle");
        btnSub.type = "button";
        btnSub.style.width = "100px";
        btnSub.style.position = "absolute";
        btnSub.style.top = "80%";
        btnSub.style.left = "40%"; 
        btnSub.value = "Save ";
        btnSub.onclick = function(){
          setTimeZone();
          setTimeout("restore()", 6000);    
          btnSub.setAttribute("class", "delClass");
          document.getElementById("btnSubID").disabled = "disabled";
        };
        document.getElementById("promptID").appendChild(btnSub);
    }    
}

// 调整弹出对话框宽度和高度
function openDiv()
{
    var divPrompt = document.getElementById("promptID");
    
    var viewWidth = parseInt(document.body.offsetWidth * 0.37);
    var viewHeight = parseInt(window.screen.height  * 0.18);

    if (viewWidth < 460 || viewWidth > 500)
    {
        viewWidth = 300;
    }
 
    if (viewHeight < 180 || viewHeight > 240)
    {
        viewHeight = 190;
    }

    divPrompt.style.width=viewWidth + "px";  
    divPrompt.style.height=viewHeight + "px";
}