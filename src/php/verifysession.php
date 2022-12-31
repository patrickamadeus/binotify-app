<?php


require_once 'config.php';

// Check if user is logged in
$user_id = isLoggedin($conn);

// If user is not logged in, unauthorize
if($user_id == -1){
    $result = ["status" => "invalid_login", "description" => "Invalid login information!"];
    http_response_code(401);
    exit(json_encode($result));
}
else{
    $expired = strtotime($_SESSION['expired_date']);
    $now = time();

    if($now > $expired) {
        $result = ["status" => "session_expired", "description" => "Session already expired!"];
        session_unset();
        http_response_code(401);
        exit(json_encode($result));
    }

    if ($_SESSION['user_id'] == 'guess'){
        $playback_remaining = $_SESSION['playback_remaining'];
        $result = ["status" => "success", "isGuess" => 1, "playback_remaining" => $playback_remaining,"description" => "login as guest"];
        http_response_code(200);
        exit(json_encode($result));
    }

    $result = ["status" => "success", "description" => "login valid.", "username" => $_SESSION['username']];
    http_response_code(200);
    echo json_encode($result);     

} 