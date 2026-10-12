var visual_swiper = new Swiper(".visual_swiper", {
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  speed: 1000,
  loop: true,
  navigation: {
    nextEl: ".visual_swiper .swiper-button-next",
    prevEl: ".visual_swiper .swiper-button-prev",
  },
  on: {
    init: function () {
      $(".visual_swiper .swiper-progress-bar").removeClass("animate");
      $(".visual_swiper .swiper-progress-bar").removeClass("active");
      $(".visual_swiper .swiper-progress-bar").eq(0).addClass("animate");
      $(".visual_swiper .swiper-progress-bar").eq(0).addClass("active");
    },
    slideChangeTransitionStart: function () {
      $(".visual_swiper .swiper-progress-bar").removeClass("animate");
      $(".visual_swiper .swiper-progress-bar").removeClass("active");
      $(".visual_swiper .swiper-progress-bar").eq(0).addClass("active");
    },
    slideChangeTransitionEnd: function () {
      $(".visual_swiper .swiper-progress-bar").eq(0).addClass("animate");
    },
  },
});


var productSwipers = [];
var swiperMode = null;

// 리사이즈마다 Swiper를 새로 만들지 않고, PC/MO 모드가 바뀔 때만 재생성
$(window).on('resize', function () {
  var mode = window.innerWidth > 1024 ? 'pc' : 'mo';
  if (mode === swiperMode) return;
  swiperMode = mode;
  productSwipers.forEach(function (swiper) {
    swiper.destroy(true, true);
  });
  productSwipers = mode === 'pc' ? mousewheelE() : moSwiperE();
}).trigger('resize');

function sec03ChangeE() {
  if (this.activeIndex == 1) {
    $('.sec_item').addClass('change')
  } else {
    $('.sec_item').removeClass('change')
  }
}

function mousewheelE() {
  var options = function (el) {
    return {
      direction: "vertical",
      speed: 600,
      mousewheel: false, // 휠은 아래 wheelE에서 직접 제어
      observer: true,
      observeParents: true,
      scrollbar: {
        el: el + " .swiper-scrollbar",
        hide: false,
      },
    };
  };
  var product_swiper_pc = new Swiper(".product_swiper01", options(".product_swiper01"));
  var product_swiper02_pc = new Swiper(".product_swiper02", options(".product_swiper02"));
  var product_swiper03_pc = new Swiper(".product_swiper03", $.extend(options(".product_swiper03"), {
    on: { slideChangeTransitionEnd: sec03ChangeE }
  }));
  return [product_swiper_pc, product_swiper02_pc, product_swiper03_pc];
}

// PC 휠 이벤트 (한 번만 바인딩)
(function wheelE() {
  var SCROLL_SPEED = 600;
  var wheelLock = false;
  var lockEnd = 0;
  var lockTimer;

  // 페이지/슬라이드 이동 중엔 휠 무시, 트랙패드 관성 휠이 끝날 때까지 잠금 유지
  function lock(duration) {
    wheelLock = true;
    lockEnd = Date.now() + duration;
    clearTimeout(lockTimer);
    lockTimer = setTimeout(function () { wheelLock = false; }, duration + 200);
  }
  function extendLock() {
    clearTimeout(lockTimer);
    lockTimer = setTimeout(function () { wheelLock = false; }, Math.max(200, lockEnd - Date.now()));
  }
  function scrollToSec(selector) {
    lock(SCROLL_SPEED);
    $(document.scrollingElement || 'html').stop().animate({ scrollTop: $(selector).offset().top + 2 }, SCROLL_SPEED);
  }

  var sections = [
    { el: '.product01_sec', idx: 0, prev: '.section_visual', next: '.product02_sec' },
    { el: '.product02_sec', idx: 1, prev: '.product01_sec', next: '.product03_sec' },
    { el: '.product03_sec', idx: 2, prev: '.product02_sec', next: '.partner_sec' },
  ];

  sections.forEach(function (sec) {
    $(sec.el).on('wheel', function (e) {
      if (swiperMode !== 'pc') return;
      e.preventDefault();
      if (wheelLock) return extendLock();

      var swiper = productSwipers[sec.idx];
      var down = e.originalEvent.deltaY > 0;
      if (down) {
        if (!swiper.isEnd) {
          lock(swiper.params.speed);
          swiper.slideNext();
        } else {
          scrollToSec(sec.next);
          swiper.slideTo(0, 0, false);
        }
      } else {
        if (!swiper.isBeginning) {
          lock(swiper.params.speed);
          swiper.slidePrev();
        } else {
          scrollToSec(sec.prev);
        }
      }
    });
  });

  $(".section_visual").on('wheel', function (e) {
    if (swiperMode !== 'pc' || e.originalEvent.deltaY <= 0) return;
    e.preventDefault();
    if (wheelLock) return extendLock();
    scrollToSec('.product01_sec');
  });
  $(".partner_sec").on('wheel', function (e) {
    if (swiperMode !== 'pc' || e.originalEvent.deltaY >= 0) return;
    e.preventDefault();
    if (wheelLock) return extendLock();
    scrollToSec('.product03_sec');
  });
})();

