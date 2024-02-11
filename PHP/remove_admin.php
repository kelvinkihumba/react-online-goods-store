<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
require_once('config.php');
$email = $_POST['email'];

$query = "DELETE from admins where email='".$email."';";
try{
    $response = @mysqli_query($conn, $query);
    echo $email;
}
catch (Exception ){
    echo mysqli_error(con);
}

if ($response){
    echo "successful";
}
else echo "unsuccessful";

mysqli_close($conn);
?>
