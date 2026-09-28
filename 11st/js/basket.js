// 장바구니 (basket.html, coupon_popup.html)
$(function () {
  // 쿠폰변경: 쿠폰 적용 팝업 열기
  $('.coupon_btn').on('click', function () {
    window.open('./coupon_popup.html', 'coupon_popup', 'top=0,left=0,width=861,height=766');
  });

  // 쿠폰 팝업: 쿠폰적용 후 창 닫기
  $('.popup_btn_wrap .popup_btn').on('click', function () {
    window.close();
  });
});
