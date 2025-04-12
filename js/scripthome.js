$(".menuopen").addClass("active");

$(function () {
    $(".navbartogger").on("click", function () {
        if ($(".menuopen").hasClass("active")) {
            $(".menuopen").removeClass("active");
            $(".menuclose").addClass("active");
            $(".navbarmenu").addClass("active");
            $(".home").addClass("active");
          } 
          else {
            $(".menuopen").addClass("active");
            $(".menuclose").removeClass("active");
            $(".navbarmenu").removeClass("active");
            $(".home").removeClass("active");
        }
    });
});
