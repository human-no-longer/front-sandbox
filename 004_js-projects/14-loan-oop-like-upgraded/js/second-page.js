import CollapsiblePanels from './collapsible-panel.js';
import FileDownloader from './file-downloader.js';
import Forms from './forms.js';
import MainSlider from './sliders/slider-main.js';
import VideoPlayer from './video-player.js';

document.addEventListener('DOMContentLoaded', () => {
  const pageSlider = new MainSlider({
    containerSelector: '.moduleapp',
    buttonsSelector: 'a.next',
    nextSelector: 'div.next',
    prevSelector: 'div.prev',
  });
  pageSlider.render();

  const player = new VideoPlayer('.module__video-item .play', '.overlay');
  player.init();

  new Forms('.form').init();

  new CollapsiblePanels('.plus').init();
  new FileDownloader('.download').init();
});
