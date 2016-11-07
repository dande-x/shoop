/**
 * Created by 97279 on 2016/11/7.
 */
function getFriend(){
    createPrompt();
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
function searchUser(){
    var email=document.getElementById("searchInput").value;
    var data='{"email":"'+email+'"}';
    ajaxJson(data,getCookie("serverAddress")+"searchUser.php",8);
}
function requestAddFriend(){
    var email=document.getElementById("searchInput").value;
    var id=getCookie('userId');
    var data='{"email":"'+email+'","id":'+id+'}';
    ajaxJson(data,getCookie("serverAddress")+"requestAddFriend.php",9);
}

function  acceptAddFriend(elem) {
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
    var messages =document.getElementsByClassName('requestFriend');
    for(var i=0;i<messages.length;i++){
        messages[i].style.display="inline";
    }

    var id=getCookie('userId');
    var data='{"id":'+id+'}';
    ajaxJson(data,getCookie("serverAddress")+"acceptAddFriend.php",10);

}
function agreeAddFriend(id){
    var data='{"uid":'+getCookie('userId')+',"tid":'+id+',"content":"y"}';
    ajaxJson(data,getCookie("serverAddress")+"replyAddFriend.php",11);
}
function disagreeAddFriend(id) {
    var data='{"uid":'+getCookie('userId')+',"tid":'+id+',"content":"n"}';
    ajaxJson(data,getCookie("serverAddress")+"replyAddFriend.php",11);
}
function  createFriendMessage(message) {
    var li = document.createElement("li");
    li.className+=' requestFriend ';
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
    div2.innerHTML="该用户请求添加为好友，是否同意？"+"</br>";
    var agreeButton=document.createElement("button");
    var disagreeButton=document.createElement("button");
    agreeButton.onclick=function(){agreeAddFriend(message.uid);};
    agreeButton.innerHTML="同意";
    disagreeButton.innerHTML="拒绝";
    disagreeButton.onclick=function(){disagreeAddFriend(message.uid);};
    div2.appendChild(agreeButton);
    div2.appendChild(disagreeButton);
    li.appendChild(div1);
    li.appendChild(div2);
    return li;
}