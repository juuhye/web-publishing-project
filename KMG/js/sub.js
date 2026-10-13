window.addEventListener("load", () => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    function topFixedHeaderAnimated(offset = 30, threshold = 5) {
        const langButton = document.querySelector('.widget_lang .widget_btn');
        const langList = document.querySelector('.widget_lang .lang_list');
        const header = document.querySelector(".header");
        const nav = document.querySelector(".topMenu");
        const targetSections = document.querySelectorAll(".dark-section");
        const closeBtn = document.querySelector(".preparing_modal .close_btn");
        const langModal = document.querySelector(".lang_modal");
        let headerHeight = header.offsetHeight;
        let lastScrollY = window.scrollY;
        let wasScrollingDown = null;
        let ticking = false;

        // header / nav 에 동일한 클래스 토글
        const targets = [header, nav].filter(Boolean);
        const addClass = (...c) => targets.forEach(el => el.classList.add(...c));
        const removeClass = (...c) => targets.forEach(el => el.classList.remove(...c));

        targets.forEach(el => el.style.transition = "none");
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                targets.forEach(el => el.style.transition = "");
            });
        });

        function updateHeader(scrollY) {
            headerHeight = header.offsetHeight;

            if (targetSections.length > 0) {
                let isIntersectingAny = false;

                for (const section of targetSections) {
                    const rect = section.getBoundingClientRect();
                    if (rect.top <= headerHeight && rect.bottom > headerHeight) {
                        isIntersectingAny = true;
                        break;
                    }
                }

                if (isIntersectingAny) {
                    addClass("header-bg-dark");
                    if (langModal) langModal.classList.add("bg-dark");
                    if (closeBtn) closeBtn.classList.add("bg-dark");
                } else {
                    removeClass("header-bg-dark");
                    if (langModal) langModal.classList.remove("bg-dark");
                    if (closeBtn) closeBtn.classList.remove("bg-dark");
                }
            }

            const delta = scrollY - lastScrollY;
            const scrollingDown = delta > threshold;
            const scrollingUp = delta < -threshold;

            if (scrollY > headerHeight) {
                addClass("top-fixed");

                if (scrollingDown && wasScrollingDown !== true) {
                    addClass("scroll-down");
                    removeClass("scroll-up");
                    if (langList) langList.classList.remove("show");
                    wasScrollingDown = true;
                }
                else if (scrollingUp && wasScrollingDown !== false) {
                    removeClass("scroll-down");
                    addClass("scroll-up");
                    wasScrollingDown = false;
                }
            }
            else {
                removeClass("scroll-up", "scroll-down", "top-fixed");
                wasScrollingDown = null;
            }

            lastScrollY = scrollY;
        }
        function onScroll() {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(() => {
                    updateHeader(window.scrollY);
                    ticking = false;
                });
            }
        }

        if (langButton && langList) {
            langButton.addEventListener('click', function (event) {
                event.preventDefault();
                langList.classList.toggle('show');
            });
            // 바깥 클릭 시 언어 목록 닫기
            document.addEventListener('click', e => {
                if (!e.target.closest('.widget_lang')) langList.classList.remove('show');
            });
        }

        window.addEventListener("scroll", onScroll);
        updateHeader(window.scrollY);
    }
    topFixedHeaderAnimated();


    // 텍스트를 글자 단위로 분리 (스크린리더는 원문만 읽도록 처리)
    function splitTextWithBlur(el) {
        if (!el) return [];
        const text = el.textContent;
        el.setAttribute("aria-label", text.replace(/ /g, " "));
        el.innerHTML = text.split("").map(c => `
    <span class="char" aria-hidden="true">
      ${c}
      <span class="char-blur">${c}</span>
    </span>`).join("");
        return el.querySelectorAll(".char");
    }

    const topLines = document.querySelectorAll(".line-top");
    const bottomLines = document.querySelectorAll(".line-bottom");
    const topExtras = document.querySelectorAll(".desc_txt");
    const bottomExtras = document.querySelectorAll(".sub_txt");

    // topLines 기준으로 같은 순서의 bottom / extra 요소를 묶어서 애니메이션
    topLines.forEach((elTop, i) => {
        const elBottom = bottomLines[i];
        const elTopExtra = topExtras[i];
        const elBottomExtra = bottomExtras[i];

        const topChars = splitTextWithBlur(elTop);
        const bottomChars = elBottom ? splitTextWithBlur(elBottom) : [];

        // .sec_visual이 감싸고 있다면 그것을 트리거로, 아니라면 top 라인 자체를 트리거로 사용
        const triggerEl = elTop.closest(".sec_visual") || elTop;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: triggerEl,
                start: "top 80%",
                toggleActions: "restart reset restart reset"
            }
        });

        // Top Line
        tl.fromTo(elTop,
            { opacity: 0, x: "30%" },
            { opacity: 1, x: "0%", duration: 3, ease: "power1.out" },
            "<"
        ).fromTo(topChars,
            { x: "-30%", letterSpacing: "0.8em" },
            { x: "0%", letterSpacing: "0em", duration: 2.3, ease: "power1.out" },
            "<"
        );

        // Bottom Line
        if (elBottom) {
            tl.fromTo(elBottom,
                { opacity: 0, x: "-30%" },
                { opacity: 1, x: "0%", duration: 3, ease: "power1.out" },
                "<"
            ).fromTo(bottomChars,
                { x: "30%", letterSpacing: "0.8em" },
                { x: "0%", letterSpacing: "0em", duration: 2.3, ease: "power1.out" },
                "<"
            );
        }

        // Top Extra (.desc_txt)
        if (elTopExtra) {
            tl.fromTo(elTopExtra,
                { opacity: 0, letterSpacing: "0.1em" },
                { opacity: 1, letterSpacing: "0em", duration: 2.3, ease: "power1.out" },
                "<"
            );
        }

        // Bottom Extra (.sub_txt)
        if (elBottomExtra) {
            tl.fromTo(elBottomExtra,
                { opacity: 0, letterSpacing: "0.1em" },
                { opacity: 1, letterSpacing: "0em", duration: 2.3, ease: "power1.out" },
                "<"
            );
        }
    });


    document.querySelectorAll('.topMenu_item a').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            if (href.startsWith('#')) {
                e.preventDefault();

                gsap.to(window, {
                    duration: 1,
                    scrollTo: href,
                    ease: "power3.out"
                });
            }
        });
    });


    // 열린 모달이 하나도 없을 때만 body 스크롤 잠금 해제
    function unlockBodyScroll() {
        if (!document.querySelector('.modal.on')) {
            document.body.style.overflowY = "auto";
        }
    }

    function setupModal(modalSelector, openButtonsSelector) {
        const modal = document.querySelector(modalSelector);
        if (!modal) {
            return;
        }

        const openButtons = document.querySelectorAll(openButtonsSelector);
        const closeButton = modal.querySelector('.close_btn');
        const filter = modal.querySelector('.filter');
        const siteMapLink = modal.querySelectorAll('.siteMap_list a');
        const gnbLink = modal.querySelectorAll('.gnb_dep1 a');

        // 공통으로 사용하는 모달 닫기 로직 (이벤트 처리 없음)
        function removeModalClass() {
            modal.classList.remove('on');
            unlockBodyScroll();
        }

        function openModal(e) {
            e.preventDefault();
            modal.classList.add('on');
            if (modal.classList.contains("modal")) {
                document.body.style.overflowX = "hidden";
                document.body.style.overflowY = "hidden";
            }
        }

        // 닫기 버튼 / 배경 클릭 (# 이동 막음)
        function closeModal(e) {
            e.preventDefault();
            removeModalClass();
        }

        openButtons.forEach(button => {
            button.addEventListener('click', openModal);
        });

        if (closeButton) {
            closeButton.addEventListener('click', closeModal);
        }
        if (filter) {
            filter.addEventListener('click', closeModal);
        }

        // 메뉴 링크는 이동을 허용하고 모달만 닫음
        siteMapLink.forEach(link => link.addEventListener('click', removeModalClass));
        gnbLink.forEach(link => link.addEventListener('click', removeModalClass));

        // ESC 키로 닫기 (가장 위에 열린 모달만)
        document.addEventListener('keydown', e => {
            if (e.key !== 'Escape' || !modal.classList.contains('on')) return;
            const openModals = document.querySelectorAll('.modal.on, .gnb_list.on');
            if (openModals[openModals.length - 1] === modal) removeModalClass();
        });
    }

    setupModal('.preparing_modal', '.preparing_modal_btn');
    setupModal('.siteMap_modal', '.only_pc .siteMap');
    setupModal('.gnb_list', '.only_mo .siteMap');
    setupModal('.lang_modal', '.only_mo .widget_btn.lang');

    const topBtn = document.querySelector('.top_btn');
    if (topBtn) {
        topBtn.addEventListener('click', e => {
            e.preventDefault();
            gsap.to(window, { scrollTo: { y: 0 }, duration: 1, ease: "power2.inOut" });
        });
    }

    AOS.init({ duration: 1000, offset: 50, easing: 'ease-out' });
});
