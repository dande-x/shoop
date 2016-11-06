<?php
function exitSend($content){
	$result=array();
	$result['state']=$content;
	exit(json_encode($result)); 
}