<?php
    include( "../../header-type.php" );
    include( "../../db-connection.php" );

    $data_obj = new stdClass;

    $username = stripslashes($_POST["username"]);
    
    if(!$username){
        $data_obj->response = "400";
        $data_obj->msg = "User profile not found.";
        http_response_code(400);
    } else {

        


    }

    echo json_encode($datas);
?>