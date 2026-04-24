<?php
include "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$sql = "INSERT INTO gep (gyarto, tipus, kijelzo, memoria, merevlemez, videovezerlo, ar, processzorid, oprendszerid, db)
VALUES (
    '".$data["gyarto"]."',
    '".$data["tipus"]."',
    '".$data["kijelzo"]."',
    ".$data["memoria"].",
    ".$data["merevlemez"].",
    '".$data["videovezerlo"]."',
    ".$data["ar"].",
    ".$data["processzorid"].",
    ".$data["oprendszerid"].",
    ".$data["db"]."
)";

$conn->query($sql);

echo json_encode(["status" => "ok"]);
?>
