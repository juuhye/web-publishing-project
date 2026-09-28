// 공통: 더미 링크(href="#") 클릭 시 페이지 상단으로 튀지 않도록 기본 동작만 막음
// jQuery를 쓰지 않는 페이지에서도 동작하도록 바닐라 JS로 작성
document.addEventListener('click', function (e) {
  var link = e.target.closest('a[href="#"]');
  if (link) e.preventDefault();
});
