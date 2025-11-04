<?php

//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
// echo $_REQUEST['Namemail'];
// echo $_REQUEST['Phonemail'];
// echo $_REQUEST['Emailaddress'];
// echo $_REQUEST['Messagemail'];
// die();

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
// require($_SERVER['DOCUMENT_ROOT'] . "/suwanSam24/construckSuwanSam/blob/main2/vendor/autoload.php");
// require("https://construcksuwansam.onrender.com/suwanSam24/construckSuwanSam/blob/main2/vendor/autoload.php");
// require("https://github.com/suwanSam24/construckSuwanSam/tree/main2/vendor/autoload.php");
// require("https://construcksuwansam.onrender.com/vendor/autoload.php");
// require($_SERVER['DOCUMENT_ROOT'] . "/vendor/autoload.php");
require("/xampp/htdocs/langit/vendor/autoload.php");
header('Content-Type: application/json');

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

if (isset($_REQUEST['Emailaddress'])) {
    // echo "test";
    // die();
    // try {
    //Server settings
    // $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
    $mail->isSMTP();                                            //Send using SMTP
    $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
    $mail->Username   = 'professional.software.global@gmail.com';                     //SMTP username
    $mail->Password   = 'ieumclngvdemoqha';                               //SMTP password
    // $mail->SMTPSecure = 'ssl';            //Enable implicit TLS encryption
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
    // $mail->Port       = 443;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
    $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

    //Recipients
    $mail->setFrom('professional.software.global@gmail.com', 'professional.software.global');
    // $mail->addAddress('joe@example.net', 'Joe User');     //Add a recipient
    $mail->addAddress($_REQUEST["Emailaddress"]);               //Name is optional
    // $mail->addReplyTo('info@example.com', 'Information');
    $mail->addCC('prawit.saquannam@gmail.com');
    // $mail->addBCC('bcc@example.com');

    //Attachments
    // $mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
    // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name

    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = 'Customer sends message';

    $email_template = "
                <h1>Customer</h1>
                <h2>Name : {$_REQUEST['Namemail']}</h2>
                <h2>Phone : {$_REQUEST['Phonemail']}</h2>
                <h2>Email address : {$_REQUEST['Emailaddress']}</h2>
                <h3>{$_REQUEST['Messagemail']}</h3>
            ";

    $mail->Body    = $email_template;
    // $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

    // $mail->send();
    // echo 'Message has been sent';

    // } 
    // catch (Exception $e) {
    //     echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    // }

    if ($mail->send()) {
        // --- ส่วนที่ 1: ส่งสำเร็จ (ถึง Admin) ---
        // โค้ดเดิมของ admin ที่จะตอบกลับ AJAX (ไม่ลบ)
        $objectMail = new stdClass();
        $objectMail->RespCode = 200;
        $objectMail->RespMessage = 'semtmailsuccess';
    } else {
        $objectMail = new stdClass();
        $objectMail->RespCode = 400;
        $objectMail->RespMessage = 'semtmailerror';
    }

    echo json_encode($objectMail);
    http_response_code(200);
} else {
    http_response_code(405);
}