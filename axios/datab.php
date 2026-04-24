<?php
$host = "localhost";
$user = "uuser1";       // phpMyAdmin user
$pass = "uuser123";     // phpMyAdmin jelszó
$dbname = "uuser1";     // adatbázis neve

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die("Kapcsolódási hiba: " . $conn->connect_error);
}

$conn->set_charset("utf8");
?>
