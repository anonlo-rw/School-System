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

$sql = "UPDATE students 
        SET name=IF('$name'='', name, '$name'),
        phone=IF('$phone'='', phone, '$phone'),
        email=IF('$email'='', email, '$email'),
        birthdate=IF('$birthdate'='', birthdate, '$birthdate'),
        grade=IF('$grade'='', grade, '$grade'),
        address=IF('$address'='', address, '$address'),
        gender=IF('$gender'='', gender, '$gender')
        WHERE id=$id";

if (mysqli_query($db, $sql)) {
    echo "updated";

} else echo $db->error
?>