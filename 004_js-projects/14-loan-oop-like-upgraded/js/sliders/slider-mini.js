import Slider from './slider.js';

const SLIDE_SHOW_INTERVAL = 5000;

const Transparency = {
  FULL: '0',
  MEDIUM: '0.4',
  NONE: '1',
};

class MiniSlider extends Slider {
  constructor(
    containerNode,
    nextButtonNode,
    prevButtonNode,
    activeClass,
    isAnimated,
    isAutoplayOn
  ) {
    super(
      containerNode,
      nextButtonNode,
      prevButtonNode,
      activeClass,
      isAnimated,
      isAutoplayOn
    );
  }

  #showNextSlide = () => {
    this.slideNodes = this.containerNode.querySelectorAll(
      ':scope > :not(button)'
    );
    this.slideNodes[this.slideNodes.length - 1].after(this.slideNodes[0]);
    this.#customizeSlides();
  };

  #showPreviousSlide = () => {
    this.slideNodes = this.containerNode.querySelectorAll(
      ':scope > :not(button)'
    );
    this.containerNode.prepend(this.slideNodes[this.slideNodes.length - 1]);
    this.#customizeSlides();
  };

  #bindContainerStyles() {
    this.containerNode.style.cssText = `
      display: flex;
      flex-wrap: wrap;
      overflow: hidden;
      align-items: flex-start;
    `;
  }

  #bindTriggers() {
    this.nextButtonNodes.forEach((item) =>
      item.addEventListener('click', this.#showNextSlide)
    );
    this.prevButtonNodes.forEach((item) =>
      item.addEventListener('click', this.#showPreviousSlide)
    );
  }

  #customizeSlides() {
    this.slideNodes = this.containerNode.querySelectorAll(
      ':scope > :not(button)'
    );
    this.slideNodes.forEach((item) => {
      item.classList.remove(this.activeClass);
      if (this.isAnimated) {
        item.querySelector('.card__title').style.opacity = Transparency.MEDIUM;
        item.querySelector('.card__controls-arrow').style.opacity =
          Transparency.FULL;
      }
    });

    this.slideNodes[0].classList.add(this.activeClass);

    if (this.isAnimated) {
      this.slideNodes[0].querySelector('.card__title').style.opacity =
        Transparency.NONE;
      this.slideNodes[0].querySelector('.card__controls-arrow').style.opacity =
        Transparency.NONE;
    }
  }

  render() {
    this.#bindContainerStyles();
    this.#bindTriggers();
    this.#customizeSlides();

    if (this.isAutoplayOn) {
      setInterval(this.#showNextSlide, SLIDE_SHOW_INTERVAL);
    }
  }
}

export default MiniSlider;
