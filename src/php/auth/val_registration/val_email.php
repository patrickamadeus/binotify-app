<?php

require_once '../../config.php';

if (isset($_POST['authFormRegisterEmail'])) {
    $email = $_POST['authFormRegisterEmail'];

    if (strlen($email) === 0){
        $result = ["status" => "error", "description" => "EMAIL_BLANK"];
        http_response_code(500);
        exit(json_encode($result));
    }

    // TODO : RegEx for email format validation
    $result = pg_query($conn, "SELECT * FROM users WHERE email = '{$email}'");

    if (pg_num_rows($result) != 0) {
        $result = ["status" => "error", "description" => "EMAIL_TAKEN"];
        http_response_code(500);
        exit(json_encode($result));
    } 
    
    $extract_email_pattern = '/\\S+@\\S+\\.\\S+/';
    $regex_result = preg_match($extract_email_pattern, $email);

    if ($regex_result != 1){
        $result = ["status" => "error", "description" => "EMAIL_UNSUPORTED_FORMAT"];
        http_response_code(200);
        exit(json_encode($result));
    }

    $result = ["status" => "success", "description" => "EMAIL_SUCCESS"];
    http_response_code(200);
    echo json_encode($result);
    
} else{
    $result = ["status" => "error", "description" => "EMAIL_BLANK"];
    http_response_code(500);
    exit(json_encode($result));
}

?>