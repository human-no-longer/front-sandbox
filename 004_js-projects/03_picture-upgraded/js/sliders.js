const SLIDER_INTERVAL = 3000;
const FIRST_SLIDE_INDEX = 1;
const SLIDER_STEP = 1;

const bindSlider = (
  slideSelector,
  direction = 'horizontal',
  prevButtonSelector,
  nextButtonSelector
) => {
  let slideIndex = FIRST_SLIDE_INDEX;
  let isSliderPaused = false;
  const slideNodes = [...document.querySelectorAll(slideSelector)];

  const showSlides = (n) => {
    if (n > slideNodes.length) {
      slideIndex = FIRST_SLIDE_INDEX;
    }
    if (n < FIRST_SLIDE_INDEX) {
      slideIndex = slideNodes.length;
    }

    slideNodes.forEach((item) => {
      item.classList.add('animated');
      item.style.display = 'none';
    });
    slideNodes[slideIndex - 1].style.display = '';
  };

  const changeSlides = (n = SLIDER_STEP) => {
    showSlides((slideIndex += n));
  };

  const activateSliderAnimation = () => {
    if (direction === 'vertical') {
      isSliderPaused = setInterval(() => {
        changeSlides(SLIDER_STEP);
        slideNodes[slideIndex - 1].classList.add('fadeIn');
      }, SLIDER_INTERVAL);
    } else {
      isSliderPaused = setInterval(() => {
        changeSlides(SLIDER_STEP);
        slideNodes[slideIndex - 1].classList.remove('slideInRight');
        slideNodes[slideIndex - 1].classList.add('slideInLeft');
      }, SLIDER_INTERVAL);
    }
  };

  // код из блока try сработает только для слайдеров с кнопками
  try {
    const prevButtonNode = document.querySelector(prevButtonSelector);
    const nextButtonNode = document.querySelector(nextButtonSelector);
    prevButtonNode.addEventListener('click', () => {
      changeSlides(-1 * SLIDER_STEP);
      slideNodes[slideIndex - 1].classList.remove('slideInLeft');
      slideNodes[slideIndex - 1].classList.add('slideInRight');
    });
    nextButtonNode.addEventListener('click', () => {
      changeSlides(SLIDER_STEP);
      slideNodes[slideIndex - 1].classList.remove('slideInRight');
      slideNodes[slideIndex - 1].classList.add('slideInLeft');
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    // console.log(error);
  }

  slideNodes[0].parentElement.addEventListener('mouseenter', () => {
    clearInterval(isSliderPaused);
  });
  slideNodes[0].parentElement.addEventListener('mouseleave', () => {
    activateSliderAnimation();
  });

  showSlides(slideIndex);
  activateSliderAnimation();
};

const initSliders = () => {
  bindSlider(
    '.feedback-slider-item',
    'horizontal',
    '.main-prev-btn',
    '.main-next-btn'
  );
  bindSlider('.main-slider-item', 'vertical');
};

export { initSliders };
