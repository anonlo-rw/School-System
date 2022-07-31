<?php
include("db_connect.php");

$id = filter_input(INPUT_GET, "id");
if ($db->query("DELETE FROM students WHERE id=$id")) {
    echo "success";
} else {
    echo "error";
}
?>