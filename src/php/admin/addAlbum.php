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

if((isset($_POST['judul']))){

    $judul = $_POST['judul'];
    $penyanyi = $_POST['penyanyi'];
    $tanggal_terbit = $_POST['tanggal_terbit'];
    $duration = 0;
    $image_file = $_FILES['image_path'];
    $image_path = "static/album_img/".$image_file['name'];
    $genre = $_POST['genre'];

    if ($image_file["size"] > 500000) {
        $result = ["status" => "error", "description" => "ALBUM_SIZE_FAIL"];
        http_response_code(400);
        exit(json_encode($result));
    }

    // CHECK IF ALBUM EXISTS
    $result = pg_query($conn, "SELECT * FROM album WHERE judul = '{$judul}'");
    if(!$result) {
        $result = ["status" => "error", "description" => "DB_ERROR"];
        exit(json_encode($result));
    }

    if (pg_num_rows($result) > 0) {
        $result = ["status" => "error", "description" => "ALBUM_NOT_AVAILABLE"];
        exit(json_encode($result));
    }

    $query = "INSERT INTO album (judul, penyanyi, total_duration, image_path, tanggal_terbit, genre) VALUES ('{$judul}', '{$penyanyi}', {$duration}, '{$image_path}', TO_DATE('{$tanggal_terbit}', 'yyyy-mm-dd'), '{$genre}')";
    
    $result = pg_query($conn, $query);

    if(!$result) {
        $result = ["status" => "error", "description" => "DB_ERROR."];
        http_response_code(500);
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

    $result = ["status" => "success", "description" => "SUCCESS"];
    http_response_code(200);
    echo json_encode($result);

} else {
    $result = ["status" => "error", "description" => "METHOD_FAIL"];
    http_response_code(404);
    exit(json_encode($result));
}
?>