import DifferenceInfo from './difference-info.js';
import Forms from './forms.js';
import MainSlider from './sliders/slider-main.js';
import MiniSlider from './sliders/slider-mini.js';
import VideoPlayer from './video-player.js';

document.addEventListener('DOMContentLoaded', () => {
  const pageSlider = new MainSlider({
    containerSelector: '.page',
    buttonsSelector: '.next',
  });
  pageSlider.render();

  const showUpSlider = new MiniSlider({
    containerSelector: '.showup__content-slider',
    prevSelector: '.showup__prev',
    nextSelector: '.showup__next',
    activeClass: 'card-active',
    isAnimated: true,
  });
  showUpSlider.render();

  const modulesSlider = new MiniSlider({
    containerSelector: '.modules__content-slider',
    prevSelector: '.modules__info-btns .slick-prev',
    nextSelector: '.modules__info-btns .slick-next',
    activeClass: 'card-active',
    isAnimated: true,
    isAutoplayOn: true,
  });
  modulesSlider.render();

  const feedSlider = new MiniSlider({
    containerSelector: '.feed__slider',
    prevSelector: '.feed__slider .slick-prev',
    nextSelector: '.feed__slider .slick-next',
    activeClass: 'feed__item-active',
  });
  feedSlider.render();

  const player = new VideoPlayer('.showup .play', '.overlay');
  player.init();

  const differenceInfoNode = new DifferenceInfo('.officerold', '.officernew', '.officer__card-item');
  differenceInfoNode.init();

  new Forms('.form').init();
});
