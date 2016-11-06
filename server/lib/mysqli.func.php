<?php
	    function connectMysqli() {
          $dbLink=new mysqli(DATABASE_HOST,DATABASE_USER,DATABASE_PASSWORD,DATABASE_DBNAME);
            if(mysqli_connect_errno()){
	           exit(CONNECT_DATABASE_ERROR_CODE);
              }
            else{
	           $dbLink->query("set names utf8");
            }
			return $dbLink;
       }
	   
	   