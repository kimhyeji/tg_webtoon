$(document).ready(function () {
    var swiper = new Swiper(".mySwiper", {
        loop: true,
        slidesPerView: "auto",
        centeredSlides: true,
        spaceBetween: 0,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },
        breakpoints: {
            1369: {
                slidesPerView: "auto",
                spaceBetween: 0
            },
            768: {
                slidesPerView: "auto",
                spaceBetween: 0
            },
            100: {
                slidesPerView: "auto",
                spaceBetween: 0
            }
        },
        on: {
            init: () => {
                setTimeout(() => centerActiveSlide(), 50);
            },
            slideChangeTransitionStart: () => {
                centerActiveSlide();
            }
        }
    });

    function centerActiveSlide() {
        const swiperEl = document.querySelector(".mySwiper");
        const wrapperEl = swiperEl.querySelector(".swiper-wrapper");
        const activeSlide = swiperEl.querySelector(".swiper-slide-active");

        if (!activeSlide) return;

        const swiperRect = swiperEl.getBoundingClientRect();
        const activeRect = activeSlide.getBoundingClientRect();

        const currentTranslate = getCurrentTranslate(wrapperEl);
        const diff =
            swiperRect.width / 2 - (activeRect.left + activeRect.width / 2);
        const newTranslate = currentTranslate + diff;

        wrapperEl.style.transition =
            "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
        wrapperEl.style.transform = `translateX(${newTranslate}px)`;
    }

    function getCurrentTranslate(element) {
        const style = window.getComputedStyle(element);
        const matrix = new DOMMatrixReadOnly(style.transform);
        return matrix.m41;
    }

    $("header .menu > ul > li").mouseenter(function () {
        $(this).find(".sub").stop().slideDown().addClass("active");
    });
    $("header .menu > ul > li").mouseleave(function () {
        $(this).find(".sub").stop().slideUp().removeClass("active");
    });

    var swiper = new Swiper(".mySwiper-2", {
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },
        slidesPerView: "auto",
        on: {
            slideChange: function () {
                if (this.activeIndex > 0) {
                    document
                        .querySelector(".swiper-button-prev")
                        .classList.add("active");
                } else {
                    document
                        .querySelector(".swiper-button-prev")
                        .classList.remove("active");
                }
            }
        }
    });

    // 상단 스크롤 시작
    let maxHeight = 1380;
    let minHeight = 810;
    let maxWidth = 1920;
    let minWidth = 1440;

    let scrolledOnce = false;
    let lastScrollTop = 0;
    const shrinkScrollRange = 600; // 줄어드는 데 사용할 스크롤 거리

    $(window).on("scroll", function () {
        let scrollY = $(window).scrollTop();
        let $videoImage = $(".video-image");
        let $text = $(".video-image > .text-box");
        let $textbox = $(".first > .text-box");

        let videoTop = $videoImage.offset().top;
        let isScrollingDown = scrollY > lastScrollTop;
        let isScrollingUp = scrollY < lastScrollTop;

        // opacity 처리
        if (scrollY > 10) {
            $textbox.css("opacity", "0");
            $text.css("opacity", "1");
        } else {
            $textbox.css("opacity", "1");
            $text.css("opacity", "0");
            scrolledOnce = false;
        }

        // ✅ 아래로 스크롤 중 & 아직 커지지 않았을 때 → 한 번만 커지기
        if (isScrollingDown && !scrolledOnce) {
            $videoImage.stop().animate(
                {
                    width: `${maxWidth}px`,
                    height: `${maxHeight}px`
                },
                200
            );

            $("html, body").stop().animate(
                {
                    scrollTop: $videoImage.offset().top
                },
                200
            );

            scrolledOnce = true;
        }

        // ✅ 위로 스크롤 중 & 영상 상단이 화면 상단에 닿았을 때부터 부드럽게 줄이기
        if (isScrollingUp && scrolledOnce && scrollY < videoTop) {
            let shrinkAmount = videoTop - scrollY;
            let ratio = 1 - shrinkAmount / shrinkScrollRange;
            ratio = Math.min(Math.max(ratio, 0), 1); // 0 ~ 1 사이 제한

            let newWidth = minWidth + (maxWidth - minWidth) * ratio;
            let newHeight = minHeight + (maxHeight - minHeight) * ratio;

            $videoImage.css({
                width: `${newWidth}px`,
                height: `${newHeight}px`
            });

            if (ratio <= 0) {
                scrolledOnce = false;
            }
        }

        lastScrollTop = scrollY;
    });
    // 상단 스크롤 끝
    

    let lastScrollTop1 = 0;
    window.addEventListener("scroll", function () {
        let currentScroll = window.scrollY;
        let spanElement = document.querySelector(".firth > p > span");

        if (currentScroll > lastScrollTop1) {
            // 스크롤 내릴 때
            spanElement.style.color = "rgb(0, 0, 0)";
        } else {
            // 스크롤 올릴 때
            spanElement.style.color = "rgb(153, 153, 153)";
        }
        lastScrollTop1 = currentScroll;
    });

    function animateCounter(
        id,
        start,
        end,
        step,
        suffix,
        duration,
        allowDecimal = false
    ) {
        let current = start;
        let increment = (end - start) / (duration * (1000 / 60));
        let element = document.getElementById(id);

        function updateCounter() {
            current += increment;
            if (current >= end) {
                current = end;
            }

            let displayValue =
                allowDecimal && current < end
                    ? current.toFixed(1)
                    : Math.round(current);
            element.innerText = displayValue + suffix;

            if (current < end) {
                requestAnimationFrame(updateCounter);
            }
        }

        updateCounter();
    }

    let isAnimated = false;

    $(window).on("scroll", function () {
        const $section = $(".number");
        const sectionTop = $section.offset().top;
        const scrollTop = $(window).scrollTop();
        const windowHeight = $(window).height();

        if (!isAnimated && scrollTop + windowHeight > sectionTop + 100) {
            animateCounter("counter1", 0, 24, 1.2, "M+", 10, true);
            animateCounter("counter2", 0, 166, 3, "M", 10);
            animateCounter("counter3", 0, 900, 18, "+", 10);
            isAnimated = true;
        }
    });

    window.addEventListener("scroll", function () {
        if (window.scrollY > 30 && window.scrollY < 1300) {
            document.body.classList.add("scrolled");
            document.body.classList.remove("blured");
        } else {
            document.body.classList.remove("scrolled");
            document.body.classList.add("blured");
        }
    });

    $("header .icon-box").click(function () {
        $("header.container").addClass("active");
        $("body").css("overflow", "hidden"); // 스크롤 없애기
    });
    $("header.container .close-btn").click(function () {
        $("header.container").removeClass("active");
        $("body").css("overflow", ""); // 스크롤 다시 활성화
    });

    $(".menu-toggle").click(function (e) {
        e.preventDefault();

        let $submenu = $(this).next(".submenu");
        let $icon = $(this).find(".icon1");

        // 2차 메뉴를 토글하면, 1차 메뉴의 위치 조정
        $submenu.slideToggle(300, function () {
            let submenuHeight = $submenu.is(":visible")
                ? $submenu.outerHeight()
                : 0;
            $(this)
                .closest("li")
                .css("margin-bottom", submenuHeight + "px");
        });

        // 아이콘 회전
        $icon.toggleClass("rotate");
    });
    AOS.init();
});
