<?php
//header('Access-Control-Allow-Origin: react server');
require_once('config.php');
$id= $_POST['product']['product_id'];

$query = "DELETE from products where product_id=".$id."";
$response = @mysqli_query($conn, $query);

if ($response){
    echo "successful";
}
else echo "unsuccessful";

mysqli_close($conn);
?>