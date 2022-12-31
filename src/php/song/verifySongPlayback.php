<?php 

require_once '../config.php';

if (isset($_GET['song_id']))

    $song_id = "song_id_"."{$_GET['song_id']}";

    // Check if user is logged in
    $user_id = isLoggedin($conn);

    // If user is not logged in, unauthorize
    if($user_id == -1){
        $result = ["status" => "invalid_login", "description" => "Invalid login information!"];
        http_response_code(401);
        exit(json_encode($result));
    }

    if ($_SESSION['user_id'] != 'guess'){
        $result = ["status" => "success", "description" => "Songs Retrieved Successfully"];

        http_response_code(200);
        exit(json_encode($result)); 
    }

    $playback_remaining = $_SESSION['playback_remaining'];
    $description = "";

    if (isset($_SESSION[$song_id])){
        // Play the same song
        $expired = strtotime($_SESSION[$song_id]);
        $now = time();

        if ($now > $expired){
            // reduce playback remaining
            $_SESSION['playback_remaining'] = $playback_remaining - 1;
    
            $expire = 300;
            $time = time() + $expire;
            $date = new DateTime();
            $date->setTimestamp($time);
            $expired_time = $date->format('Y-m-d H:i:s');
    
            $_SESSION[$song_id] = $expired_time;
            
            $description = "replay the same song";

            $result = ["status" => "success", "description" => $description];
    
            http_response_code(200);
            exit(json_encode($result)); 
        }else if ($playback_remaining > 0){
            $_SESSION['playback_remaining'] = $playback_remaining - 1;
            $description = "play the same song";

            $result = ["status" => "success", "description" => $description];
    
            http_response_code(200);
            exit(json_encode($result)); 
        }else{
            $result = ["status" => "playback_expired", "description" => "no more playback rermaining, please login"];
            http_response_code(200);
            exit(json_encode($result));
        }
    }

    else if (!(isset($_SESSION[$song_id])) && $playback_remaining > 0){
        // the song will expire in 5 minutes
        $_SESSION['playback_remaining'] = $playback_remaining - 1;

        $expire =300;
        $time = time() + $expire;
        $date = new DateTime();
        $date->setTimestamp($time);
        $expired_time = $date->format('Y-m-d H:i:s');

        $_SESSION[$song_id] = $expired_time;

        $result = ["status" => "success", "description" => "New Songs Played Successfully", "session" => $song_id, "value" => $_SESSION[$song_id]];

        http_response_code(200);
        exit(json_encode($result)); 
    }    
    
    if ($playback_remaining <= 0){
        $result = ["status" => "playback_expired", "description" => "no more playback rermaining, please login"];
        http_response_code(200);
        exit(json_encode($result));
    }

    $result = ["status" => "success", "description" => "Songs Played Successfully"];

    http_response_code(200);
    echo json_encode($result); 

?>