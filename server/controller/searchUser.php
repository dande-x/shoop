<?php
/**
 * Created by PhpStorm.
 * User: 97279
 * Date: 2016/11/6
 * Time: 23:49
 */
require ('../init.inc.php');

$JSON=file_get_contents('php://input');
if(!$JSON){
    exitSend(ACCEPT_JSON_ERROR);
}
$jsonArray=json_decode($JSON,true);
$email=$jsonArray['email'];
$sql='select id,name from users where email="'.$email.'";';
$dbLink=connectMysqli();
$result=$dbLink->query($sql);
$row=$result->fetch_assoc();
if($row==null){
    exitSend(USER_NOT_EXIST);
}else{
    exit(json_encode($row));
}