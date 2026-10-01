// 가로 스크롤 시 고정 헤더 위치 보정 (family 헤더는 relative라 제외)
$(window).scroll(function () {
    var $header = $('#header');
    if ($header.css('position') === 'fixed') {
        $header.css({ left: -$(window).scrollLeft() });
    }
});

// SHARE 버튼: 현재 페이지 주소 복사
$(document).on('click', '#header .btn.share', function (e) {
    e.preventDefault();
    var url = location.href;

    function done() {
        alert('페이지 주소가 복사되었습니다.');
    }
    function fallbackCopy() {
        var $tmp = $('<textarea>').val(url).css({ position: 'fixed', opacity: 0 }).appendTo('body');
        $tmp[0].select();
        document.execCommand('copy');
        $tmp.remove();
        done();
    }

    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(url).then(done, fallbackCopy);
    } else {
        fallbackCopy();
    }
});
