<?php
//header('Access-Control-Allow-Origin: react server');
header('Access-Control-Allow-Origin: http://localhost:3000');
require_once('config.php');
$fName = $_POST['f_name'];
$lName = $_POST['l_name'];
$email = $_POST['email'];


$pass = $_POST['password'];
$confirm = $_POST['confirmpassword'];
$response="";


$query = "SELECT * FROM customer WHERE email = '$email';";
$result = @mysqli_query($conn, $query);
$requestType = "";
$num_rows = mysqli_num_rows($result);
if ($num_rows > 0) {
    $requestType = "UserExists";
}
else {
    if ($confirm == $pass){
        $pass = md5($pass);
        $query = "INSERT INTO customer (f_name, l_name, email, password) VALUES ('$fName', '$lName', '$email', '$pass');";
        
        $response = @mysqli_query($conn, $query);
    }
}


if ($response){
    echo '{"User": "'. $email .'", "requestType": "userRegistration"}';
}

else echo '{"User": "failure", "requestType": "'. $requestType . '"}';

mysqli_close($conn);
?>