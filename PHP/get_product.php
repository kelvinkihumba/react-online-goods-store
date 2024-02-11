<?php
//header('Access-Control-Allow-Origin: react server');
require_once('config.php');
$productId = $_POST['product_id'];

$query = "SELECT * FROM products WHERE product_id=".$productId.";";
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
