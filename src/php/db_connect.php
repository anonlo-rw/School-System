<?php
header("Access-Control-Allow-Origin:*");
ini_set("display_errors", "1");

function check_session() {
    session_start();

    if (!isset($_SESSION["login"])) {
        die("Permission Denied");
    }
}

$db_hostname = "localhost";
$db_username = "root";
$db_password = "";
$db_name = "school";

try {
    $db = new mysqli($db_hostname, $db_username, $db_password, $db_name);
} catch (Exception $e) {
    die($e->getMessage());
}
?>