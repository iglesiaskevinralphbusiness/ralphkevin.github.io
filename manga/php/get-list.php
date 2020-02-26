<?php
    $list = "./json/list.json";
    $chapters = "./json/chapters.json";

    $myfile = fopen($list, "r") or die("Unable to open file!");
    $response_list = fread($myfile,filesize($list));
    fclose($myfile);

    
?>