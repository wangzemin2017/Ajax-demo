//通过php文件访问Json文件，从而获取数据

<?php

	// 指定文档类型
	header('Content-Type:application/json; charset=utf-8');

	$result = file_get_contents('stars.json');

	echo $result;


?>