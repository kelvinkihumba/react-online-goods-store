<?php
require_once('config.php');
header('Access-Control-Allow-Origin: http://localhost:3000');
$userEmail = $_POST['admin_email'];
$userPass = $_POST['admin_password'];
$found = 0;
$name="";

if($_POST['type'] == "admin")
    {
        $query = "SELECT * FROM admins WHERE type = 'Admin';";
        $response = @mysqli_query($conn, $query);
    
        if ($response){
            
            while ($row = mysqli_fetch_array($response)){
                //email found 
                if ($row['email'] == $userEmail){
                    //password correct
                    if ($row['password'] == $userPass){
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
                echo '{"UserEmail": "'. $userEmail .'", "UserName": "' . $name . '", "requestType": "adminLogin"}';
                //echo "correct";
            }
            else if ($found == 2){
                echo '{"UserEmail": "failure", "UserName": "error", "requestType": "PasswordError"}';
                //echo "wrong password";
            }
            
        }
    
        else {
            echo "no response";
        }
    }
    else if ($_POST['type'] == "owner"){
        $query = "SELECT * FROM admins WHERE type = 'Owner';";
        $response = @mysqli_query($conn, $query);
        
        if ($response){
            
            while ($row = mysqli_fetch_array($response)){
                //email found 
                if ($row['email'] == $userEmail){
                    //password correct
                    if ($row['password'] == $userPass){
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
                echo '{"UserEmail": "'. $userEmail .'", "UserName": "' . $name . '", "requestType": "ownerLogin"}';
                //echo "correct";
            }
            else if ($found == 2){
                echo '{"UserEmail": "failure", "UserName": "error", "requestType": "PasswordError"}';
                //echo "wrong password";
            }
            
        }
    }


mysqli_close($conn);
?>