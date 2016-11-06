<?php

function useExist($phone){
	$dbLink=connectMysqli();
	$sql='select * from user where phone = "'.$phone.'";';
	$result=$dbLink->query($sql);
	$row=$result->fetch_assoc();
	if($row==null){	
		$result->free();		
		$dbLink->close();
		return false;
	}else{
		$result->free();		
		$dbLink->close();
		return true;
	}	
}
