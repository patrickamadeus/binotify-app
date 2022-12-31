<?php

    require_once '../config.php';

    // Check if user is logged in
    $user_id = isLoggedin($conn);

    // If user is not logged in, unauthorize
    if($user_id == -1){
        $result = ["status" => "invalid_login", "description" => "Invalid login information!"];
        http_response_code(401);
        exit(json_encode($result));   
    }

    if ($_SESSION['user_id'] == 'guess'){
        unset($_SESSION['user_id']);
        $result = ["status" => "success", "description" => "guess logout, keep session id"];
        http_response_code(200);
        exit(json_encode($result)); 
    }

    // if user or admin
    // remove all session variables
    session_unset();

    $result = ["status" => "success", "description" => "user/admin logout"];
    http_response_code(200);
    exit(json_encode($result)); 
?>
