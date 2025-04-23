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
