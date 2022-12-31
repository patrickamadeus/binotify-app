<?php
    session_start();
    // Set response header
    header('Content-Type: application/json');

    // Create MySQL connection
    $HOST = 'db.xnhaitjjxilrqaypdgnk.supabase.co';
    $USER = 'postgres';
    $PASS = 'epifywbd2022';
    $DBNAME = 'postgres';
    $PORT = '6543';

    $conn = pg_connect("host={$HOST} port={$PORT} dbname={$DBNAME} user={$USER} password={$PASS}");

    function isLoggedin($con) {
        if (!isset($_SESSION['user_id'])){
            return -1;
        }
        
        $user_id = $_SESSION['user_id'];
        $expired = strtotime($_SESSION['expired_date']);
        $now = time();

        // If session is no longer valid, return status -1 (NOT LOGGED IN)
        if ($user_id == 'guess' && $now > $expired){

            return -1;
        }
        return $user_id;
    }

    function isAdmin($conn){
        $user_id = isLoggedin($conn);
        if($user_id == -1){
            return -1;
        }

        $result = pg_query($conn, "SELECT user_id, isAdmin FROM users WHERE isAdmin = True and user_id = '{$user_id}'");


        if(pg_num_rows($result) == 0){
            return -1;
        }      
    

        return $user_id;

        
    }

?>