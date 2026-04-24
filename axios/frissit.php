<?php
include "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$sql = "UPDATE gep SET
    gyarto='".$data["gyarto"]."',
    tipus='".$data["tipus"]."',
    kijelzo='".$data["kijelzo"]."',
    memoria=".$data["memoria"].",
    merevlemez=".$data["merevlemez"].",
    videovezerlo='".$data["videovezerlo"]."',
    ar=".$data["ar"].",
    processzorid=".$data["processzorid"].",
    oprendszerid=".$data["oprendszerid"].",
    db=".$data["db"]."
WHERE id=".$data["id"];

$conn->query($sql);

echo json_encode(["status" => "ok"]);
?>
