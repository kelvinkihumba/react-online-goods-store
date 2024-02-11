<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
require_once('config.php');
$name = $_POST['product_name'];
$image = $_POST['product_image'];
$description = $_POST['description'];
$price = $_POST['price'];
$quantityAvailable = $_POST['quantity_available'];
$forSale = $_POST['available_for_sale'];
$applies = $_POST['quantity_applies'];

if (!$quantityAvailable) {
    $quantityAvailable = "null";
}

$query = "INSERT into products (product_name, product_image, description, price, quantity_available, available_for_sale, quantity_applies)";
$query = $query." values ('".$name."','".$image."','".$description."',".$price.",".$quantityAvailable.",".$forSale.",".$applies.");";
error_log($query);
try{
    $response = @mysqli_query($conn, $query);
    if ($response) {
        echo "successful";
    } else {
        echo "unsuccessful";
    }
}
catch (Exception ){
    echo mysqli_error($conn);
    echo "unsuccessful";
}

mysqli_close($conn);
?>