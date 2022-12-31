<?php

    require_once '../config.php';

    if (!(isset($_SESSION))){
        http_response_code(401);
        $result = ["status" => "guess_login_failed", "description" => "session already started"];
        exit(json_encode($result)); 
    }

    $user_id = 'guess';

    // Set to session to expire in 1 hour
    $expire = 3600;
    $time = time() + $expire;

    // Generate unique token based on time
    $date = new DateTime();
    $date->setTimestamp($time);
    $expired_date = $date->format('Y-m-d H:i:s');
    
    $playback_remaining = 3;

    $_SESSION['user_id'] = $user_id;
    $_SESSION['expired_date'] = $expired_date;
    $_SESSION['playback_remaining'] = $playback_remaining;

    $result = ["status" => "success", "description" => "Guess Login Successful"];
    http_response_code(200);
    echo json_encode($result); 
?>