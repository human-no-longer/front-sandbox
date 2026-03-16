"use strict";

document.addEventListener("DOMContentLoaded", () => {
  function showModal() {
    const modalEl = document.querySelector(".modal");
    const overlayEl = document.querySelector(".overlay");
    const btnCloseModalEl = document.querySelector(".btn--close-modal");
    const btnsOpenModalEls = document.querySelectorAll(".btn--show-modal");

    function openModal(e) {
      e.preventDefault();
      modalEl.classList.remove("hidden");
      overlayEl.classList.remove("hidden");
    }
    function closeModal() {
      modalEl.classList.add("hidden");
      overlayEl.classList.add("hidden");
    }

    btnsOpenModalEls.forEach((item) => {
      item.addEventListener("click", openModal);
    });
    btnCloseModalEl.addEventListener("click", closeModal);
    overlayEl.addEventListener("click", closeModal);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !modalEl.classList.contains("hidden")) {
        closeModal();
      }
    });
  }

  function showCookiesMessage() {
    const cookiesMessageEl = document.createElement("div");

    cookiesMessageEl.classList.add("cookie-message");
    cookiesMessageEl.innerHTML = `
    We use cookies, by the way
    <button class="btn btn--close-cookie">Got It!</button>
  `;
    document.body.append(cookiesMessageEl);

    cookiesMessageEl.onclick = function () {
      this.remove();
    };
  }

  function scrollToSection() {
    const btnTriggerEl = document.querySelector(".btn--scroll-to");
    const sectionOneEl = document.querySelector("#section--1");

    btnTriggerEl.addEventListener("click", () => {
      /* Old way */
      /*const sectionOneCoords = sectionOneEl.getBoundingClientRect();
     window.scrollTo({
      left: sectionOneCoords.left + window.scrollX,
      top: sectionOneCoords.top + window.scrollY,
      behavior: "smooth",
    }); */

      /* Modern way */
      sectionOneEl.scrollIntoView({ behavior: "smooth" });
    });
  }

  function setPageNavigation() {
    const linksListEl = document.querySelector(".nav__links");

    linksListEl.addEventListener("click", (e) => {
      if (!e.target.matches(".nav__link")) return;
      e.preventDefault();
      const sectionId = e.target.getAttribute("href");
      document.querySelector(sectionId).scrollIntoView({ behavior: "smooth" });
    });
  }

  function setTabsComponent() {
    const tabsEls = Array.from(document.querySelectorAll(".operations__tab"));
    const tabsContainerEl = document.querySelector(
      ".operations__tab-container"
    );
    const tabsContentEls = Array.from(
      document.querySelectorAll(".operations__content")
    );

    tabsContainerEl.addEventListener("click", (e) => {
      const tabEl = e.target.closest(".operations__tab");
      if (!tabEl) return;
      tabsEls.forEach((item) =>
        item.classList.remove("operations__tab--active")
      );
      tabEl.classList.add("operations__tab--active");
      tabsContentEls.forEach((item) =>
        item.classList.remove("operations__content--active")
      );
      document
        .querySelector(`.operations__content--${tabEl.dataset.tab}`)
        .classList.add("operations__content--active");
    });
  }

  function setHeaderFadeAnimation() {
    const navEl = document.querySelector(".nav");

    function handleHover(e, opacity = "") {
      if (!e.target.classList.contains("nav__link")) return;
      const siblingsEls = Array.from(navEl.querySelectorAll(".nav__link"));
      const logoEl = navEl.querySelector(".nav__logo");
      logoEl.style.opacity = opacity;
      siblingsEls.forEach((item) => {
        item === e.target
          ? (item.style.opacity = 1)
          : (item.style.opacity = opacity);
      });
    }
    navEl.addEventListener("mouseover", (e) => handleHover(e, 0.5));
    navEl.addEventListener("mouseout", handleHover);
  }

  function setStickyNavigation() {
    const headerEl = document.querySelector(".header");
    const navEl = document.querySelector(".nav");
    const navHeight = navEl.getBoundingClientRect().height;

    function toggleStickyNav(entries) {
      const [entry] = entries;
      entry.isIntersecting
        ? navEl.classList.remove("sticky")
        : navEl.classList.add("sticky");
    }

    const headerObserver = new IntersectionObserver(toggleStickyNav, {
      root: null,
      threshold: 0, //срабатывает сразу при входе во вьюпорт - rooMargin сверху
      rootMargin: `-${navHeight}px`,
    });

    headerObserver.observe(headerEl);
  }

  function setSectionsAnimation() {
    const sectionsEls = Array.from(document.querySelectorAll(".section"));

    function revealAnimation(entries, observer) {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.remove("section--hidden");
        observer.unobserve(entry.target);
      });
    }
    const sectionObserver = new IntersectionObserver(revealAnimation, {
      root: null,
      threshold: 0.15, //срабатывает при 15% высоты секции
    });
    sectionsEls.forEach((sectionEl) => {
      sectionEl.classList.add("section--hidden");
      sectionObserver.observe(sectionEl);
    });
  }

  function setLazyLoading() {
    const imgEls = Array.from(document.querySelectorAll("img[data-src]"));

    function loadImage(entries, observer) {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.src = entry.target.dataset.src;
        entry.target.onload = () => {
          entry.target.classList.remove("lazy-img");
        };
        observer.unobserve(entry.target);
      });
    }
    const imageObserver = new IntersectionObserver(loadImage, {
      root: null,
      threshold: 0,
      // rootMargin: "200px",  // срабатывает раньше (пользователь не видит замены картинки)
      rootMargin: "-200px", //срабатывает с запозданием (эффект появления при скролле)
    });
    imgEls.forEach((imgEl) => imageObserver.observe(imgEl));
  }

  function setQuotesSlider() {
    const sliderEl = document.querySelector(".slider");
    const slidesEls = Array.from(sliderEl.querySelectorAll(".slide"));
    const btnLeftEl = sliderEl.querySelector(".slider__btn--left");
    const btnRightEl = sliderEl.querySelector(".slider__btn--right");
    const dotsContainerEl = sliderEl.querySelector(".dots");
    let currentSlide = 0;
    const maxSlide = slidesEls.length - 1;

    function createDots() {
      slidesEls.forEach((sliderEl, i) => {
        dotsContainerEl.insertAdjacentHTML(
          "beforeend",
          `<button class="dots__dot ${
            i === currentSlide ? "dots__dot--active" : ""
          }" data-slide="${i}"></button>`
        );
      });
    }
    function updateDots() {
      const dotsEls = Array.from(document.querySelectorAll(".dots__dot"));
      dotsEls.forEach((dotsEl) => dotsEl.classList.remove("dots__dot--active"));
      dotsEls[currentSlide].classList.add("dots__dot--active");
    }
    function moveSlides(nextSlide = null) {
      currentSlide = nextSlide ?? currentSlide;
      slidesEls.forEach(
        (sliderEl, i) =>
          (sliderEl.style.transform = `translateX(${
            (i - currentSlide) * 100
          }%)`)
      );
    }
    function moveSlidesToLeft() {
      currentSlide = currentSlide === 0 ? maxSlide : currentSlide - 1;
      moveSlides();
      updateDots();
    }
    function moveSlidesToRight() {
      currentSlide = currentSlide === maxSlide ? 0 : currentSlide + 1;
      moveSlides();
      updateDots();
    }

    btnRightEl.addEventListener("click", moveSlidesToRight);
    btnLeftEl.addEventListener("click", moveSlidesToLeft);
    document.addEventListener("keydown", (e) => {
      e.key === "ArrowLeft" && moveSlidesToLeft();
      e.key === "ArrowRight" && moveSlidesToRight();
    });
    dotsContainerEl.addEventListener("click", ({ target }) => {
      if (!target.matches(".dots__dot")) return;
      const nextSlide = Number(target.dataset.slide);
      moveSlides(nextSlide);
      updateDots();
    });

    sliderEl.hidden = true;
    moveSlides();
    createDots();
    setTimeout(() => {
      sliderEl.hidden = false;
    }, 50); //скрывает движение слайдов при инициализации
  }

  showModal();
  showCookiesMessage();
  scrollToSection();
  setPageNavigation();
  setTabsComponent();
  setHeaderFadeAnimation();
  setStickyNavigation();
  setSectionsAnimation();
  setLazyLoading();
  setQuotesSlider();
});
