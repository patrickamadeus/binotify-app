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
    $result = pg_query($conn, "SELECT * FROM song WHERE song_id = $id");

    if(!$result){
        $result = ["status" => "error", "description" => "DB Error"];
        http_response_code(500);
        exit(json_encode($result));
    }

    if(pg_num_rows($result) == 0){
        $result = ["status" => "No song found!", "description" => "SONG_NOT_FOUND"];
        http_response_code(404);
        exit(json_encode($result));
    }
    
    // album id is a foreign key, no need to check query error
    $result = pg_fetch_assoc($result);
    $album_id = (int) $result['album_id'];

    $result_album = pg_query($conn, "SELECT judul FROM album where album_id = $album_id");

    if (pg_num_rows($result_album) != 0){
        $judul_album = pg_fetch_assoc($result_album);
        $result["judul_album"] = "{$judul_album['judul']}";
    }else{
        $result["judul_album"] = "No Album Found!";
    }

    $result = ["status" => "success", "description" => "SONG_FOUND", "payload" => ($result)];

    echo json_encode($result); 

} else {
    $result = ["status" => "error", "description" => "This method is not supported."];
    http_response_code(404);
    exit(json_encode($result));
}
?>