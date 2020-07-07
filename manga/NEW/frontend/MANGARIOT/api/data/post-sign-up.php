<?php
    include( "../header-type.php" );
    include( "../db-connection.php" );

    $data_obj = new stdClass;

    $username = stripslashes($_POST["username"]);
    $email = stripslashes($_POST["email"]);
    $password = stripslashes($_POST["password"]);
    $validateCaptcha = $_POST["validateCaptcha"];


    if($validateCaptcha == 'false'){

        $sql = "SELECT * FROM users WHERE username = '$username'";
        $result_username = $conn->query($sql);
        $total_username = $result_username->num_rows; 

        $sql = "SELECT * FROM users WHERE email = '$email'";
        $result_user = $conn->query($sql);
        $total_user = $result_user->num_rows; 

        if($total_username >= 1){
            $data_obj->response = "400";
            $data_obj->msg = "Your display name is already taken.";
            http_response_code(400);
        } elseif($total_user >= 1){
            $data_obj->response = "400";
            $data_obj->msg = "Your email address is already taken!";
            http_response_code(400);
        } else {

            $uid = md5(uniqid($email, true));

            $sql = "INSERT INTO `users` (`email`, `password`, `user_id`, `username`) VALUES ('$email', '$password','$uid','$username')";
            if ($conn->query($sql) === TRUE) {
                http_response_code(200);
                $data_obj->response = "200";
                $data_obj->msg = "Your account successfully registered!";
                $data_obj->uid = $uid;
            } else {
                http_response_code(400);
                $data_obj->response = "200";
                $data_obj->msg = "Error: " . $sql . "<br>" . $conn->error;;
            }
        }

    }
    else {

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
            //This user is verified by recaptcha

            $sql = "SELECT * FROM users WHERE username = '$username'";
            $result_username = $conn->query($sql);
            $total_username = $result_username->num_rows; 

            $sql = "SELECT * FROM users WHERE email = '$email'";
            $result_user = $conn->query($sql);
            $total_user = $result_user->num_rows; 

            if($total_username >= 1){
                $data_obj->response = "400";
                $data_obj->msg = "Your display name is already taken.";
                http_response_code(400);
            }
            elseif($total_user >= 1){
                $data_obj->response = "400";
                $data_obj->msg = "Your email address is already taken.";
                http_response_code(400);
            } else {

                $uid = md5(uniqid($email, true));

                $sql = "INSERT INTO `users` (`email`, `password`, `user_id`, `username`) VALUES ('$email', '$password','$uid','$username')";
                if ($conn->query($sql) === TRUE) {
                    http_response_code(200);
                    $data_obj->response = "200";
                    $data_obj->msg = "Your account successfully registered!";
                    $data_obj->uid = $uid;
                } else {
                    http_response_code(400);
                    $data_obj->response = "200";
                    $data_obj->msg = "Error: " . $sql . "<br>" . $conn->error;;
                }
            }
        }
    }

    echo json_encode($data_obj);

?>