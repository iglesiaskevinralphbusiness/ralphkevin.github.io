<?php
    include( "../../header-type.php" );
    include( "../../db-connection.php" );

    $data_obj = new stdClass;

    $user_id = stripslashes($_GET["uid"]);
    $url = stripslashes($_GET["url"]);
    $add = stripslashes($_GET["add"]);
    $time = stripslashes($_GET["time"]);

    if($add === true || $add === 'true'){
        $sql = "SELECT * FROM `bookmarks` WHERE `user_id` = '$user_id' AND `url` = '$url'";
        $result_user = $conn->query($sql);
        $total_user = $result_user->num_rows;
        if($total_user <= 0){
            $sql = "INSERT INTO `bookmarks` (`url`, `user_id`, `time`) VALUES ('$url', '$user_id', '$time')";
            if ($conn->query($sql) === TRUE) {
                $data_obj->response = "200";
                $data_obj->msg = "Comment successfully added/deleted!";
                http_response_code(200);
            } else {
                $data_obj->response = "400";
                $data_obj->msg = "Somethings error in php!";
                http_response_code(400);
            }
        } else {
            $data_obj->response = "400";
            $data_obj->msg = "Already added";
            http_response_code(400);
        }
    } else {
        $sql = "DELETE FROM `bookmarks` WHERE `user_id` = '$user_id' AND `url` = '$url'";
        if ($conn->query($sql) === TRUE) {
            $data_obj->response = "200";
            $data_obj->msg = "Comment successfully added/deleted!";
            http_response_code(200);
        } else {
            $data_obj->response = "400";
            $data_obj->msg = "Somethings error in php!";
            http_response_code(400);
        }
    }


    

    echo json_encode($data_obj);
?>