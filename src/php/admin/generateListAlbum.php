<?php 

    require_once '../config.php';


    // Check if user is logged in
    $user_id = isLoggedin($conn);

    // If user is not admin, unauthorize
    if($user_id == -1){
        $result = ["status" => "invalid_login", "description" => "nvalid Credentials"];
        http_response_code(401);
        exit(json_encode($result));   
    }

    // Insert Song into DB
    $query = "SELECT * FROM album";

    // exit(json_encode(["query" => $query]));


    $result = pg_query($conn, $query);

    if(!$result) {
        $result = ["status" => "error", "description" => "DB Error Occured. Please contact developer."];
        http_response_code(500);
        exit(json_encode($result));
    }

    $album_option_html = "<select required name ='album_id'> <option value='0'>Select Album:</option>";

    while($row = pg_fetch_assoc($result)) {
        $album_id = $row['album_id'];
        $judul = $row['judul'];

        $album_option_html .= "<option value={$album_id}>{$judul}</option>";
    }
    
    $album_option_html .= "</select>";

    $result = ["status" => "success", "description" => "LIST_ALBUM_GENERATED", "list_album" => $album_option_html];
    http_response_code(200);
    echo json_encode($result);

?>