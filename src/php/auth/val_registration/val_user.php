<?php

require_once '../../config.php';



if (isset($_POST['authFormRegisterUsername'])) {
    $username= $_POST['authFormRegisterUsername'];

    if (strlen($username) === 0){
        $result = ["status" => "error", "description" => "USER_BLANK"];
        http_response_code(500);
        exit(json_encode($result));
    }

    $result = pg_query($conn, "SELECT * FROM users WHERE username = '{$username}'");

    if (pg_num_rows($result) != 0) {
        $result = ["status" => "error", "description" => "USER_TAKEN"];
        http_response_code(500);
        exit(json_encode($result));
    } else {
        $result = ["status" => "success", "description" => "USER_SUCCESS"];
        http_response_code(200);
        echo json_encode($result);
    }
}

?>