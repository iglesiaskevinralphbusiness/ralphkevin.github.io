<script type="text/javascript">
<?php
    include( "../db-connection.php" );


    if(isset($_POST['btnsubmit'])){
        $name = $_POST['firstname'];
        $email = $_POST['email'];
        $subject = $_POST['subject'];
        $message = $_POST['message'];

        $sql = "INSERT INTO `contactform` (`name`, `email`, `subject`, `message`) VALUES ('$name', '$email', '$subject', '$message')";
        if ($conn->query($sql) === TRUE) {
            echo "sessionStorage.setItem('contact-us','success');
                window.location = '/contact-us';";
        } else {
            echo "sessionStorage.setItem('contact-us','failed');
                window.location = '/contact-us';";
        }
    }
    
?>
</script>