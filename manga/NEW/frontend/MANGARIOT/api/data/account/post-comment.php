<?php
    include( "../../header-type.php" );
    include( "../../db-connection.php" );

    $data_obj = new stdClass;

    $user_id = stripslashes($_POST["uid"]);
    $url = stripslashes($_POST["url"]);
    $reply_id = stripslashes($_POST["reply_id"]);
    $comment = addslashes(stripslashes($_POST["comment"]));
    $time = stripslashes($_POST["time"]);

    $user_id = stripslashes($_POST["uid"]);
    $sql = "SELECT * FROM users WHERE `user_id` = '$user_id'";
    $result_user = $conn->query($sql);
    $total_user = $result_user->num_rows;
    
    if(!$total_user){
        $data_obj->response = "400";
        $data_obj->msg = "User profile not found.";
        http_response_code(400);
    } else {
        if(!$reply_id){
            //top comment
            $sql = "INSERT INTO comments (`url`, `user_id`, `time`, `comment`) VALUES ('$url', '$user_id', '$time', '$comment')";
            if ($conn->query($sql) === TRUE) {
                $data_obj->response = "200";
                $data_obj->msg = "Comment successfully added!";
                http_response_code(200);
            } else {
                $data_obj->response = "400";
                $data_obj->msg = "Somethings error in php!";
                http_response_code(400);
            }
        } else {
            //reply comment
            $sql = "INSERT INTO comments (`url`, `user_id`, `reply_id`, `time`, `comment`) VALUES ('$url', '$user_id', '$reply_id', '$time', '$comment')";
            if ($conn->query($sql) === TRUE) {
                $data_obj->response = "200";
                $data_obj->msg = "Comment successfully added!";
                http_response_code(200);
            } else {
                $data_obj->response = "400";
                $data_obj->msg = "Somethings error in php!";
                http_response_code(400);
            }
        }
    }

    echo json_encode($data_obj);
?>