<?php

    if(!isset($_SERVER['PHP_AUTH_USER'])){
        header("WWW-Authenticate: Basic realm=\"Private Area\"");
        header("HTTP/1.0 401 Unauthorized");
        print "Sorry, you need proper credentials";
    }
    else {
        if(($_SERVER['PHP_AUTH_USER'] == 'mangabay' && ($_SERVER['PHP_AUTH_PW'] == 'mangabay'))){
            header('Access-Control-Allow-Origin: *');
            header("Content-type: application/json; charset=utf-8");

            $list = "./json/list.json";
            $chapters = "./json/chapters.json";
        
            $myfile = fopen($list, "r") or die("Unable to open file!");
            $response_list = fread($myfile,filesize($chapters));
            fclose($myfile);

            echo $response_list; 
        }
        else {
            header("WWW-Authenticate: Basic realm=\"Private Area\"");
            header("HTTP/1.0 401 Unauthorized");
            print "Sorry, you need proper credentials";
        }
    }


    

    
?>