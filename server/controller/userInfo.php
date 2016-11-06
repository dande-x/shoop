<?php
/**
 * Created by PhpStorm.
 * User: 97279
 * Date: 2016/11/5
 * Time: 22:26
 */
require ('../init.inc.php');

$JSON=file_get_contents('php://input');
if(!$JSON){
    exitSend(ACCEPT_JSON_ERROR);
}
$jsonArray=json_decode($JSON,true);
$email=$jsonArray['email'];
$sql='select * from users where email="'.$email.'";';
$dbLink=connectMysqli();
$result=$dbLink->query($sql);
$row=$result->fetch_assoc();
$row['avatar']=IMGPATH.$row['avatar'];
exit(json_encode($row));