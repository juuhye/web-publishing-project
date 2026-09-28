// 11번가 채용 사이트 모바일 (careers_mobile/*.html)
$(function () {
  // GNB 열기/닫기
  $('.menu_btn').on('click', function () {
    $('.gnb_wrap').show();
  });
  $('.close_btn').on('click', function () {
    $('.gnb_wrap').hide();
  });

  // GNB 하위 메뉴 아코디언 (현재 페이지가 속한 메뉴는 펼친 상태로 시작)
  $('.sub_list > ul').hide();
  $('.sub_list.active > ul').show();

  $('.sub_list').on('click', function () {
    var isOpen = $(this).hasClass('active');
    $(this).toggleClass('active', !isOpen).children('ul')[isOpen ? 'slideUp' : 'slideDown'](300);
  });

  // 콘텐츠 탭 (인사제도, 직무소개)
  $('.tab_list > li').on('click', function () {
    var index = $(this).index();
    $(this).addClass('on').siblings().removeClass('on');
    $('.career_info_wrap01').removeClass('on').eq(index).addClass('on');
  });
});
