<?php
/**
 * Created by PhpStorm.
 * User: 97279
 * Date: 2016/11/7
 * Time: 0:41
 */
require ('../init.inc.php');

$JSON=file_get_contents('php://input');
if(!$JSON){
    exitSend(ACCEPT_JSON_ERROR);
}
$jsonArray=json_decode($JSON,true);

$id=$jsonArray['id'];

$sql='select * from unreadmessages where tid='.$id.' and `type`="FRIEND" and content="0";';
$dbLink=connectMysqli();
$messages=array();
$result=$dbLink->query($sql);
while($row=$result->fetch_assoc()){
    $sql='select name from users where id='.$row['uid'].';';
    $nResult=$dbLink->query($sql);
    $nRow=$nResult->fetch_assoc();
    $row['name']=$nRow['name'];
    $messages[]=$row;
}
$sql='update  unreadmessages  set content="1" where tid='.$id.' and `type`="FRIEND" and content="0";';
$result=$dbLink->query($sql);
exit(json_encode($messages));