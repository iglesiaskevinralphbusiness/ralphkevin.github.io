<?php
    include( "../header-type.php" );
    include( "../db-connection.php" );

    $datas = array();

    //select manga
    $sql = "SELECT * FROM manga ORDER BY convert(replace(`total_views`, ',', ''), decimal) DESC LIMIT 5";

    $result_manga = $conn->query($sql);
    while($row_manga = $result_manga->fetch_assoc()) {
        $manga_obj = new stdClass;
        $manga_obj->id = $row_manga["id"];
        $manga_obj->name = $row_manga["name"];
        $manga_obj->url = $row_manga["url"];
        $manga_obj->photo = $row_manga["photo"];

        //select all chapters
        $chapters = array();
        $sql = "SELECT * FROM chapters WHERE manga_id = '$manga_obj->id' ORDER BY order_id DESC  LIMIT 1";
        $result_chapters = $conn->query($sql);
        while($row_chapters = $result_chapters->fetch_assoc()) {
            $chapters_obj = new stdClass;
            $chapters_obj->id = $row_chapters['id'];
            $chapters_obj->date = $row_chapters['date'];
            $chapters_obj->date_crawled = $row_chapters['date_crawled'];
            $chapters_obj->name = $row_chapters['name'];
            $chapters_obj->url = $row_chapters['url'];
            array_push($chapters, $chapters_obj);
        }
        $manga_obj->chapters = $chapters;

        array_push($datas, $manga_obj);
    }

    http_response_code(200);
    echo json_encode($datas);
?>