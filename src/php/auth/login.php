<?php

require_once '../config.php';

if (isset($_POST['authFormLoginUsername'])) {

    $username = $_POST['authFormLoginUsername'];
    $password = $_POST['authFormLoginPassword'];

    $result = pg_query($conn, "SELECT * FROM users WHERE username = '{$username}'");

    if(!$result) {
        $result = ["status" => "error", "description" => "DB Error Occured. Please contact developer."];
        http_response_code(500);
        exit(json_encode($result));
    }

    if (pg_num_rows($result) != 1) {
        $result = ["status" => "error", "description" => "Login Failed! Wrong Username or Password."];
        http_response_code(401);
        exit(json_encode($result));
    } 

    // verify password hashed
    $row = pg_fetch_assoc($result);
    if (!password_verify($password, $row['password'])) {
        $result = ["status" => "error", "description" => "Login Failed! Wrong Username or Password."];
        exit(json_encode($result));
    }
    
    // Get user id
    $user_id = $row['user_id'];
    $username = $row['username'];

    // Set to session to expire in 1 hour
    $expire = 3600 * 24;
    $time = time() + $expire;

    // Generate unique token based on time
    $date = new DateTime();
    $date->setTimestamp($time);
    $expired_date = $date->format('Y-m-d H:i:s');

    $_SESSION['user_id'] = $user_id;
    $_SESSION['expired_date'] = $expired_date;
    $_SESSION['username'] = $username;

    $result = ["status" => "success", "description" => "Login Successful"];
    http_response_code(200);
    exit(json_encode($result)); 

} else {
    // Username is not set
    $result = ["status" => "error", "description" => "This method is not supported."];
    http_response_code(404);
    exit(json_encode($result));
}
?>