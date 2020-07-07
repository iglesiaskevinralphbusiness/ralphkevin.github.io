<?php
    if($_SERVER['HTTP_HOST'] == 'localhost'){
        $conn = new mysqli("127.0.0.1","root","","db_mangariot");
    }
    else if($_SERVER['HTTP_HOST'] == '127.0.0.1'){
        $conn = new mysqli("127.0.0.1","root","","db_mangariot");
    }
    else {
        $conn = new mysqli("localhost","riotadmin","rootriot","db_mangariot");
    }

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    $conn -> set_charset("utf8");
?>