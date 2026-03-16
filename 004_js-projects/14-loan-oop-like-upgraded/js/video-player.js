const YoutubeVideoState = {
  END: 0,
};

class VideoPlayer {
  #player = null;
  #path = null;
  #activeButton = null;

  constructor(triggersSelector, overlaySelector) {
    this.buttonNodes = Array.from(document.querySelectorAll(triggersSelector));
    this.overlayNode = document.querySelector(overlaySelector);
    this.closeButtonNode = this.overlayNode.querySelector('.close');
  }

  #insertScript() {
    // [start]
    // https://developers.google.com/youtube/iframe_api_reference
    // This code loads the IFrame Player API code asynchronously.
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    // [end]
  }

  #bindTriggers() {
    this.buttonNodes.forEach((item, index) => {
      // присваиваем заблокированным блокам дата-атрибут data-disabled
      try {
        const playVideoContainerNode = item.closest('.module__video-item').nextElementSibling;

        if (index % 2 === 0) {
          playVideoContainerNode.setAttribute('data-disabled', 'true');
        }
      } catch (e) {
        // error
      }
      item.addEventListener('click', () => {
        // если блок заблокирован, кнопка показа видео не работает
        if (!item.closest('.module__video-item') || item.closest('.module__video-item').dataset.disabled === 'true') {
          return;
        }

        this.#activeButton = item;

        // проверка на наличие уже созданного плеера
        if (!document.querySelector('iframe#frame')) {
          this.#path = item.getAttribute('data-url');
          this.#createPlayer(this.#path);
          return;
        }

        this.overlayNode.style.display = 'flex';

        if (this.#path !== item.getAttribute('data-url')) {
          this.#path = item.getAttribute('data-url');
          // метод YT меняет видео по id в уже загруженном плеере
          this.#player.loadVideoById({
            videoId: this.#path,
          });
          this.#player.stopVideo();
        }
      });
    });
  }

  #bindCloseButton() {
    this.closeButtonNode.addEventListener('click', () => {
      this.overlayNode.style.display = 'none';
      this.#player.stopVideo();
    });
  }

  #onPlayerStateChange = (state) => {
    try {
      // блок разблокируется после того как первое видео проигралось полностью (state.data === 0)
      if (state.data !== YoutubeVideoState.END) {
        return;
      }
      const blockedNode = this.#activeButton.closest('.module__video-item').nextElementSibling;
      const newPlayButtonNode = this.#activeButton.querySelector('svg').cloneNode(true);
      if (!blockedNode.querySelector('.play__circle').classList.contains('closed')) {
        return;
      }
      blockedNode.querySelector('.play__circle').classList.remove('closed');
      blockedNode.querySelector('svg').remove();
      blockedNode.querySelector('.play__circle').appendChild(newPlayButtonNode);
      blockedNode.querySelector('.play__text').textContent = 'play video';
      blockedNode.querySelector('.play__text').classList.remove('attention');
      blockedNode.style.opacity = 1;
      blockedNode.style.filter = 'none';

      blockedNode.setAttribute('data-disabled', 'false');
    } catch (e) {
      // error
    }
  };

  #createPlayer(url) {
    // [start]
    // This function creates an <iframe> (and YouTube player)
    // after the API code downloads.
    // 'frame' - уникальный идентификатор, элемент, который заменяется на iframe (div#frame)
    // eslint-disable-next-line no-undef
    this.#player = new YT.Player('frame', {
      height: '100%',
      width: '100%',
      videoId: `${url}`,
      events: {
        onStateChange: this.#onPlayerStateChange,
      },
    });
    // [end]

    this.overlayNode.style.display = 'flex';
  }

  init() {
    if (this.buttonNodes.length) {
      this.#insertScript();
      this.#bindTriggers();
      this.#bindCloseButton();
    }
  }
}

export default VideoPlayer;
