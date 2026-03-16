class Slider {
  constructor({
    containerSelector = null,
    buttonsSelector = null,
    nextSelector = null,
    prevSelector = null,
    activeClass = '',
    isAnimated = false,
    isAutoplayOn = false,
  } = {}) {
    this.containerNode = document.querySelector(containerSelector);
    this.slideNodes = this.containerNode.querySelectorAll(
      ':scope > :not(button)'
    );
    this.buttonNodes = document.querySelectorAll(buttonsSelector);
    this.prevButtonNodes = document.querySelectorAll(prevSelector);
    this.nextButtonNodes = document.querySelectorAll(nextSelector);
    this.activeClass = activeClass;
    this.isAnimated = isAnimated;
    this.isAutoplayOn = isAutoplayOn;
  }
}

export default Slider;
