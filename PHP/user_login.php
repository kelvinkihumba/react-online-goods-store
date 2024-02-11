<?php
//header('Access-Control-Allow-Origin: react server');
header('Access-Control-Allow-Origin: http://localhost:3000');
require_once('config.php');
$userEmail = $_POST['user_email'];

$userPass = $_POST['user_password'];

$found = 0;

//get all customers
$query = "SELECT * FROM customer;";
$response = mysqli_query($conn, $query);
$name="";

if ($response){
    
    while ($row = mysqli_fetch_array($response)){
        //email found 
        if ($row['email'] == $userEmail){
            //password correct
            if ($row['password'] == md5($userPass)){
                $found = 1;
                $name = $row['f_name'];
                break;
            }
            else{
                $found = 2;
                break;
            } 
        }

    }

    if ($found == 0){
        echo '{"UserEmail": "failure", "UserName": "error", "requestType": "UsernameError"}';
        //echo "username not found";
    }
    else if ($found == 1){
        //echo $name;
        echo '{"UserEmail": "'. $userEmail .'", "UserName": "' . $name . '", "requestType": "userLogin"}';
        //echo "correct";
    }
    else if ($found == 2){
        echo '{"UserEmail": "failure", "UserName": "error", "requestType": "PasswordError"}';
        //echo "wrong password";
    }
    
}

mysqli_close($conn);
?>