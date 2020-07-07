<?php
    include( "../header-type.php" );
    include( "../db-connection.php" );


    $datas = array();

    //select manga
    $sql = "SELECT * FROM categories GROUP BY url ORDER BY name ASC";
    $result_categories = $conn->query($sql);
    while($row_categories = $result_categories->fetch_assoc()) {
        $category_obj = new stdClass;
        $category_obj->name = $row_categories['name'];
        $category_obj->url = $row_categories['url'];

        $sql = "SELECT * FROM categories WHERE url = '$category_obj->url'";
        $result_total = $conn->query($sql);
        $total = $result_total->num_rows;

        $category_obj->total = $total;
        
        array_push($datas, $category_obj);
    }

    

    echo json_encode($datas);
?>