<?php
/*header("Content-Type:application/json;charset=utf-8");
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow_methods:POST,GET");*/

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST,GET');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type');
define('ROOT_PATH',str_replace('\\','/',realpath(dirname(__FILE__).'/'))."/");
date_default_timezone_set('Asia/Shanghai'); 
/*if(!file_get_contents('php://input')){
	if(!isset($_GET['act'])){
		exit('getaway');
	}
}*/
session_start();
require(ROOT_PATH.'lib/mysqli.func.php');
require(ROOT_PATH.'conf/config.php');
require(ROOT_PATH.'lib/exitSend.func.php');
