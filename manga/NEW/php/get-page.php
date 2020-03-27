<?php
    function crawl_page($url){
        $list = array();
        $dom = new DOMDocument('1.0');
        @$dom->loadHTMLFile($url);
    
        $images = $dom->getElementsByTagName('img');
        foreach ($images as $element) {
            $src = $element->getAttribute('src');
            $class = $element->getAttribute('class');
            if($class == "img-responsive"){
                array_push($list,$src);
            }
        }
        echo json_encode($list);
    }
    
    crawl_page("https://www.readmng.com/tales-of-demons-and-gods/256.5/all-pages");
?>