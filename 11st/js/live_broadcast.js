// 라이브 방송 등록/수정 (live_register.html, live_edit.html)
$(function () {
  // ON/OFF 토글 스위치
  $('.tbl_btn_wrap').on('click', function () {
    var isOff = $(this).toggleClass('off').hasClass('off');
    $(this).attr({ title: isOff ? '켜기' : '끄기', 'aria-pressed': !isOff });
    $(this).children('.tbl_btn_txt').text(isOff ? 'OFF' : 'ON');
  });
});