function moSwiperE() {
  var product_swiper = new Swiper(".product_swiper01", {
    observer: true,
    observeParents: true,
    loop: true,
    scrollbar: {
      el: ".product_swiper01 .swiper-scrollbar",
      hide: false,
    },
    navigation: {
      prevEl: ".product01_sec .swiper-button-next",
      nextEl: ".product01_sec .swiper-button-prev",
    },
  });
  var product_swiper02 = new Swiper(".product_swiper02", {
    observer: true,
    observeParents: true,
    loop: true,
    scrollbar: {
      el: ".product_swiper02 .swiper-scrollbar",
      hide: false,
    },
    navigation: {
      nextEl: ".product02_sec .swiper-button-next",
      prevEl: ".product02_sec .swiper-button-prev",
    },
  });
  var product_swiper03 = new Swiper(".product_swiper03", {
    loop: true,
    observer: true,
    observeParents: true,
    scrollbar: {
      el: ".product_swiper03 .swiper-scrollbar",
      hide: false,
    },
    navigation: {
      nextEl: ".product03_sec .swiper-button-next",
      prevEl: ".product03_sec .swiper-button-prev",
    },
    on: { slideChangeTransitionEnd: sec03ChangeE }
  });
  return [product_swiper, product_swiper02, product_swiper03];
}

// MO 스와이프 영역을 섹션 전체로 확장 (슬라이더 밖 이미지 영역에서도 좌우 스와이프)
$('.product01_sec, .product02_sec, .product03_sec').each(function (idx) {
  var startX, startY;
  this.addEventListener('touchstart', function (e) {
    if (swiperMode !== 'mo' || $(e.target).closest('.product_swiper').length) return startX = null;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }, { passive: true });
  this.addEventListener('touchend', function (e) {
    if (startX == null) return;
    var dx = e.changedTouches[0].clientX - startX;
    var dy = e.changedTouches[0].clientY - startY;
    startX = null;
    // 세로 스크롤과 구분: 가로 이동이 50px 이상이고 세로보다 클 때만
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0) productSwipers[idx].slideNext();
    else productSwipers[idx].slidePrev();
  }, { passive: true });
});

// MO 스크롤 이벤트 (한 번만 바인딩)
$(window).on('scroll', function () {
  if (swiperMode !== 'mo') return;
  var scroll = $(window).scrollTop();
  if (scroll > document.querySelector('.partner_sec').clientHeight) {
    productSwipers[2].slideTo(0, 500, false)
    $('.sec_item').removeClass('change')
  }
  if (scroll > document.querySelector('.product03_sec').clientHeight) {
    productSwipers[1].slideTo(0, 500, false)
  }
  if (scroll > document.querySelector('.product02_sec').clientHeight) {
    productSwipers[0].slideTo(0, 500, false)
  }
})


$(".item_head").on('click', function (e) {
  $(this).toggleClass('on')
  var itemBody = $(this).next();
  if ($(this).hasClass('on')) {
    itemBody.addClass('on')
  } else {
    itemBody.removeClass('on')
  }
  e.preventDefault();
})
