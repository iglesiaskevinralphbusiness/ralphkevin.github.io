<?php
    include( "../db-connection.php" );

    $datas = array(
        "https://www.readmng.com/latest-releases",
        "https://www.readmng.com/latest-releases/2",
    );

    foreach($datas as $data) {
        $content = crawl_page($data);
        //echo json_encode($content);
        

    }





    

    function crawl_page($url){
        $list = array();
        $dom = new DOMDocument('1.0');
        @$dom->loadHTMLFile($url);

        $mangaLinks = array();

        $list = $dom->getElementsByTagName('a');
        foreach ($list as $element) {
            $href = $element->getAttribute('href');
            $class = $element->getAttribute('class');

            if($class == "manga_info"){
                array_push($mangaLinks, $href);
            }

        }

        return $mangaLinks;
    }

    function crawl_chapters($url){


    }
?>