<?php
    include( "../../header-type.php" );
    include( "../../db-connection.php" );

    $data_obj = new stdClass;
    $datas = array();

    $url = stripslashes($_GET["url"]);

    $sql = "SELECT * FROM comments WHERE `url` = '$url' AND `reply_id` = '' ORDER BY time DESC";
    $result_comment = $conn->query($sql);
    while($row_comment = $result_comment->fetch_assoc()) {

        $comments = new stdClass;
        $user = new stdClass;
        $replies = array();

        //user info
        $user_id = $row_comment['user_id'];

        $sql = "SELECT * FROM users WHERE `user_id` = '$user_id'";
        $result_user = $conn->query($sql);
        while($row_user = $result_user->fetch_assoc()) {
            $user->uid = $row_user['user_id'];
            $user->username = $row_user['username'];
            $user->avatar = $row_user['avatar'];
        }

        //comments info
        $comments->id = $row_comment['id'];
        $comments->user = $user;
        $comments->time = $row_comment['time'];
        $comments->comment = $row_comment['comment'];
        $comments->reply_id = $row_comment['reply_id'];

        //replies info
        $sql = "SELECT * FROM comments WHERE `url` = '$url' AND `reply_id` = '".$row_comment['id']."' ORDER BY time ASC";
        $result_replies = $conn->query($sql);
        while($row_replies = $result_replies->fetch_assoc()) {
            $reply = new stdClass;
            $user_reply = new stdClass;

            //reply user
            $sql = "SELECT * FROM users WHERE `user_id` = '".$row_replies['user_id']."'";
            $result_user = $conn->query($sql);
            while($row_user = $result_user->fetch_assoc()) {
                $user_reply->uid = $row_user['user_id'];
                $user_reply->username = $row_user['username'];
                $user_reply->avatar = $row_user['avatar'];
            }

            //reply info
            $reply->id = $row_replies['id'];
            $reply->user = $user_reply;
            $reply->time = $row_replies['time'];
            $reply->comment = $row_replies['comment'];
            $reply->reply_id = $row_replies['reply_id'];

            array_push($replies, $reply);
        }

        $comments->replies = $replies;

        array_push($datas, $comments);
    }



    $data_obj->response = "200";
    $data_obj->data = $datas;
    http_response_code(200);

    echo json_encode($data_obj);
?>