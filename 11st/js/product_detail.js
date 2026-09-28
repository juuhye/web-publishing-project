// 상품 상세 (option_selected.html, option_unselected.html)
$(function () {
  // 썸네일 갤러리: 선택된 썸네일을 메인 이미지로 표시
  var $mainImg = $('<img class="main_img">');
  $('.product_img_wrap').append($mainImg);

  function showThumb($thumbImg) {
    $mainImg.attr({ src: $thumbImg.attr('src'), alt: $thumbImg.attr('alt') });
  }
  showThumb($('.thumb_list > li.on img'));

  $('.thumb_list > li > a').on('click', function () {
    $(this).closest('li').addClass('on').siblings().removeClass('on');
    showThumb($(this).find('img'));
  });

  // 리뷰 슬라이더
  new Swiper('.review_swiper', {
    pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
    },
    navigation: {
      nextEl: '.review_next',
      prevEl: '.review_prev',
    },
  });

  // 수량 증감: 옵션마다 자기 input 값을 기준으로 계산 (0 미만 불가)
  $('.option_count .count_btn').on('click', function () {
    var $input = $(this).siblings('.count_num');
    var count = parseInt($input.val(), 10) || 0;
    count += $(this).hasClass('plus') ? 1 : -1;
    $input.val(Math.max(count, 0));
  });

  // 선택한 옵션 삭제
  $('.cencal_btn').on('click', function () {
    $(this).closest('li').remove();
  });

  // 카테고리 경로: 선택한 값을 표시 텍스트에 반영
  $('.category_select').on('change', function () {
    $(this).siblings('.category_selected').text($(this).find('option:selected').text());
  });
});
