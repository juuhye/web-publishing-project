document.addEventListener("DOMContentLoaded", function(){
  scrollHeader();
  modalEvt();
});

// 앵커 이동은 css(html {scroll-behavior: smooth})로 처리

function scrollHeader(){
  let ticking = false; // rAF 중복 실행 방지
  let scrollPosition = 0; //스크롤 위치
  const delta = 5; // 스크롤 감지 시작 위치
  const header = document.querySelector('.header') // scroll element
  const headerH = header.offsetHeight;

  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      scrollCheck();
      ticking = false;
    });
  }, { passive: true });

  function scrollCheck() {
    var currentScrollTop = window.scrollY;
    if (Math.abs(scrollPosition - currentScrollTop) <= delta) {
      return;
    }
    if (currentScrollTop > scrollPosition && currentScrollTop > headerH) {
      header.classList.remove('scroll');
    } else if (currentScrollTop <= headerH) {
      header.classList.remove('fixed');
    } else {
      if (currentScrollTop + window.innerHeight < document.body.offsetHeight) {
        header.classList.add('scroll');
        header.classList.add('fixed');
      }
    }
    scrollPosition = currentScrollTop;
  }
}


function modalEvt(){
  const openBtns = document.querySelectorAll('.js-modal-open');
  const modal = document.querySelector('.modal')
  const modalFilter = modal.querySelector('.filter')
  const modalClose = modal.querySelector('.close_btn');
  let lastFocus = null;

  function openModal(e){
    e.preventDefault();
    lastFocus = e.currentTarget;
    modal.classList.add('show-modal');
    document.body.style.overflow = "hidden";
    modalClose.focus();
  }

  function closeModal(e){
    if (e) e.preventDefault();
    modal.classList.remove('show-modal');
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }

  openBtns.forEach(function(btn){
    btn.addEventListener('click', openModal);
  });
  modalClose.addEventListener('click', closeModal);
  modalFilter.addEventListener('click', closeModal);
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape' && modal.classList.contains('show-modal')) closeModal();
  });
}


//aos script
AOS.init({
  duration: 1300,
});
