<?php
include("db_connect.php");
check_session();

$id = filter_input(INPUT_GET, "id");
$name = rtrim(filter_input(INPUT_GET, "name"));
$phone = rtrim(filter_input(INPUT_GET, "phone"));
$email = rtrim(filter_input(INPUT_GET, "email"));
$birthdate = filter_input(INPUT_GET, "birthdate");
$grade = rtrim(filter_input(INPUT_GET, "grade"));
$address = rtrim(filter_input(INPUT_GET, "address"));
$gender = filter_input(INPUT_GET, "gender");

$sql = "INSERT INTO students (id, name, phone, email, birthdate, grade, address, gender)
        VALUES ('$id', '$name', '$phone', '$email', '$birthdate', '$grade', '$address', '$gender')";

if (mysqli_query($db, $sql)) {
    echo "created";
}
?>