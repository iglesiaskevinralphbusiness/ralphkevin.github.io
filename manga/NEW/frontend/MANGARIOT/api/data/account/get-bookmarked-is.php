<?php
    include( "../../header-type.php" );
    include( "../../db-connection.php" );

    $data_obj = new stdClass;

    $user_id = stripslashes($_GET["uid"]);
    $url = stripslashes($_GET["url"]);


    $sql = "SELECT * FROM bookmarks WHERE `user_id` = '$user_id' AND `url` = '$url'";
    $result_user = $conn->query($sql);
    $total_user = $result_user->num_rows;

    if($total_user > 0){
        $data_obj->response = "200";
        $data_obj->data = true;
        http_response_code(200);
    } else {
        $data_obj->response = "200";
        $data_obj->data = false;
        http_response_code(200);
    }

    echo json_encode($data_obj);
?>