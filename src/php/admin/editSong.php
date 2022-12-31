<?php

require_once '../config.php';

// Check if user is logged in
$user_id = isAdmin($conn);

// If user is not admin, unauthorize
if($user_id == -1){
    $result = ["status" => "invalid_login", "description" => "Not Admin, Invalid Credentials"];
    http_response_code(401);
    exit(json_encode($result));   
}


if(isset($_POST['judul']) && isset($_POST['tanggal_terbit']) && isset($_POST['penyanyi'])){
    $judul = $_POST['judul'];
    $penyanyi = $_POST['penyanyi'];
    $tanggal_terbit = $_POST['tanggal_terbit'];
    $album_id = (int) $_POST['album_id'];
    $song_id = (int) $_POST['song_id'];
    $genre = $_POST['genre'];
    $image_file = $_FILES['songimgfile'];
    $image_path = "static/song_img/".$image_file['name'];
} else{
    $result = ["status" => "error", "description" => "DB Error"];
    http_response_code(500);
    exit(json_encode($result));
}

$query = "UPDATE song SET judul = '$judul', penyanyi = '$penyanyi', tanggal_terbit = TO_DATE('{$tanggal_terbit}', 'yyyy-mm-dd'), album_id = $album_id, genre = '$genre' , image_path = '$image_path' WHERE song_id = $song_id";
$result = pg_query($conn, $query);

if(!$result){
    $result = ["status" => "error", "description" => "DB Error"];
    http_response_code(500);
    exit(json_encode($result));
}

    // UPLOAD FILE TO LOCAL FOLDER
    $target_dir = __DIR__."/../../static/song_img/";
    $target_file = $target_dir . basename($image_file["name"]);
    $uploadOk = 1;

    if (file_exists($target_file)) {
        $result = ["status" => "success", "description" => "SONG_IMG_FAIL"];
        http_response_code(400);
        exit(json_encode($result));
    }

    if (!move_uploaded_file($image_file["tmp_name"], $target_file)) {
        $result = ["status" => "error", "description" => "SONG_UPLOAD_FAIL"];
        http_response_code(400);
        exit(json_encode($result));
    }
    // -----------------------------------------------------------------

$result = ["status" => "success", "description" => "SUCCESS"];
http_response_code(200);
echo json_encode($result); 

?>