<?php
    include( "../header-type.php" );
    include( "../db-connection.php" );

    $datas = array();


    $list_obj = new stdClass;
    $list_obj->title = "#";
    $list_obj->list = array();

    $sql = "SELECT * FROM manga WHERE name NOT LIKE 'A%' AND name NOT LIKE 'B%' AND name NOT LIKE 'C%' AND name NOT LIKE 'D%' AND name NOT LIKE 'E%' AND name NOT LIKE 'F%' AND name NOT LIKE 'G%' AND name NOT LIKE 'H%' AND name NOT LIKE 'I%' AND name NOT LIKE 'J%' AND name NOT LIKE 'K%' AND name NOT LIKE 'L%' AND name NOT LIKE 'M%' AND name NOT LIKE 'N%' AND name NOT LIKE 'O%' AND name NOT LIKE 'P%' AND name NOT LIKE 'Q%' AND name NOT LIKE 'R%' AND name NOT LIKE 'S%' AND name NOT LIKE 'T%' AND name NOT LIKE 'U%' AND name NOT LIKE 'V%' AND name NOT LIKE 'W%' AND name NOT LIKE 'X%' AND name NOT LIKE 'Y%' AND name NOT LIKE 'Z%' ORDER BY name ASC";
    $result_manga = $conn->query($sql);
    while($row_manga = $result_manga->fetch_assoc()) {
        $manga_obj = new stdClass;
        $manga_obj->url = $row_manga["url"];
        $manga_obj->name = $row_manga["name"];

        array_push($list_obj->list, $manga_obj);
    }
    array_push($datas, $list_obj);



    //all letters

    $orders = array('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');

    foreach ($orders as $order){
        //select manga
        
        $list_obj = new stdClass;
        $list_obj->title = $order;
        $list_obj->list = array();

        $sql = "SELECT * FROM manga WHERE name LIKE '$order%'  ORDER BY name ASC";
        $result_manga = $conn->query($sql);
        while($row_manga = $result_manga->fetch_assoc()) {
            $manga_obj = new stdClass;
            $manga_obj->url = $row_manga["url"];
            $manga_obj->name = $row_manga["name"];
    
            

            array_push($list_obj->list, $manga_obj);
        }


        array_push($datas, $list_obj);

    }


    


    echo json_encode($datas);
?>