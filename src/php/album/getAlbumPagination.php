<?php

    require_once '../config.php';

    $album_per_page = 8;

    if(isset($_GET['page']) && isset($_GET['query'])) {
        $page = $_GET['page'];
        $query = $_GET['query'];
    }

    $start = ($page - 1) * $album_per_page;
    
    $full_result = pg_query($conn, "SELECT * FROM album WHERE LOWER(judul) LIKE '%{$query}%' ORDER BY judul");

    $result = pg_query($conn, "SELECT * FROM album WHERE LOWER(judul) LIKE '%{$query}%' ORDER BY judul LIMIT {$album_per_page} OFFSET $start");

    if(!$result or !$full_result){
        $result = ["status" => "error", "description" => "DB Error"];
        http_response_code(500);
        exit(json_encode($result));
    }

    $payload = [];
    while($row = pg_fetch_array($result)) {
        array_push($payload, $row);
    }

    $page_count = ceil(pg_num_rows($full_result) / $album_per_page);

    $page_link_html = "";
    for ($i = 1; $i <= $page_count; $i++) {
        // TODO : Styling Pagination Number
        $page_link_html .= "<a href='album.html?page={$i}' class='pagination_list'> {$i} </a>";
    }

    $result = ["status" => "success", "description" => "ALBUMS_FOUND", "payload" => $payload, "page_link" => $page_link_html];
    http_response_code(200);
    echo json_encode($result); 

?>