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

if((isset($_POST['judul'])) || (isset($_POST['penyanyi'])) || (isset($_POST['tanggal_terbit'])) || (isset($_POST['genre']))|| (isset($_POST['audio_path'])) || (isset($_POST['image_path'])) || (isset($_POST['album_id']))) {

    $judul = $_POST['songtitle'];
    $penyanyi = $_POST['songsinger'];
    $tanggal_terbit = $_POST['songdate'];
    $genre = $_POST['songgenre'];
    $duration = $_POST['duration'];
    $audio_path = $_FILES['songmp3file'];
    $image_path = $_FILES['songimgfile'];
    $audio_path_full = "static/song_mp3/".$audio_path['name'];
    $image_path_full = "static/song_img/".$image_path['name'];
    $album_id = $_POST['album_id'];

    // Insert Song into DB
    $query = "INSERT INTO song (judul, penyanyi, tanggal_terbit, genre, duration, audio_path, image_path, album_id) VALUES ('{$judul}', '{$penyanyi}', TO_DATE('{$tanggal_terbit}', 'yyyy-mm-dd'), '{$genre}', {$duration}, '{$audio_path_full}', '{$image_path_full}', {$album_id})";

    //--------------------------------------------------------------
    // UPLOAD FILE TO LOCAL FOLDER
    $target_dir_img = __DIR__."/../../static/song_img/";
    $target_dir_mp3 = __DIR__."/../../static/song_mp3/";

    $target_file_img = $target_dir_img . basename($image_path["name"]);
    $target_file_mp3 = $target_dir_mp3 . basename($audio_path["name"]);

    $uploadOk = 1;

    if(!file_exists($target_file_img)){
        if (!move_uploaded_file($image_path["tmp_name"], $target_file_img)) {
            $result = ["status" => "error", "description" => "IMG_UPLOAD_FAIL"];
            http_response_code(400);
            exit(json_encode($result));
        }
    }

    if(!file_exists($target_file_mp3)){
        if (!move_uploaded_file($audio_path["tmp_name"], $target_file_mp3)) {
            $result = ["status" => "error", "description" => "AUDIO_UPLOAD_FAIL"];
            http_response_code(400);
            exit(json_encode($result));
        }
    }
    // -----------------------------------------------------------------

    $result = pg_query($conn, $query);

    if(!$result) {
        $result = ["status" => "error", "description" => "DB Error Occured. Please contact developer."];
        http_response_code(500);
        exit(json_encode($result));
    }

    //Calculate total duration
    $query = "UPDATE album set total_duration = coalesce((SELECT SUM(duration) FROM song GROUP BY album_id HAVING song.album_id = album.album_id),0);";
 
    $result = pg_query($conn, $query);

    if(!$result) {
        $result = ["status" => "error", "description" => "DB Error Occured. Please contact developer."];
        http_response_code(500);
        exit(json_encode($result));
    }

    $result = ["status" => "success", "description" => "Song Insertion Successful"];
    http_response_code(200);
    echo json_encode($result);

} else {
    $result = ["status" => "error", "description" => "This method is not supported."];
    http_response_code(404);
    exit(json_encode($result));
}
?>