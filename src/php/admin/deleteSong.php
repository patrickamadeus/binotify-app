<?php

    require_once '../config.php';

    if(isset($_GET['song_id'])) {
        $song_id = (int) $_GET['song_id'];
    }else{
        $result = ["status" => "error", "description" => "DB_ERROR"];
        http_response_code(500);
        exit(json_encode($result));
    }

    $del_query = "DELETE FROM song WHERE song_id = $song_id";
    $del_result = pg_query($conn, $del_query);
    if(!$del_result){
        $result = ["status" => "error", "description" => "DB_ERROR"];
        http_response_code(500);
        exit(json_encode($del_result));
    }

    $result = ["status" => "success", "description" => "SUCCESS"];
    http_response_code(200);
    echo json_encode($result); 

?>