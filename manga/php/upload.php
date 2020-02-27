<?php
    if(!isset($_SERVER['PHP_AUTH_USER'])){
        header("WWW-Authenticate: Basic realm=\"Private Area\"");
        header("HTTP/1.0 401 Unauthorized");
        print "Sorry, you need proper credentials";
    }
    else {
        if(($_SERVER['PHP_AUTH_USER'] == 'mangabay' && ($_SERVER['PHP_AUTH_PW'] == 'mangabay'))){
            //
        }
        else {
            header("WWW-Authenticate: Basic realm=\"Private Area\"");
            header("HTTP/1.0 401 Unauthorized");
            print "Sorry, you need proper credentials";
        }
    }
?>
<!DOCTYPE html>
<html>
<head>
    <title>File Upload</title>
    <style>
        form {
            width: 400px;
            padding: 20px;
            margin: auto;
            border: 1px solid #e8e8e8;
        }
        .frmBlock {
            padding: 10px 10px;
            border: 1px solid #ececec;
            margin-bottom: 10px;
        }
        .frmBlock span {
            display: inline-block;
            width: 100px;
            text-align: 
        }
        .frmBlock input {
            padding: 7px;
            background-color: #f5f5f5;
        }
        .frmBtn {
            text-align: right;
        }
        .frmButton {
            margin: auto;
            margin-top: 5px;
            background-color: #4CAF50;
            border: none;
            color: white;
            padding: 10px 32px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            cursor: pointer;
        }
        .message {
            width: 500px;
            margin: auto;
        }
        .message .success {
            padding: 15px;
            margin-bottom: 20px;
            color: #3c763d;
            background-color: #dff0d8;
            border-color: #d6e9c6;
        }
        .message .failed {
            padding: 15px;
            margin-bottom: 20px;
            color: #a94442;
            background-color: #f2dede;
            border-color: #ebccd1;
        }
    </style>
</head>
<body>
<?php
    if (isset($_POST['uploadBtn']) && $_POST['uploadBtn'] == 'Upload') {
        $allowedfileExtensions = array('json');
        $message = '';

        // get details of the uploaded file
        $list_fileTmpPath = $_FILES['uploadedFileList']['tmp_name'];
        $list_fileName = $_FILES['uploadedFileList']['name'];
        $list_fileSize = $_FILES['uploadedFileList']['size'];
        $list_fileType = $_FILES['uploadedFileList']['type'];
        $list_fileNameCmps = explode(".", $list_fileName);
        $list_fileExtension = strtolower(end($list_fileNameCmps));
        $list_newFileName = 'list.json';

        // get details of the uploaded file
        $chap_fileTmpPath = $_FILES['uploadedFileChapters']['tmp_name'];
        $chap_fileName = $_FILES['uploadedFileChapters']['name'];
        $chap_fileSize = $_FILES['uploadedFileChapters']['size'];
        $chap_fileType = $_FILES['uploadedFileChapters']['type'];
        $chap_fileNameCmps = explode(".", $chap_fileName);
        $chap_fileExtension = strtolower(end($chap_fileNameCmps));
        $chap_newFileName = 'chapters.json';

        // get details of the uploaded file
        $top_fileTmpPath = $_FILES['uploadedFileTop']['tmp_name'];
        $top_fileName = $_FILES['uploadedFileTop']['name'];
        $top_fileSize = $_FILES['uploadedFileTop']['size'];
        $top_fileType = $_FILES['uploadedFileTop']['type'];
        $top_fileNameCmps = explode(".", $top_fileName);
        $top_fileExtension = strtolower(end($top_fileNameCmps));
        $top_newFileName = 'top.json';

        
        if(!in_array($list_fileExtension, $allowedfileExtensions)){
            $message = '<div class="failed">List: File extension not supported!</div>';
        }
        elseif(!in_array($chap_fileExtension, $allowedfileExtensions)){
            $message = '<div class="failed">Chapters: File extension not supported!</div>';
        }
        else {
            $uploadFileDir = './json/';
            $list_dest_path = $uploadFileDir . $list_newFileName;
            $chap_dest_path = $uploadFileDir . $chap_newFileName;
            $top_dest_path = $uploadFileDir . $top_newFileName;
            
            if(move_uploaded_file($list_fileTmpPath, $list_dest_path)){
                $message = $message.'<div class="success">List:  Successfully uploaded :)</div>';
            }
            else {
                $message = $message.'<div class="failed">List: There was some error moving the file to upload directory. Please make sure the upload directory is writable by web server.</div>';
            }

            if(move_uploaded_file($chap_fileTmpPath, $chap_dest_path)){
                $message = $message.'<div class="success">Chapters:  Successfully uploaded :)</div>';
            }
            else {
                $message = $message.'<div class="failed">Chapters: There was some error moving the file to upload directory. Please make sure the upload directory is writable by web server.</div>';
            }

            if(move_uploaded_file($top_fileTmpPath, $top_dest_path)){
                $message = $message.'<div class="success">Top:  Successfully uploaded :)</div>';
            }
            else {
                $message = $message.'<div class="failed">Top: There was some error moving the file to upload directory. Please make sure the upload directory is writable by web server.</div>';
            }
        }


        

        if($message != ''){
            echo "<div class='message'>".$message."</div>";
        }
        
    }
?>

    <form method="POST" action="upload.php" enctype="multipart/form-data">
        <div class="frmBlock">
            <span>List:</span>
            <input type="file" name="uploadedFileList" required="required" />
        </div>
        <div class="frmBlock">
            <span>Chapters:</span>
            <input type="file" name="uploadedFileChapters" required="required" />
        </div>
        <div class="frmBlock">
            <span>Top:</span>
            <input type="file" name="uploadedFileTop" required="required" />
        </div>
        <div class="frmBtn">
            <input class="frmButton" type="submit" name="uploadBtn" value="Upload" />
        </div>
    </form>
</body>
</html>