$('#fullpage').fullpage({
    licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
    verticalCentered: true,
    scrollOverflow: false,
    recordHistory: false, // 섹션 이동을 브라우저 뒤로가기 기록에 남기지 않음
    responsiveWidth: 1520, // 화면 너비가 1520px 미만이면 일반 스크롤로 전환
    anchors: ['page01', 'page02', 'page03', 'page04', 'page05', 'page06', 'page07', 'page08', 'page09'],

    // 섹션에 들어오면 이미지 등장, 섹션을 벗어나면 초기 상태로 되돌림
    afterLoad: function (origin, destination) {
        var from = origin ? origin.index : -1,
            to = destination.index;

        // sec02 : 인물 사진 슬라이드
        if (to === 1) {
            $('.sec02_img').css({ left: '20%', opacity: 1 });
        } else if (from === 1) {
            $('.sec02_img').css({ left: '0%', opacity: 0 });
        }

        // sec03, sec04 : 클릭 전 병 이미지로 초기화
        if (to === 2 || from === 2) {
            $('.sec03_img.before').show();
            $('.sec03_img.after').hide();
        }
        if (from === 2) {
            $('.sec03_click').css({ right: '26%', bottom: '22%' });
        }
        if (to === 3 || from === 3) {
            $('.sec04_img.before').show();
            $('.sec04_img.after').hide();
        }
        if (from === 3) {
            $('.sec04_click').css({ opacity: 1 });
        }

        // sec06 : 사진 슬라이드
        if (to === 5) {
            $('.sec06_img').css({ left: '13%', opacity: 1 });
        } else if (from === 5) {
            $('.sec06_img').css({ left: '0%', opacity: 0 });
        }

        // sec07 : 로고 확대
        if (to === 6) {
            $('.sec07_img').css({ width: '36%', opacity: 1 });
        } else if (from === 6) {
            $('.sec07_img').css({ width: '27.6%', opacity: 0 });
        }

        // sec09 : 병 3개가 아래에서 올라옴
        if (to === 8) {
            $('.sec09_img01, .sec09_img02, .sec09_img03').css({ bottom: '4%' });
        } else if (from === 8) {
            $('.sec09_img01, .sec09_img02, .sec09_img03').css({ bottom: '-100%' });
        }
    },
});

$(function () {
    // sec03 : 병 클릭 시 실제 병 이미지로 교체
    $('.sec03_img.before').click(function () {
        $('.sec03_img.after').fadeIn();
        $(this).fadeOut();
        $('.sec03_click').animate({ right: '60%', bottom: '-20%' }, 700);
    });

    // sec04 : 병 클릭 시 실제 병 이미지로 교체
    $('.sec04_img.before').click(function () {
        $('.sec04_img.after').fadeIn();
        $(this).fadeOut();
        $('.sec04_click').animate({ opacity: 0 }, 400);
    });
});
