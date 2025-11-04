$(".menuopen").addClass("active");

$(function () {
    $(".navbartogger").on("click", function () {
        if ($(".menuopen").hasClass("active")) {
            $(".menuopen").removeClass("active");
            $(".menuclose").addClass("active");
            $(".navbarmenu ul").addClass("active");
            // $(".about_container").addClass("active");
            $(".header_menu").addClass("active");
          } 
          else {
            $(".menuopen").addClass("active");
            $(".menuclose").removeClass("active");
            $(".navbarmenu ul").removeClass("active");
            // $(".about_container").removeClass("active");
            $(".header_menu").removeClass("active");
        }
    });
});

// validate email register
function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
// validate name register
function validateName(name) {
  const regName =
    /^(?:((([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-.\s])){1,}(['’,\-\.]){0,1}){2,}(([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-. ]))*(([ ]+){0,1}(((([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-\.\s])){1,})(['’\-,\.]){0,1}){2,}((([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-\.\s])){2,})?)*)$/;
  return regName.test(name);
}
function validatePhone(phone) {
  // Regex pattern for common phone number formats
  const patt = /^(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/;
  return patt.test(phone);
}

function contactmail() {
  let Namemail = $("#Namemail").val();
  let Phonemail = $("#Phonemail").val();
  let Emailaddress = $("#Emailaddress").val();
  let Messagemail = $("#Messagemail").val();

  // 1. ตรวจสอบ Email ว่าง
  if (Emailaddress == "") {
    alert("Please enter your email address.");
    return; // <-- หยุดฟังก์ชันทันที
  } 
  
  // 2. ตรวจสอบ Email รูปแบบผิด (ถ้า Email ไม่ว่าง)
  if (!validateEmail(Emailaddress.trim())) {
    alert("Invalid Email , Ex.. professional.software.global@gmail.com");
    return; // <-- หยุดฟังก์ชันทันที
  }

  // 3. ตรวจสอบ Name ว่าง
  if (Namemail == "") {
    alert("Please fill in your first and last name.");
    return; // <-- หยุดฟังก์ชันทันที
  } 
  
  // 4. ตรวจสอบ Phone ว่าง
  if (Phonemail == "") {
    alert("Please enter your phone number.");
    return; // <-- หยุดฟังก์ชันทันที
  } 
  
  // 5. ตรวจสอบ Message ว่าง
  if (Messagemail == "") {
    alert("Please fill in the message.");
    return; // <-- หยุดฟังก์ชันทันที
  } 
  
  // 6. ถ้าผ่านทั้งหมด ให้ส่ง Ajax
  // console.log("send email");
  $.ajax({
    method: "post",
    url: "sendmessage.php",
    data: {
      Namemail: Namemail,
      Phonemail: Phonemail,
      Emailaddress: Emailaddress,
      Messagemail: Messagemail,
    },
    success: (response) => {
      //   console.log('good',response);
      alert("Message sent successfully");
    },
    error: function (err) {
      console.log("bad", err);
    },
  });
}