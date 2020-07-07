<?php
    include( "../db-connection.php" );
?>
<p style='margin:0;color:green'><strong>NEW MANGA</strong></p>
<p style='margin:0;color:#527df7'><strong>NEW CHAPTER</strong></p>
<p style='margin:0;color:red'><strong>ERROR</strong></p>
<p style='margin:0;color:#909090'><strong>UPDATE</strong></p>
<p style='margin:0;color:#d8d9da'><strong>NO UPDATE</strong></p>
<br>
<?php
    $error_total = 0;

    if(!isset($_FILES['importfile'])){
        echo "NO data found!";
        exit;
    }
    else {
        
        $fileError = $_FILES["importfile"]["error"]; // where FILE_NAME is the name attribute of the file input in your form
        switch($fileError) {
            case UPLOAD_ERR_INI_SIZE:
                // Exceeds max size in php.ini
                echo "Exceeds max size in php.ini";
                break;
            case UPLOAD_ERR_PARTIAL:
                // Exceeds max size in html form
                echo "Exceeds max size in html form";
                break;
            case UPLOAD_ERR_NO_FILE:
                // No file was uploaded
                echo "No file was uploaded";
                break;
            case UPLOAD_ERR_NO_TMP_DIR:
                // No /tmp dir to write to
                echo "No /tmp dir to write to";
                break;
            case UPLOAD_ERR_CANT_WRITE:
                // Error writing to disk
                echo "Error writing to disk";
                break;
            default:
                // No error was faced! Phew!
                break;
        }

        $data = file_get_contents($_FILES['importfile']['tmp_name']);
        $mangas = json_decode($data);
        $manga_index = 0;

        foreach($mangas as $manga){
            $manga_index++;

            //check manga
            $sql = "SELECT * FROM manga WHERE url = '$manga->url'";
            $result_manga = $conn->query($sql);
            $total_manga = $result_manga->num_rows;

            $manga_id = $manga->id;
            $name = str_replace("'", "\'", $manga->name);
            $alternative_name = str_replace("'", "\'", $manga->alternative_name);
            $url = $manga->url;
            $status = $manga->status;
            $type = $manga->type;
            $total_views = $manga->total_views;
            $date_crawled = $manga->date_crawled;
            $photo = $manga->photo;
            $date_last_crawled = $manga->date_last_crawled;
            $description = addslashes(stripslashes($manga->description));
            
            if($total_manga <= 0){
                $sql = "INSERT INTO `manga` (`id`, `name`, `alternative_name`, `url`, `photo`, `status`, `type`, `total_views`, `date_crawled`, `date_last_crawled`, `description`) VALUES ('$manga_id', '$name', '$alternative_name', '$url', '$photo', '$status', '$type', '$total_views', '$date_crawled', '$date_last_crawled','$description')";
                if ($conn->query($sql) === TRUE) {
                    echo "<p style='margin:0;color:green'>$manga_index: $name</p>";
                } else {
                    echo "<p style='margin:0;color:red'>$manga_index Error: " . $sql . "<br>" . $conn->error."</p>";
                    $error_total++;
                }
            }
            else {
                $sql ="UPDATE manga SET status='$status', total_views='$total_views', date_last_crawled='$date_last_crawled', description='$description' WHERE url = '$manga->url'";
                if ($conn->query($sql) === TRUE) {
                    echo "<p style='margin:0;color:#909090'>$manga_index: $name</p>";
                } else {
                    echo "<p style='margin:0;color:red'>$manga_index: Error: " . $sql . "<br>" . $conn->error."</p>";
                    $error_total++;
                }
            }




            //check categories
            $categories = $manga->categories;
            echo "<p style='margin:0;font-size: 11px;'>(";
            foreach($categories as $category){
                $category_name = $category->name;
                $category_url = $category->url;
                $sql = "SELECT * FROM categories WHERE manga_id = '$manga_id' AND url = '$category_url'";
                $result_category = $conn->query($sql);
                $total_category= $result_category->num_rows;
                if($total_category <= 0){
                    $sql = "INSERT INTO `categories` (`manga_id`, `name`, `url`) VALUES ('$manga_id', '$category_name', '$category_url')";
                    if ($conn->query($sql) === TRUE) {
                        echo "<span style='margin:0;color:green'>$category_name,</span>";
                    } else {
                        echo "<span style='margin:0;color:red'>Error: " . $sql . "<br>" . $conn->error."</span>";
                        $error_total++;
                    }
                }
                else {
                    echo "<span style='margin:0;color:#d8d9da'>$category_name</span>";
                }
            }
            echo ")</p>";



            //check authors
            $authors =  $manga->authors;
            echo "<p style='margin:0;font-size: 11px;'>(";
            foreach($authors as $author){
                $author_name = $author->name;
                $author_url = $author->url;
                $sql = "SELECT * FROM authors WHERE manga_id = '$manga_id' AND url = '$author_url'";
                $result_author = $conn->query($sql);
                $total_author = $result_author->num_rows;
                if($total_author <= 0){
                    $sql = "INSERT INTO `authors` (`manga_id`, `name`, `url`) VALUES ('$manga_id', '$author_name', '$author_url')";
                    if ($conn->query($sql) === TRUE) {
                        echo "<span style='margin:0;color:green'>$author_name,</span>";
                    } else {
                        echo "<span style='margin:0;color:red'>Error: " . $sql . "<br>" . $conn->error."</span>";
                        $error_total++;
                    }
                }
                else {
                    echo "<span style='margin:0;color:#d8d9da'>$author_name</span>";
                }
            }
            echo ")</p>";





            //check chapters
            $chapters = $manga->chapters;
            foreach($chapters as $chapter){
                $sql = "SELECT * FROM chapters WHERE id = '$chapter->id'";
                $result_chapter = $conn->query($sql);
                $total_chapter = $result_chapter->num_rows;
                
                if($total_chapter <= 0){
                    $chapter_id = $chapter->id;
                    $date = $chapter->date;
                    $date_crawled = $chapter->date_crawled;
                    $name = str_replace("'", "\'", $chapter->name);
                    $url = $chapter->url;

                    $pieces = explode("_", $chapter_id);
                    $order_id = $pieces[1];

                    $sql = "INSERT INTO `chapters` (`id`, `order_id`, `manga_id`, `date`, `date_crawled`, `name`, `url`) VALUES ('$chapter_id', '$order_id', '$manga_id', '$date', '$date_crawled', '$name', '$url')";
                    if ($conn->query($sql) === TRUE) {
                        echo "<p style='margin:0 0 0 20px;color:#527df7'>$name</p>";
                    } else {
                        echo "<p style='margin:0 0 0 20px;color:red'>Error: " . $sql . "<br>" . $conn->error."</p>";
                        $error_total++;
                    }
                }
                else {
                    $name = str_replace("'", "\'", $chapter->name);
                    echo "<p style='margin:0 0 0 20px;color:#d8d9da'>$name</p>";
                }


            }
        }



        echo '<script language="javascript">';
        echo 'alert("ERROR TOTAL: '.$error_total.'")';
        echo '</script>';


    }

?>