<?php
$mysqli = new mysqli("localhost", "root", "rootroot");
mysqli_select_db($mysqli,"epicare");

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

?>