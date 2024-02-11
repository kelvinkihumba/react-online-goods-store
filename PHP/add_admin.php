<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
require_once('config.php');
$fName = $_POST['f_name'];
$lName = $_POST['l_name'];
$email = $_POST['email'];
$pass = $_POST['password'];

$query = "INSERT into admins (f_name, l_name, email, password) values('".$fName."','".$lName."','".$email."','".$pass."');";

try{
    $response = @mysqli_query($conn, $query);
}
catch(Exception ){
    echo mysqli_error($conn);
}

if ($response){
    echo "successful";
}
else echo "unsuccessful";

mysqli_close($conn);
?>