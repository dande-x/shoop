/**
 * Created by 97279 on 2016/11/7.
 */
function login(){
    if(!checkLogInput()){
        return;
    }
    var email=document.getElementById("lemail").value;
    var password=document.getElementById("lpassword").value;
    var data='{"email":"'+email+'","password":"'+password+'"}';
    ajaxJson(data,getCookie("serverAddress")+"login.php",1);
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

function turnRegister(){
    window.location.href="register.html";
}