$(function () {
    // 제품 로고에 마우스를 올리면 캔 이미지가 올라옴
    $('.product_item').on({
        mouseenter: function () {
            $(this).children('.can').stop().animate({ bottom: '0%', opacity: 1 }, 500);
        },
        mouseleave: function () {
            $(this).children('.can').stop().animate({ bottom: '-100%', opacity: 0 });
        },
    });

    // 제품 드래그 : 드래그 중에는 안내 문구 애니메이션, 놓으면 원래 자리로 돌아감
    $('.drag_item').draggable({
        start: function () {
            $('.guide_txt').addClass('on');
        },
        stop: function () {
            $('.guide_txt').removeClass('on');
        },
        zIndex: 10000,
        revert: true,
    });

    // 오른쪽 영역에 놓으면 같은 순서의 제품 팝업 노출
    $('.popup_area').droppable({
        drop: function (event, ui) {
            var index = ui.draggable.closest('li').index();
            $('.drop_guide').removeClass('on');
            $('.popup_wrap').removeClass('on').eq(index).addClass('on');
        },
    });

    // 팝업 닫기
    $('.close_btn').on('click', function (e) {
        e.preventDefault();
        $('.popup_wrap').removeClass('on');
        $('.drop_guide').addClass('on');
    });
});
