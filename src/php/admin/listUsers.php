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

// Insert Song into DB
$query = "SELECT * FROM users";

// exit(json_encode(["query" => $query]));

$result = pg_query($conn, $query);

if(!$result) {
    $result = ["status" => "error", "description" => "DB Error Occured. Please contact developer."];
    http_response_code(500);
    exit(json_encode($result));
}

$arr = [];
while($row = pg_fetch_assoc($result)) {
    array_push($arr, ($row));
}

$html = "";
for ($i = 1; $i <= pg_num_rows($result); $i++) {
    // TODO : Styling Pagination Number
    $email = $arr[$i-1]['email'];
    $username = $arr[$i-1]['username'];
    $role = $arr[$i-1]['isadmin'];
    if($role == 't'){
        $role = 'Admin';
    } else {
        $role = 'User';
    }

    $html .= 
    "<div class = 'song_list__line'>
        <div class='song_list__number'>{$i}</div>
        <div class='song_list__genre'>{$email}</div>
        <div class='song_list__genre'>{$username}</div>
        <div class='song_list__genre'>{$role}</div>
    </div>";
}

$result = ["status" => "success", "description" => "Get List of Users Successfull", "html" => $html];
http_response_code(200);
echo json_encode($result);

?>