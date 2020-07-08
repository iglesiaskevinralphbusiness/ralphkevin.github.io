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
                echo "<img src='$src'>";
            }
        }
        
    }

    if(isset($_POST['path'])){
        $path = 'http://codenative.epizy.com/get-chapter/?path='.$_POST['path'];
        crawl_page($path);
    }

    $path = 'https://www.funmanga.com/slime-life/100/all-pages';
    crawl_page($path);

?>