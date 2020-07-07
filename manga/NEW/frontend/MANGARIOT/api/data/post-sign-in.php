<?php
    include( "../header-type.php" );
    include( "../db-connection.php" );

    $data_obj = new stdClass;

    $email = stripslashes($_POST["email"]);
    $password = stripslashes($_POST["password"]);
    $validateCaptcha = $_POST["validateCaptcha"];

    if($validateCaptcha == 'false'){
        $sql = "SELECT * FROM users WHERE `email` = '$email' AND `password` = '$password'";
        $result_user = $conn->query($sql);
        $total_user = $result_user->num_rows;
        if($total_user >= 1){
            $uid = '';
            while($row_user = $result_user->fetch_assoc()) {
                $uid = $row_user['user_id'];
            }
            http_response_code(200);
            $data_obj->response = "200";
            $data_obj->msg = "Success login!";
            $data_obj->uid = $uid;
        } else {
            $data_obj->response = "400";
            $data_obj->msg = "Incorrect Email or Password!";
            http_response_code(400);
        }
    } else {
        $secret = "6LdPGvUUAAAAAEXIvMqFJHq_tD5oc_8paqtHMJss";
        $response = $_POST["captcha"];
    
        $verify = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret={$secret}&response={$response}");
        $captcha_success = json_decode($verify);
        if ($captcha_success->success==false) {
            //This user was not verified by recaptcha.
            $data_obj->response = "400";
            $data_obj->msg = "Captca validation failed! Please try again.";
            http_response_code(400);
        }
        else if ($captcha_success->success==true) {
            $sql = "SELECT * FROM users WHERE `email` = '$email' AND `password` = '$password'";
            $result_user = $conn->query($sql);
            $total_user = $result_user->num_rows;
            if($total_user >= 1){
                $uid = '';
                while($row_user = $result_user->fetch_assoc()) {
                    $uid = $row_user['user_id'];
                }
                http_response_code(200);
                $data_obj->response = "200";
                $data_obj->msg = "Success login!";
                $data_obj->uid = $uid;
            } else {
                $data_obj->response = "400";
                $data_obj->msg = "Incorrect Email or Password!";
                http_response_code(400);
            }
        }
    }
    
    echo json_encode($data_obj);

?>