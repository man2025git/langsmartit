/**
 * scriptcontact.js
 * Code for Navigation Toggle, Form Validation, and AJAX Submission.
 */

// ตั้งค่าเริ่มต้น: ตรวจสอบสถานะเมนูเริ่มต้น
$(".menuopen").addClass("active");

$(function () {
    // ----------------------------------------------------------------------
    // 1. Navigation Toggler: จัดการการแสดงผลของเมนู
    // ----------------------------------------------------------------------
    $(".navbartogger").on("click", function () {
        if ($(".menuopen").hasClass("active")) {
            $(".menuopen").removeClass("active");
            $(".menuclose").addClass("active");
            $(".navbarmenu ul").addClass("active");
            // $(".about_container").addClass("active"); <-- โค้ดเดิม
            $(".header_menu").addClass("active");
          } 
          else {
            $(".menuopen").addClass("active");
            $(".menuclose").removeClass("active");
            $(".navbarmenu ul").removeClass("active");
            // $(".about_container").removeClass("active"); <-- โค้ดเดิม
            $(".header_menu").removeClass("active");
        }
    });
});

// ----------------------------------------------------------------------
// 2. Validation Functions: ฟังก์ชันตรวจสอบรูปแบบข้อมูล
// ----------------------------------------------------------------------

// ตรวจสอบ Email
function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// ตรวจสอบชื่อ
function validateName(name) {
  const regName =
    /^(?:((([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-.\s])){1,}(['’,\-\.]){0,1}){2,}(([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-. ]))*(([ ]+){0,1}(((([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-\.\s])){1,})(['’\-,\.]){0,1}){2,}((([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-\.\s])){2,})?)*)$/;
  return regName.test(name);
}

// ตรวจสอบเบอร์โทรศัพท์
function validatePhone(phone) {
  const patt = /^(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/;
  return patt.test(phone);
}

// ----------------------------------------------------------------------
// 3. Contact Mail Submission: ฟังก์ชันหลักในการส่งอีเมล
// ----------------------------------------------------------------------
function contactmail() {
  let Namemail = $("#Namemail").val();
  let Phonemail = $("#Phonemail").val();
  let Emailaddress = $("#Emailaddress").val();
  let Messagemail = $("#Messagemail").val();
  
  // กำหนด ID ปุ่ม (สมมติว่าเป็น #submitBtn หรือปุ่มที่เรียกฟังก์ชันนี้)
  let $submitBtn = $("button:contains('SEND mail'), #submitBtn"); 

  // 3.1. ตรวจสอบข้อมูลทั้งหมด (Validation)
  if (Emailaddress == "") { alert("Please enter your email address."); return; } 
  if (!validateEmail(Emailaddress.trim())) { alert("Invalid Email , Ex.. professional.software.global@gmail.com"); return; }
  if (Namemail == "") { alert("Please fill in your first and last name."); return; } 
  if (Phonemail == "") { alert("Please enter your phone number."); return; } 
  if (Messagemail == "") { alert("Please fill in the message."); return; } 
  
  // 3.2. ส่ง Ajax
  $submitBtn.prop("disabled", true).text("SENDING...");

  $.ajax({
    method: "post",
    url: "sendmessage.php",
    data: {
      Namemail: Namemail,
      Phonemail: Phonemail,
      Emailaddress: Emailaddress,
      Messagemail: Messagemail,
    },
    dataType: 'json', 
    
    // 3.3. การจัดการเมื่อ AJAX สำเร็จ (รับ JSON Response)
    success: (response) => {
      
      if (response.RespCode == 200) {
        alert("Message sent successfully! Thank you for contacting us.");
        // ล้างข้อมูลในฟอร์ม (สมมติว่าฟอร์มมี ID เป็น #contactForm)
        $("#contactForm")[0].reset(); 
      } else {
        // *** กรณี Error จาก PHP (Non-200 RespCode) ***
        let errorMessage = "Error sending message: " + (response.RespMessage || 'Unknown PHP Error');
        
        // เพิ่มข้อความแนะนำเป็นภาษาอังกฤษ (ตามที่ต้องการ)
        errorMessage += "\n\n(Hint: If deployed on Render Static Site, email sending won't work. Please contact us directly at: professional.software.global@gmail.com)";
        
        alert(errorMessage);
      }
    },
    
    // 3.4. การจัดการเมื่อเกิดข้อผิดพลาดในการเชื่อมต่อ (Network Error)
    error: function (err) {
      console.error("AJAX Server Error:", err);
      
      let networkErrorMsg = "Server Error: Cannot connect to the mail server. (Hint: If deployed on Render Static Site, email sending won't work)";
      networkErrorMsg += "\n\nPlease contact us directly at: professional.software.global@gmail.com";
      
      alert(networkErrorMsg); 
    },
    
    // 3.5. การจัดการเมื่อ AJAX เสร็จสมบูรณ์
    complete: function() {
        $submitBtn.prop("disabled", false).text("SEND mail");
    }
  });
}