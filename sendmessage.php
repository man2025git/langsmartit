<?php

//Import PHPMailer classes into the global namespace
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
// require("/xampp/htdocs/langit/vendor/autoload.php"); // ใช้งานใน xampp
require(__DIR__ . "/vendor/autoload.php"); // ใช้งานที่ host render
// require 'vendor/autoload.php'; // ใช้งานที่ host InfinityFree
header('Content-Type: application/json');

// 1. กำหนดค่าเริ่มต้นของ Object ที่จะส่งกลับ
$objectMail = new stdClass();

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

if (isset($_REQUEST['Emailaddress'])) {
    
    // ดึงข้อมูลจาก AJAX
    $Namemail = $_REQUEST['Namemail'];
    $Phonemail = $_REQUEST['Phonemail'];
    $Emailaddress = $_REQUEST['Emailaddress'];
    $Messagemail = $_REQUEST['Messagemail'];

    //Server settings
    $mail->SMTPDebug = 0; // เปลี่ยนเป็น 2 ถ้าต้องการเห็น Debug Output
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'professional.software.global@gmail.com'; 
    $mail->Password   = 'ieumclngvdemoqha'; 
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port       = 465;
    
    // charset
    $mail->CharSet = 'UTF-8';

    
    // --- ส่วนที่ 1: ส่งอีเมลไปยัง Admin (ฉบับแรก) ---
    
    $mail->setFrom('professional.software.global@gmail.com', 'langsmartit Contact Form');
    // ตั้งค่าผู้รับเป็น Admin หลัก พร้อมระบุชื่อที่ชัดเจน
    $mail->addAddress('professional.software.global@gmail.com', 'Langsmartit Admin');

    // Content (Email ไปยัง Admin)
    $mail->isHTML(true);
    $mail->Subject = 'Customer sends message';

    $email_template = "
        <html>
        <body style='font-family: Arial, sans-serif;'>
            <h1 style='color: #007bff;'>Customer Contact</h1>
            <p>You have received a message from the Contact Mail form:</p>
            <hr style='border: 0; border-top: 1px solid #ccc;'>
            <table style='width: 100%; border-collapse: collapse;'>
                <tr><td style='padding: 5px; width: 15%;'><strong>Name:</strong></td><td style='padding: 5px;'>{$Namemail}</td></tr>
                <tr><td style='padding: 5px;'><strong>Phone:</strong></td><td style='padding: 5px;'>{$Phonemail}</td></tr>
                <tr><td style='padding: 5px;'><strong>Email:</strong></td><td style='padding: 5px;'>{$Emailaddress}</td></tr>
            </table>
            <br>
            <p><strong>Message sent by customer:</strong></p>
            <div style='border: 1px solid #eee; padding: 10px; background-color: #f9f9f9;'>
                {$Messagemail}
            </div>
        </body>
        </html>
    ";

    $mail->Body    = $email_template;
    
    
    // ตรวจสอบการส่งอีเมล Admin ฉบับแรก
    if ($mail->send()) {
        
        // --- ส่วนที่ 2: ส่งอีเมลตอบกลับอัตโนมัติ (ถึง Customer) ---
        try {
            // 1. เคลียร์ผู้รับเดิม (Admin) และตั้งค่าใหม่
            $mail->ClearAllRecipients(); 
            
            // 2. ตั้งค่าผู้รับเป็น Email ของลูกค้าที่กรอกเข้ามา
            $mail->addAddress($Emailaddress, $Namemail);

            // 3. กำหนด Subject และ Body ใหม่ (ข้อความตอบกลับเป็นภาษาอังกฤษเท่านั้น)
            $mail->Subject = 'Thank you for contacting langsmartit! - We have received your message'; 
            
            $reply_body = "
                <html>
                <body style='font-family: Arial, sans-serif; line-height: 1.6;'>
                    <h2 style='color: #4CAF50;'>Dear Khun {$Namemail},</h2>
                    
                    <p>Thank you for your interest and for contacting us. The **langsmartit** team has successfully received your message.</p>
                    <p>We will review your message and will get back to you within **48 business hours**.</p>
                    
                    <hr style='border: 0; border-top: 1px solid #eee;'>
                    
                    <p style='font-size: 14px; color: #555;'><strong>Details of your submitted message:</strong></p>
                    <ul style='list-style-type: none; padding: 0;'>
                            <li><strong>Name:</strong> {$Namemail}</li>
                            <li><strong>Phone:</strong> {$Phonemail}</li>
                            <li><strong>Email:</strong> {$Emailaddress}</li>
                            <li><strong>Message:</strong> {$Messagemail}</li>
                        </ul>
                    
                    <p>Sincerely,</p>
                    <p>The langsmartit Team</p>
                </body>
                </html>
            ";

            $mail->Body = $reply_body;
            
            // 4. ส่งอีเมลตอบกลับ (ใช้ $mail->send() อีกครั้ง)
            $mail->send();

        } catch (Exception $e) {
            // หาก Auto-Reply ล้มเหลว เราจะไม่ส่ง Error กลับไปที่ AJAX เพราะ Admin Mail ถูกส่งไปแล้ว
            // สามารถเพิ่มโค้ดสำหรับ Log error ไว้ตรวจสอบภายหลังได้ที่นี่
        }

        // --- ส่วนที่ 3: ตอบกลับ AJAX (แจ้ง Success) ---
        $objectMail->RespCode = 200;
        $objectMail->RespMessage = 'semtmailsuccess';

    } else {
        // Error ถ้าส่ง Admin Mail ล้มเหลว
        $objectMail->RespCode = 500;
        $objectMail->RespMessage = "Mailer Error: {$mail->ErrorInfo}";
    }
} else {
    // Error ถ้าไม่มีการส่งค่า Emailaddress มา
    $objectMail->RespCode = 400;
    $objectMail->RespMessage = 'Invalid Request';
}

echo json_encode($objectMail);

?>