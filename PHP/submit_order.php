<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
require_once('config.php');

$cust_email = $_POST['cust_email'];
$cust_query = "SELECT ID from customer WHERE email = '".$cust_email."';";
$response = @mysqli_query($conn, $cust_query);
$row = mysqli_fetch_array($response);
$cust_id = $row["ID"];

$shoppingCart = json_decode($_POST["shoppingCart"]);
$total = $_POST["total"];
$notes = $_POST["notes"];
$address = $_POST["address"];
$paypal_order_id = $_POST["paypal_order_id"];

$products = "";
foreach($shoppingCart as $productId => $quantity) {
    // update the product quantities in the database
    $get_product_quantity_query = "SELECT quantity_available, quantity_applies FROM products WHERE product_id = ".$productId.";";
    $response = @mysqli_query($conn, $get_product_quantity_query);
    $row = mysqli_fetch_array($response);
    if ($row["quantity_applies"]) {
        $new_quantity = intval($row["quantity_available"]) - intval($quantity);
        $set_command = "SET quantity_available = ".$new_quantity;
        if ($new_quantity == 0) {
            $set_command .= ", available_for_sale = 0";
        }
        $update_query = "UPDATE products ".$set_command." WHERE product_id = ".$productId.";";
        $response = @mysqli_query($conn, $update_query);
    }
    // create a list of the ids to store in the orders table
    $products .= $productId.",";
}

//strip off last comma
$products = substr($products, 0, -1);

$query = "INSERT into orders (products, amount, cust_id, status, type, address, notes, paypal_order_id) values('".$products."',".$total.",".$cust_id.", 0, 'regular', '".$address."', '".$notes."', '".$paypal_order_id."');";
error_log($query);
if (mysqli_query($conn, $query)) {
    $confirmation_id = mysqli_insert_id($conn);
    echo '{"result": "success", "requestType": "normalOrder", "orderNumber": '.$confirmation_id.'}';
} else {
    echo '{"result": "failure", "error": "'.mysqli_error($conn).'"}';
}

mysqli_close($conn);
?>