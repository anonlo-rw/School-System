<?php
include("db_connect.php");
check_session();

$id = filter_input(INPUT_GET, "id");
if ($id == null) {
    $stmt = mysqli_query($db, "SELECT name, id, email, gender, grade FROM students");
} else {
    $stmt = mysqli_query($db, "SELECT name, id, phone, email, birthdate, grade, address, gender FROM students WHERE id=$id");
}

$rows = array();
while($row = mysqli_fetch_assoc($stmt)) {
    $rows[] = $row;
}
echo json_encode($rows);
?>