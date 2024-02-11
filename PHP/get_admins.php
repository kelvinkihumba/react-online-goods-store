<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
require_once('config.php');

$query = "SELECT * from admins;";
$response = @mysqli_query($conn, $query);
if ($response){
    $responseArray = array();
    while ($row = mysqli_fetch_array($response)){
        array_push($responseArray, $row);
    }
    $responseJson = json_encode($responseArray);
    echo $responseJson;
}
mysqli_close($conn);
?>