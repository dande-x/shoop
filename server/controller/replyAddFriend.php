<?php
/**
 * Created by PhpStorm.
 * User: 97279
 * Date: 2016/11/7
 * Time: 1:39
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

$sql='update  unreadmessages set content="'.$content.'" where tid='.$uid.' and uid='.$tid.' and `type`="FRIEND";';
$dbLink=connectMysqli();
$result=$dbLink->query($sql);
if($content=="y") {
    $sql = 'insert into friends(userId,friendId) values('.$uid.','.$tid.'); ';
    $dbLink->query($sql);
    $sql='insert into friends(userId,friendId) values('.$tid .','.$uid.'); ';
    if($nResult = $dbLink->query($sql)){
        exitSend(ADD_FRIEND_SUCCESS);
    }
}
