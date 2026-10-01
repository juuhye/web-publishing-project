$(function () {
    // visual_swiper
    new Swiper('.visual_swiper', {
        loop: true,
        speed: 1000,
        autoplay: { delay: 4000 },
        allowTouchMove: false,
        direction: 'vertical',
    });

    // brand list scroll event : brand_company 영역이 보이면 배경 애니메이션 실행
    $(window).scroll(function () {
        var visualHeight = $('.visual').outerHeight(),
            listHeight = $('.brand_list').outerHeight(),
            scTop = $(window).scrollTop();

        if (scTop < visualHeight - 700 || scTop > visualHeight + listHeight - 500) {
            $('.brand_company .brand_bg').removeClass('on');
        } else if (scTop > visualHeight - 500) {
            $('.brand_company .brand_bg').addClass('on');
        }
    }).trigger('scroll'); // 새로고침으로 중간 위치에서 시작해도 바로 적용

    // brand list mouse event
    $('.brand_list li.hover_item').on({
        mouseenter: function () {
            $(this).children('.brand_info').addClass('on');
        },
        mouseleave: function () {
            $(this).children('.brand_info').removeClass('on');
        },
    });

    // sns_swiper
    new Swiper('.sns_swiper', {
        slidesPerView: 3,
        loop: true,
        speed: 1000,
        autoplay: { delay: 1000 },
    });
});
