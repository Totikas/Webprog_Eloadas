<?php
include "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$sql = "DELETE FROM gep WHERE id=".$data["id"];
$conn->query($sql);

echo json_encode(["status" => "ok"]);
?>
