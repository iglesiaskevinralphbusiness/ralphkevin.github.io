<?php
    $string = file_get_contents("http://localhost/assets/services/chapters.json");
    $json_a = json_decode($string, true);
    
    echo json_encode($json_a);
?>