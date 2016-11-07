<?php
/**
 * Created by PhpStorm.
 * User: 97279
 * Date: 2016/11/5
 * Time: 22:40
 */
require ('../init.inc.php');

$JSON=file_get_contents('php://input');
if(!$JSON){
    exitSend(ACCEPT_JSON_ERROR);
}
$jsonArray=json_decode($JSON,true);

$uid=$jsonArray['uid'];
$tid=$jsonArray['tid'];
$content=$jsonArray['content'];

$sql='insert into unreadmessages(uid,tid,content,`type`,sendtime) values('.$uid.','.$tid.',"'.$content.'","TEXT","'.date('Y-m-d H:i:s',time()).'");';


$dbLink=connectMysqli();
$result=$dbLink->query($sql);
