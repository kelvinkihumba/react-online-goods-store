<?php
//header('Access-Control-Allow-Origin: react server');
header('Access-Control-Allow-Origin: http://localhost:3000');
require_once('config.php');
$userEmail = $_POST['email'];
$userPass = $_POST['password'];
$found = 0;

//get all customers
$query = "SELECT * FROM admins WHERE type = 'Owner';";
$response = @mysqli_query($conn, $query);

if ($response){
    
    while ($row = mysqli_fetch_array($response)){
        //email found 
        if ($row['email'] == $userEmail){
            //password correct
            if ($row['password'] == $userPass){
                $found = 1;
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
        echo '{"UserEmail": "'. $userEmail .'", "UserName": "' . $name . '", "requestType": "ownerLogin"}';
        //echo "correct";
    }
    else if ($found == 2){
        echo '{"UserEmail": "failure", "UserName": "error", "requestType": "PasswordError"}';
        //echo "wrong password";
    }
    
}
mysqli_close($conn);
?>