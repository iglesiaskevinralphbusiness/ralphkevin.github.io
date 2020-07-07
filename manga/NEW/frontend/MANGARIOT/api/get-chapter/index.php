<?php
    function crawl_page($url){
        $list = array();
        $dom = new DOMDocument('1.0');
        @$dom->loadHTMLFile($url);

        echo $dom->saveHTML();

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

    if(isset($_POST['path'])){
        $path = 'http://codenative.epizy.com/get-chapter/?path='.$_POST['path'];
        echo $path ;
        
        crawl_page($path);
    }

?>