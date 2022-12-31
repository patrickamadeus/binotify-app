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


if(isset($_POST['judul'])) {
    $judul = $_POST['judul'];
    $album_id = (int) $_POST['album_id'];
    $image_file = $_FILES['image_path'];
    $image_path = "static/album_img/".$image_file['name'];
}else{
    $result = ["status" => "error", "description" => "DB Error ASTAJIM"];
    http_response_code(400);
    exit(json_encode($result));
}

$query = "UPDATE album SET judul = '$judul', image_path = '$image_path'  WHERE album_id = $album_id";
$result = pg_query($conn, $query);

if(!$result){
    $result = ["status" => "error", "description" => "DB Error"];
    http_response_code(400);
    exit(json_encode($result));
}

// UPLOAD FILE TO LOCAL FOLDER
$target_dir = __DIR__."/../../static/album_img/";
$target_file = $target_dir . basename($image_file["name"]);
$uploadOk = 1;

if (file_exists($target_file)) {
    $result = ["status" => "success", "description" => "ALBUM_IMG_FAIL"];
    http_response_code(400);
    exit(json_encode($result));
}

if (!move_uploaded_file($image_file["tmp_name"], $target_file)) {
    $result = ["status" => "error", "description" => "ALBUM_UPLOAD_FAIL"];
    http_response_code(400);
    exit(json_encode($result));
}
// -----------------------------------------------------------------

$result = ["status" => "success", "description" => "ALBUMS_EDITED"];
http_response_code(200);
echo json_encode($result); 

?>