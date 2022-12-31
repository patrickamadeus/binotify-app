<?php 

require_once '../config.php';

if(isset($_GET['id'])) {
    // Check if user is logged in
    $user_id = isLoggedin($conn);

    // If user is not logged in, unauthorize
    if($user_id == -1){
        $result = ["status" => "invalid_login", "description" => "Invalid login information!"];
        http_response_code(401);
        exit(json_encode($result));   
    }

    $id = $_GET['id'];
    $result = pg_query($conn, "SELECT * FROM album WHERE album_id = $id");

    if(!$result){
        $result = ["status" => "error", "description" => "DB Error"];
        http_response_code(500);
        exit(json_encode($result));
    }

    if(pg_num_rows($result) == 0){
        $result = ["status" => "No song found!", "description" => $id];
        http_response_code(404);
        exit(json_encode($result));
    }

    $result = pg_fetch_assoc($result);
    $result_songs = pg_query($conn, "SELECT * FROM song WHERE album_id = {$result['album_id']}");

    $arr = [];
    while($row = pg_fetch_assoc($result_songs)) {
        array_push($arr, ($row));
    }
    $result["songsArray"] = $arr;

    $result = ["status" => "success", "description" => "ALBUM_FOUND", "payload" => $result];
    echo json_encode($result); 

} else {
    $result = ["status" => "error", "description" => "This method is not supported."];
    http_response_code(404);
    exit(json_encode($result));
}
?>