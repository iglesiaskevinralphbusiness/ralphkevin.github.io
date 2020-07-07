<?php
    include( "../../header-type.php" );
    include( "../../db-connection.php" );

    $data_obj = new stdClass;

    $user_id = stripslashes($_POST["uid"]);
    $sql = "SELECT * FROM users WHERE `user_id` = '$user_id'";
    $result_user = $conn->query($sql);
    $total_user = $result_user->num_rows;
    
    if($total_user <= 0){
        $data_obj->response = "400";
        $data_obj->msg = "User profile not found.";
        http_response_code(400);
    } else {
        $user = new stdClass;

        //username
        while($row_user = $result_user->fetch_assoc()) {
            $user->username = $row_user['username'];
        }

        //notifications
        $user->notifications = 0;

        //booksmarks
        $sql = "SELECT * FROM bookmarks WHERE user_id = '$user_id'";
        $result_bookmarks = $conn->query($sql);
        $total_bookmarks = $result_bookmarks->num_rows;
        $user->bookmarks = $total_bookmarks;

        $data_obj->response = "200";
        $data_obj->data = $user;
        http_response_code(200);
    }

    echo json_encode($data_obj);
?>