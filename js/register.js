/**
 * Created by 97279 on 2016/11/7.
 */
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

function turnLogin(){
    window.location.href="login.html";
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