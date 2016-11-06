<?php
/**
 * Created by PhpStorm.
 * User: 97279
 * Date: 2016/11/5
 * Time: 22:32
 */
require ('../init.inc.php');

$JSON=file_get_contents('php://input');
if(!$JSON){
    exitSend(ACCEPT_JSON_ERROR);
}
$jsonArray=json_decode($JSON,true);
$id=$jsonArray['id'];
$sql='select * from friends where userId='.$id.';';
$dbLink=connectMysqli();
$result=$dbLink->query($sql);
$friends=array();
while($row=$result->fetch_assoc()){
	$sql='select avatar,name from users where id='.$row['friendId'].';';
	$res=$dbLink->query($sql);
	$fRow=$res->fetch_assoc();
	$row['avatar']=IMGPATH.$fRow['avatar'];
	$row['name']=$fRow['name'];
	$row['state']="online";
	$friends[]=$row;	
}
exit(json_encode($friends));
