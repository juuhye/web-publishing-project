$(function() {
  //quick
  var aside = $(".aside");
  if (aside.length) {
    var asidePos = parseInt(aside.css("top"));
    var asideBtn = $(".btn-aside");

    $(window).on("scroll", function(){
      var scT = $(window).scrollTop();
      var visualH = $(".secSubVisual").height();
      var conH = $(".container").height();
      var asideH = aside.height();

      if(visualH > scT){
        aside.stop().animate({"top": asidePos + "px"}, 400);
      }else if(conH - asideH < scT){
        aside.stop().animate({"top": conH - asideH - 100 + "px"}, 400);
      }else{
        aside.stop().animate({"top": scT + 40 + "px"}, 400);
      }
    });

    asideBtn.on("click", function(e){
      e.preventDefault();
      $("html, body").stop().animate({ scrollTop: 0 }, "slow");
    });
  }

  //swiper
  if ($(".swiper-visual").length) {
    new Swiper(".swiper-visual", {
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-visual .swiper-pagination",
        clickable: true,
      },
    });
  }

  if ($(".swiper-gallery").length) {
    new Swiper(".swiper-gallery", {
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-gallery .swiper-pagination",
        clickable: true,
      },
    });
  }
});
