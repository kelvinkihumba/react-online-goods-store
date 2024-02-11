<?php
//header('Access-Control-Allow-Origin: react server');
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

header('Access-Control-Allow-Origin: http://localhost:3000');
error_reporting(-1);
ini_set('display_errors', 'On');
set_error_handler("var_dump");

require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';

require 'mail_cfg.php';

$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$address = $_POST['address'];
$subject = "Bird+Bee Special Order: ".$_POST['subject'];
$message = $_POST['message'];

// Build the email
$mail = new PHPMailer(true);
$email_message = "New Special Order Request\n\n";
$email_message .= "Customer Name: ".$name."\n";
$email_message .= "Customer Email: ".$email."\n";
$email_message .= "Customer Phone: ".$phone."\n";
$email_message .= "Customer Address: ".$address."\n\n\n";
$email_message .= $message;
try {
    // Server settings
    $mail->SMTPDebug = 0;
    $mail->isSMTP();
    $mail->SMTPAuth = true; 
    $mail->Host = "smtp.gmail.com";
    $mail->Username = "alyssa.kornylo@gmail.com";
    $mail->Password = $mail_pw;
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;

    // Recipients
    $mail->setFrom('alyssa.kornylo@gmail.com', 'Mailer');
    $mail->addAddress('awickma2@emich.edu', 'Alyssa Wickman');

    // Content
    $mail->Subject = $subject;
    $mail->Body = $email_message;

    $mail->send();
    echo '{"result": "success", "requestType": "specialOrder"}';
} catch (Exception $e) {
    echo '{"result": "failure", "error": "'.$mail->ErrorInfo.'"}';
}
?>