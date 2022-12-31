<?php

require_once '../config.php';

// Check if user is logged in
$user_id = isLoggedin($conn);

// If user is not logged in, unauthorize
if($user_id == -1){
    $result = ["status" => "invalid_login", "description" => "Invalid login information!"];
    http_response_code(401);
    exit(json_encode($result));   
}



if (isset($_GET['page'])){
    $page = $_GET['page'];
} else {
    $page = 1;
}

$query_string = "SELECT * FROM song";
$pagination_params = "";   

if(isset($_GET['judul'])){
    $judul = strtolower($_GET['judul']);

    //add to pagination params
    $pagination_params .= "&judul={$judul}";

    if(!empty($judul)){
        $tahun = (int) $judul;
        $query_string .= " WHERE LOWER(judul) LIKE '%{$judul}%' or LOWER(penyanyi) LIKE '%{$judul}%' or date_part('year', tanggal_terbit)  = $tahun";
        $filter_exist = true;
    }
}

if(isset($_GET['genre'])){
    $genre_raw = $_GET['genre'];
    $pagination_params .= "&genre={$genre_raw}";

    if (!empty($genre_raw)){
        $genre_arr = explode(";", $genre_raw);        
    
        // if 'WHERE' not in query string
        if(strpos($query_string, "WHERE") === false){
            $query_string .= " WHERE LOWER(genre) IN ";
        } else {
            $query_string .= " AND LOWER(genre) IN ";
        }
    
        $genre_query_set = "(";
    
        for($i = 0; $i < count($genre_arr); $i++){
            $genre_query_set .= "'$genre_arr[$i]'";
            if($i != count($genre_arr) - 1){
                $genre_query_set .= ", ";
            } else{
                $genre_query_set .= ")";
            }
        }
        $query_string .= $genre_query_set;
    }
}

// --------------------------------------------------
// SORTING SEGMENT
$sortjudul_params = "";
if(isset($_GET['sortjudul'])){
    $sortjudul = $_GET['sortjudul'];
    $sortjudul_params .= "{$sortjudul}";

    if(!empty($sortjudul)){
        if($sortjudul == 1){
            $query_string .= " ORDER BY judul ASC";
        } else if($sortjudul == -1){
            $query_string .= " ORDER BY judul DESC";
        }
    }
}

$sortdate_params = "";
if(isset($_GET['sortjudul'])){
    $sortdate = $_GET['sortdate'];
    $sortdate_params .= "{$sortdate}";

    if(!empty($sortdate)){
        if($sortdate == 1){
            $query_string .= " ORDER BY tanggal_terbit ASC";
        } else if($sortdate == -1){
            $query_string .= " ORDER BY tanggal_terbit DESC";
        }
    }
}

$pagination_params .= "&sortjudul={$sortjudul_params}&sortdate={$sortdate_params}";

$start = ($page - 1) * 10;
if ($sortjudul_params == "" && $sortdate_params == ""){
    $query_string .= " ORDER BY judul ASC";
}

$full_result = pg_query($conn, "$query_string");
$result = pg_query($conn, "$query_string LIMIT 10 OFFSET $start");

if(!$result or !$full_result){
    $result = ["status" => "error", "description" => "DB Error"];
    http_response_code(400);
    exit(json_encode($result));
}


$rows = pg_num_rows($result);
if($rows == 0){
    $result = ["status" => "success", "description" => "SONG_NOT_FOUND"];
    http_response_code(200);
    exit(json_encode($result));
}

$song_per_page = 10;
$page_count = ceil(pg_num_rows($full_result) / $song_per_page);

$page_link_html = "";
for ($i = 1; $i <= $page_count; $i++) {
    // TODO : Styling Pagination Number
    $page_link_html .= "<a href='sidebar.html?page={$i}{$pagination_params}' class='pagination_list'> {$i} </a>";
}

$payload = [];
while($row = pg_fetch_array($result)) {
    array_push($payload, $row);
}

$result = ["status" => "success", "description" => "SONG_FOUND", "payload" => $payload, "page_link" => $page_link_html, "query" => $query_string];
http_response_code(200);
echo json_encode($result); 

?>