<?php
/**
 * Created by PhpStorm.
 * User: 97279
 * Date: 2016/11/5
 * Time: 22:49
 */
require ('../init.inc.php');

$JSON=file_get_contents('php://input');
if(!$JSON){
    exitSend(ACCEPT_JSON_ERROR);
}
$jsonArray=json_decode($JSON,true);

$uid=$jsonArray['uid'];
$tid=$jsonArray['tid'];

$sql='replace online set ';

$sql='select * from unreadmessages where uid='.$tid.' and tid='.$uid.' and `type`="TEXT";';
$dbLink=connectMysqli();
$messages=array();
$result=$dbLink->query($sql);
while($row=$result->fetch_assoc()){
    $sql='insert into messages(uid,tid,content,`type`,sendtime) values('.$row['uid'].','.$row['tid'].',"'.$row['content'].'","TEXT","'.$row['sendtime'].'");';
	$dbLink->query($sql);
	$sql='select name from users where id='.$row['uid'].';';
	$nResult=$dbLink->query($sql);
	$nRow=$nResult->fetch_assoc();
	$row['name']=$nRow['name'];
	$messages[]=$row;
}
$sql='delete  from unreadmessages where uid='.$tid.' and tid='.$uid.' and `type`="TEXT";';
$result=$dbLink->query($sql);
exit(json_encode($messages));
