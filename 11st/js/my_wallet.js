// 나의 11번가 SK pay point (sk_pay_point.html)
$(function () {
  // 포인트 받기: 받은 행은 완료 상태로 변경
  $('.down_btn').on('click', function () {
    $(this).closest('tr').addClass('success');
    $(this).text('받기완료').attr('title', 'SK pay point 다운받기완료').prop('disabled', true);
  });

  // 조회기간 탭, 페이지네이션: 클릭한 항목 활성화
  $('.term_tab > li, .pagination_tab > li').on('click', function () {
    $(this).addClass('on').siblings().removeClass('on');
  });
});
