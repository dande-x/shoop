<?php
/**
 * Created by PhpStorm.
 * User: 97279
 * Date: 2016/11/5
 * Time: 21:06
 */
define ('DEFAULT_CHARSET','utf-8');
define ('DATABASE_CONNECT','Mysqli');   //备选    PDO
define ('DATABASE_HOST','localhost');
define ('DATABASE_USER','root');
define ('DATABASE_PASSWORD','');
define ('DATABASE_DBNAME','shoop');

//图片路径
define ('IMGPATH','http://127.0.0.1/shoop/server/img/');

define('LOGIN_SUCCESS',1000);
define('USER_NOT_EXIST',1001);
define('PASSWORD_WRONG',1002);
define('USER_EXIST',1003);
define('REGISTER_SUCCESS',1004);
define('VERIFY_CODE_WRONG',1005);

define('REQUEST_ADD_FRIEND_SUCCESS',1006);
define('ADD_FRIEND_SUCCESS',1007);
define('DB_INSERT_ERROR',1020);
define('ACCEPT_JSON_ERROR',1021);