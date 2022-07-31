<?php
include("db_connect.php");

$username = filter_input(INPUT_GET, "username");
$password = filter_input(INPUT_GET, "password");

if (mysqli_num_rows(mysqli_query($db, "SELECT * FROM administrators WHERE username='$username' AND password='$password'")) > 0) {
    session_start();
    $_SESSION["login"] = true;
    echo "success";
}
else echo "Invalid Login, try again";
?>