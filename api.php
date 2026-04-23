<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

$host = "localhost";
$dbname = "adatb";
$username = "root";
$password = "";

try {
    $dbh = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password, array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION));
} catch(PDOException $e) {
    die(json_encode(["error" => "Csatlakozási hiba: " . $e->getMessage()]));
}

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        $stmt = $dbh->query("SELECT * FROM gep");
        $eredmeny = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($eredmeny);
        break;

    case 'POST':
        $adat = json_decode(file_get_contents("php://input"));
        $stmt = $dbh->prepare("INSERT INTO gep (gyarto, tipus, kijelzo, memoria, ar) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([$adat->gyarto, $adat->tipus, $adat->kijelzo, $adat->memoria, $adat->ar]);
        echo json_encode(["message" => "Sikeres hozzáadás", "id" => $dbh->lastInsertId()]);
        break;

    case 'PUT':
        $adat = json_decode(file_get_contents("php://input"));
        $stmt = $dbh->prepare("UPDATE gep SET gyarto=?, tipus=?, kijelzo=?, memoria=?, ar=? WHERE id=?");
        $stmt->execute([$adat->gyarto, $adat->tipus, $adat->kijelzo, $adat->memoria, $adat->ar, $adat->id]);
        echo json_encode(["message" => "Sikeres módosítás"]);
        break;

    case 'DELETE':
        $adat = json_decode(file_get_contents("php://input"));
        $stmt = $dbh->prepare("DELETE FROM gep WHERE id=?");
        $stmt->execute([$adat->id]);
        echo json_encode(["message" => "Sikeres törlés"]);
        break;
}
?>