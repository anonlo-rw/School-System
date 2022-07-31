<?php
include("db_connect.php");

$username = filter_input(INPUT_GET, "username");
$password = filter_input(INPUT_GET, "password");

$sql = "INSERT INTO administrators (username, password)
VALUES ('$username', '$password')";

if (mysqli_query($db, $sql)) {
    echo "registered";
} else {
    echo "MySQL Database Connection Error. Please contact administrator";
}
?>