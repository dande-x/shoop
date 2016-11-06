<?php
function receiveImg(){
	$imgPaths=array();
	foreach($_FILES as $img){
		$imgTemp=$img['tmp_name'];
		$imgName=$img['name'];
		$imgSize=$img['size'];
		$imgError=$img['error'];
		$imgType=$img['type'];
		if ($imgError > 0) {
                switch ($imgError) {
                    case 1 :
                        //上传文件超出服务器空间大小
						return 1;
                    case 2 :
						//上传文件超出浏览器限制
						return 2;
                    case 3 :
					    //文件仅部分上传
						return 3;
                    case 4 :
						//没有找到要上传的文件
						return 4;
                    case 6 :
						//写入到临时文件夹出错
						return 5;
					default:
					  break;
				}
            }
		 if(is_uploaded_file($imgTemp)){
			  $randNumber=rand(10000,99999);
			  $imgType=explode('/',$imgType)[1];
			  $imgNewName=time().$randNumber.'.'.$imgType;
              if(move_uploaded_file($imgTemp, 'img/'.$imgNewName)){
				  $imgPaths[]=$imgNewName;				   
			   }else{
				   exitSend('SAVE FAIL');
			   }				
           }else{
                exitSend('UPLOAD FAIL');
           }
         

	}
	return $imgPaths;
}