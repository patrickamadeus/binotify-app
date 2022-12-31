<?php

require_once '../config.php';

if (isset($_POST['authFormRegisterUsername']) and isset($_POST['authFormRegisterEmail']) and isset($_POST['authFormRegisterPassword']) and isset($_POST['authFormRegisterPasswordConfirm'])) {

    $email = $_POST['authFormRegisterEmail'];
    $username = $_POST['authFormRegisterUsername'];

    $password = password_hash($_POST['authFormRegisterPassword'] , PASSWORD_DEFAULT);

    $result = pg_query($conn, "INSERT INTO users (username, email, password, isadmin) VALUES ('{$username}', '{$email}', '{$password}', 'false')");

    $result = pg_query($conn, "SELECT * FROM users WHERE username = '{$username}' OR email = '{$email}'");

    if(!$result) {
        $result = ["status" => "error", "description" => "DB Error Occured. Please contact developer."];
        exit(json_encode($result));
    }

    // TODO: Improve Logic to yield error information
    if (pg_num_rows($result) > 0) {
        $result = ["status" => "error", "description" => "Register Failed! Username or Email  already taken"];
        exit(json_encode($result));
    } else {
        // check confirmed password
        if ($password != $password_confirm) {
            $result = ["status" => "error", "description" => "Register Failed! Passwords do not match"];
            exit(json_encode($result));
        } 



        // insert new user info to database
        $result = pg_query($conn, "INSERT INTO users (username, email, password, isadmin) VALUES ('{$username}', '{$email}', '{$password}', '{$is_admin}')");
        $result = ["status" => "success", "description" => "Register Successful"];
        http_response_code(200);
        echo json_encode($result);
    }
}else {
    // Username is not set
    $result = ["status" => "error", "description" => "This method is not supported."];
    http_response_code(404);
    exit(json_encode($result));
}
?>