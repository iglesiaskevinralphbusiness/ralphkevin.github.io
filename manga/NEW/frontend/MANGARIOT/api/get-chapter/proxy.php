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

    if(isset($_GET['path'])){
        $path = 'https://www.readmng.com'.$_GET['path'].'/all-pages';
        
        crawl_page($path);
    }

?>