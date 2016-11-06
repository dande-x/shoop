<?php
	//传入验证码类型和长度
	//0：数字
	//1：字母
	//2：数字+字母
	function imageCode($type=2,$length=4,$sessionName){	
	$width=80;
	$height=30;
	$image=imagecreatetruecolor($width,$height);
	$white=imagecolorallocate($image,255,255,255);
	$black=imagecolorallocate($image,0,0,0);
	//用填充矩形填充画布
	imagefilledrectangle($image,1,1,$width-2,$height-2,$white);
	$code=buildRandomString($type,$length);
	
	//$sess_name='verify';
	//$_SESSION[$sess_name]=$chars;
	
	$fontfiles=array("simhei.ttf","simkai.ttf","simsun.ttc",);
	//$fontfile='../fonts/'.$fontfiles[mt_rand(0,count($fontfiles)-1)];
	$fontfile=ROOT_PATH.'fonts/simkai.ttf';
	for($i=0;$i<$length;$i++){
		$size=mt_rand(14,18);
		imagettftext(
		$image,
		$size,
		mt_rand(-15,15),
		5+$i*$size,
		mt_rand(20,26),
		imagecolorallocate($image,mt_rand(50,90),mt_rand(80,200),mt_rand(90,150)),
		$fontfile,
		substr($code,$i,1)
		);
		
	}
	for($i=0;$i<20;$i++){
		imagesetpixel($image,mt_rand(0,$width-1),mt_rand(0,$height-1),imagecolorallocate($image,mt_rand(50,90),mt_rand(80,200),mt_rand(90,150)));	
	}
	for($i=0;$i<3;$i++){
		imageline($image,mt_rand(0,$width-1),mt_rand(0,$height-1),mt_rand(0,$width-1),mt_rand(0,$height-1),imagecolorallocate($image,mt_rand(50,90),mt_rand(80,200),mt_rand(90,150)));
	}
	$_SESSION[$sessionName]=$code;
	header("content-type:image/gif");
	imagegif($image);
	imagedestroy($image);
}


