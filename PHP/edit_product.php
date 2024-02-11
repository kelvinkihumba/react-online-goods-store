<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
require_once('config.php');
$id = $_POST['product_id'];
$name = $_POST['product_name'];
$image = $_POST['product_image'];
$description = $_POST['description'];
$price = $_POST['price'];
$quantityAvailable = $_POST['quantity'];
$forSale = $_POST['available_for_sale'];
$applies = $_POST['quantity_applies'];

//$query = "UPDATE products SET product_name ='".$name."', product_image ='".$image."' , description ='".$description."',price=".$price.",quantity_available=".$quantity_available.",available_for_sale=".$available_for_sale.",quantity_applies=".$quantity_applies." WHERE product_id=".$id.";";
$query1 = "UPDATE products SET product_name ='".$name."' where product_id = ".$id.";";
$response = @mysqli_query($conn, $query1);

$query2 = "UPDATE products SET product_image ='".$image."' where product_id = ".$id.";";
$response = @mysqli_query($conn, $query2);

$query3 = "UPDATE products SET description ='".$description."' where product_id = ".$id.";";
$response = @mysqli_query($conn, $query3);

$query4 = "UPDATE products SET price =".$price." where product_id = ".$id.";";
$response = @mysqli_query($conn, $query4);

$query5 = "UPDATE products SET quantity_available =".$quantityAvailable." where product_id = ".$id.";";
$response = @mysqli_query($conn, $query5);

$query6 = "UPDATE products SET quantity_applies =".$applies." where product_id = ".$id.";";
$response = @mysqli_query($conn, $query6);

$query6 = "UPDATE products SET available_for_sale =".$forSale." where product_id = ".$id.";";
$response = @mysqli_query($conn, $query6);

if ($name == 'delete'){
    $query = "DELETE from products where product_id = ".$id.";";
    $response = @mysqli_query($conn, $query);
}

if ($response){
    echo "successful";
}
else echo "unsuccessful";

mysqli_close($conn);
?>