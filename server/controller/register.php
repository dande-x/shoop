<?php
/**
 * Created by PhpStorm.
 * User: 97279
 * Date: 2016/11/5
 * Time: 21:15
 */
require ('../init.inc.php');
/*
$JSON=file_get_contents('php://input');
if(!$JSON){
    exitSend(ACCEPT_JSON_ERROR);
}

$jsonArray=json_decode($JSON,true);
$email=$jsonArray['email'];
$password=$jsonArray['password'];
$code=$jsonArray['code'];
*/
$email=$_POST['email'];
$email=addslashes($email);
$password=$_POST['password'];
$code=$_POST['code'];
if($code!=$_SESSION['regCode']){
    echo "<script language='javascript' type='text/javascript'> ";
		//echo "alert('验证码错误');window.location.href='$url'";  跳转，刷新验证码，无法保留数据。		
	echo 'window.onload=function(){alert("验证码错误！");history.go(-1);}; ';//无法刷新验证码
	echo '</script>';
    exit;
}
$sql='insert into users(email,password) values("'.$email.'","'.$password.'");';
$dbLink=connectMysqli();
if(!$result=$dbLink->query($sql)){
    echo "<script language='javascript' type='text/javascript'> ";
		//echo "alert('验证码错误');window.location.href='$url'";  跳转，刷新验证码，无法保留数据。		
	echo 'window.onload=function(){alert("用户已存在");history.go(-1);}; ';//无法刷新验证码
	echo '</script>';
}else{
    echo "<script language='javascript' type='text/javascript'> ";
	echo "alert('注册成功');window.location.href='../../login.html'";  //跳转，刷新验证码，无法保留数据。
	echo '</script>';
}
