<?php

require_once '../config.php';

if(isset($_GET['album_id'])) {
    $album_id = (int) $_GET['album_id'];
}else{
    $result = ["status" => "error", "description" => "DB_ERROR"];
    http_response_code(500);
    exit(json_encode($result));
}

$del_query = "DELETE FROM album WHERE album_id = $album_id";
$del_result = pg_query($conn, $del_query);
if(!$del_result){
    $result = ["status" => "error", "description" => "DB_ERROR"];
    http_response_code(500);
    exit(json_encode($del_result));
}

$update_query = "UPDATE song SET album_id = NULL WHERE album_id = $album_id";
$update_result = pg_query($conn, $update_query);

if(!$update_result){
    $result = ["status" => "error", "description" => $update_result];
    http_response_code(500);
    exit(json_encode($result));
}

$result = ["status" => "success", "description" => "SUCCESS"];
http_response_code(200);
echo json_encode($result); 

?>