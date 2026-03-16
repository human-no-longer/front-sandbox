const menuNode = document.querySelector('.burger-menu');
const burgerButtonNode = document.querySelector('.burger');
const MAX_SCREEN_WIDTH = 992;

const onBurgerButtonClick = () => {
  if (
    menuNode.style.display === 'none' &&
    window.screen.availWidth <= MAX_SCREEN_WIDTH
  ) {
    menuNode.style.display = 'block';
  } else {
    menuNode.style.display = 'none';
  }
};

const onWindowResize = () => {
  if (window.screen.availWidth > MAX_SCREEN_WIDTH) {
    menuNode.style.display = 'none';
  }
};

const initBurgerMenu = () => {
  menuNode.style.display = 'none';
  burgerButtonNode.addEventListener('click', onBurgerButtonClick);
  window.addEventListener('resize', onWindowResize);
};

export { initBurgerMenu };
