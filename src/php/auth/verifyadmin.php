<?php 

require_once '../config.php';

$user_id = isLoggedin($conn);

if($user_id == -1){
    $result = ["status" => "invalid_login", "description" => "Not logged in yet!"];
    exit(json_encode($result));
}

$is_admin = isAdmin($conn, $user_id);

if($is_admin == -1){
    $_SESSION['isAdmin'] = 0;
    $result = ["status" => "invalid_privilege", "description" => "Logged in not as an admin!"];
    exit(json_encode($result));
}

$_SESSION['isAdmin'] = 1;

$result = ["status" => "success", "description" => "Admin credentials valid."];
echo json_encode($result); 