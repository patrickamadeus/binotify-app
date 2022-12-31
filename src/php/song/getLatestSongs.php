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


$results = pg_query($conn, "SELECT * FROM song ORDER BY tanggal_terbit DESC LIMIT 10");

if (!$results) {
    http_response_code(400);
    exit("DB Error");
}

$payload = [];
while($row = pg_fetch_array($results)) {
    array_push($payload, $row);
}

$result = ["status" => "success", "description" => "Songs Retrieved Successfully", "payload" => $payload];

http_response_code(200);
echo json_encode($result); 

?>