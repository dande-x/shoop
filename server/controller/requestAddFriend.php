<?php
/**
 * Created by PhpStorm.
 * User: 97279
 * Date: 2016/11/6
 * Time: 23:50
 */
require ('../init.inc.php');

$JSON=file_get_contents('php://input');
if(!$JSON){
    exitSend(ACCEPT_JSON_ERROR);
}
$jsonArray=json_decode($JSON,true);
$email=$jsonArray['email'];
$id=$jsonArray['id'];
$sql='select id from users where email="'.$email.'";';
$dbLink=connectMysqli();
$result=$dbLink->query($sql);
$row=$result->fetch_assoc();

if($row==null){
    exitSend(USER_NOT_EXIST);
}else{
    $tid=$row['id'];
    $sql ='insert into unreadmessages(uid,tid,`type`,sendtime,content) values('.$id.','.$tid.',"FRIEND","'.date('Y-m-d H:i:s',time()).'","0");';
    if($result=$dbLink->query($sql)){
        exitSend(REQUEST_ADD_FRIEND_SUCCESS);
    }else{
        exitSend(ACCEPT_JSON_ERROR);
    }

}
