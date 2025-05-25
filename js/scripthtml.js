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

document.addEventListener('DOMContentLoaded', function () {
    const copyButtons = document.querySelectorAll('.copy-button');

    copyButtons.forEach(button => {
        button.addEventListener('click', function () {
            const codeBlock = this.parentNode.nextElementSibling.querySelector('code');
            const codeText = codeBlock.textContent;

            navigator.clipboard.writeText(codeText)
                .then(() => {
                    alert('คัดลอกโค้ดแล้ว!');
                })
                .catch(err => {
                    console.error('ไม่สามารถคัดลอกโค้ดได้: ', err);
                });
        });
    });
});