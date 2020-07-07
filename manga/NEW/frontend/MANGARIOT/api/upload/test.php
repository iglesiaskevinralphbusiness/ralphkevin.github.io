<?php
    include( "../db-connection.php" );

    
    if(isset($_FILES['importfile'])){
        $error_total = 0;

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

            $url = $manga->url;
            $description = addslashes(stripslashes($manga->description));

            $sql ="UPDATE manga SET description='$description' WHERE url = '$url'";

            if ($conn->query($sql) === TRUE) {
                echo "<p style='margin:0;color:#909090'>DONE : $url</p>";
            } else {
                echo "<p style='margin:0;color:red'>Error: $url <br>" . $sql . "<br>" . $conn->error."</p>";
                $error_total++;
            }

        }

        echo '<script language="javascript">';
        echo 'alert("ERROR TOTAL: '.$error_total.'")';
        echo '</script>';

    }
?>

<!doctype html>
<html lang="en">
<head>
    <meta charset=utf-8>
    <title>UPLOAD DESCRIPTION</title>
</head>
<body>
    <form action="test.php" method="POST" enctype="multipart/form-data">
        <input type="file" name="importfile" id="frm_importfile">
        <button type="submit">SUBMIT</button>
    </form>
</body>