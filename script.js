$(document).ready(function () {
    var swiper = new Swiper(".mySwiper", {
        loop: true, // loop 위치 고정
        slidesPerView: "auto",
        spaceBetween: 130,
        centeredSlides: true,
        centeredSlidesBounds: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },
        breakpoints: {
            1369: {
                slidesPerView: "auto",
                spaceBetween: 130,
                centeredSlides: true
            },
            1084: {
                slidesPerView: 3,
                spaceBetween: 100,
                centeredSlides: true
            },
            1000: {
                slidesPerView: 3,
                spaceBetween: 20,
                centeredSlides: true
            },
            100: {
                slidesPerView: 3,
                spaceBetween: 20,
                centeredSlides: true
            }
        },
    });

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
    let scrolledOnce = false; // 스크롤 여부를 저장하는 변수

    window.addEventListener("scroll", () => {
        let scrollY = window.scrollY;
        let videoImage = document.querySelector(".video-image");
        let text = document.querySelector(".video-image > .text-box");
        let textbox = document.querySelector(".first > .text-box");

        if (scrollY > 10) {
            videoImage.style.width = "100%";
            videoImage.style.height = "1200px";
            textbox.style.opacity = "0";

            text.style.opacity = "1";

            // 처음 한 번만 실행
            if (!scrolledOnce) {
                videoImage.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
                scrolledOnce = true;
            }
        } else {
            videoImage.style.width = "1440px";
            videoImage.style.height = "810px";
            textbox.style.opacity = "1";
            text.style.opacity = "0";

            // 스크롤을 다시 맨 위로 올리면 변수 초기화
            scrolledOnce = false;
        }
    });

    let lastScrollTop = 0;
    window.addEventListener("scroll", function () {
        let currentScroll = window.scrollY;
        let spanElement = document.querySelector(".firth > p > span");

        if (currentScroll > lastScrollTop) {
            // 스크롤 내릴 때
            spanElement.style.color = "rgb(0, 0, 0)";
        } else {
            // 스크롤 올릴 때
            spanElement.style.color = "rgb(153, 153, 153)";
        }
        lastScrollTop = currentScroll;
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
