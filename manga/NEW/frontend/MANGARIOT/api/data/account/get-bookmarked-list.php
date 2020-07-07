<?php
    include( "../../header-type.php" );
    include( "../../db-connection.php" );

    $data_obj = new stdClass;
    $datas = array();

    $user_id = stripslashes($_GET["uid"]);
    
    $sql = "SELECT * FROM `bookmarks` WHERE `user_id` = '$user_id' ORDER BY time DESC";
    $result_bookmark = $conn->query($sql);
    while($row_bookmark = $result_bookmark->fetch_assoc()) {
        $bookmark = new stdClass;
        $user = new stdClass;
        $manga = new stdClass;
        $categories = array();

        $bookmark->id = $row_bookmark['id'];
        $bookmark->url = $row_bookmark['url'];
        $bookmark->time = $row_bookmark['time'];

        //user info
        $sql = "SELECT * FROM users WHERE `user_id` = '".$row_bookmark['user_id']."'";
        $result_user = $conn->query($sql);
        while($row_user = $result_user->fetch_assoc()) {
            $user->uid = $row_user['user_id'];
            $user->username = $row_user['username'];
            $user->avatar = $row_user['avatar'];
        }
        $bookmark->user = $user;

        //manga info
        $sql = "SELECT * FROM manga WHERE `url` = '".$row_bookmark['url']."'";
        $result_manga = $conn->query($sql);
        while($row_manga = $result_manga->fetch_assoc()) {
            $manga->manga_id = $row_manga['id'];
            $manga->status = $row_manga['status'];
            $manga->name = $row_manga['name'];
        }
        $bookmark->manga = $manga;

        //categories
        $sql = "SELECT * FROM categories WHERE `manga_id` = '".$manga->manga_id."'";
        $result_cat = $conn->query($sql);
        while($row_cat = $result_cat->fetch_assoc()) {
            array_push($categories, $row_cat['name']);
        }
        $bookmark->categories = $categories;


        array_push($datas, $bookmark);
    }
        
    
    $data_obj->response = "200";
    $data_obj->data = $datas;
    http_response_code(200);

    echo json_encode($data_obj);
?>