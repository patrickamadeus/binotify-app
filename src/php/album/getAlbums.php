<?php

    require_once '../config.php';

    if(isset($_GET['query'])) {
        $query = $_GET['query'];
    }
    
    $full_result = pg_query($conn, "SELECT * FROM album WHERE LOWER(judul) LIKE '%{$query}%' ORDER BY judul");

    if(!$full_result){
        $result = ["status" => "error", "description" => "DB Error"];
        http_response_code(500);
        exit(json_encode($result));
    }

    $arr = [];
    while($row = pg_fetch_assoc($full_result)) {
        array_push($arr, ($row));
    }

    $result = ["status" => "success", "description" => "ALBUMS_FOUND", "payload" => $arr];
    http_response_code(200);
    echo json_encode($result); 

?>