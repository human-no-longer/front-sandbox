const TRIGGER_HEIGHT = 1650;
const REG_EXP = /#.*$/g;
const SCROLL_STEP = 30;
const ANIMATION_INTERVAL = 1;

const bindSmoothScroll = (buttonSelector) => {
  const upButtonNode = document.querySelector(buttonSelector);
  const documentNode = document.documentElement;
  const bodyNode = document.body;
  upButtonNode.classList.add('animated');

  const onWindowScroll = () => {
    if (documentNode.scrollTop > TRIGGER_HEIGHT) {
      upButtonNode.classList.add('fadeIn');
      upButtonNode.classList.remove('fadeOut');
    } else {
      upButtonNode.classList.add('fadeOut');
      upButtonNode.classList.remove('fadeIn');
    }
  };

  const activateSmoothScroll = (from, to, hash) => {
    const timeInterval = ANIMATION_INTERVAL;
    let prevScrollTop;
    let speed;

    if (to === from) {
      return;
    }

    if (to > from) {
      speed = SCROLL_STEP;
    } else {
      speed = -SCROLL_STEP;
    }

    const move = setInterval(() => {
      const scrollTop = Math.round(
        bodyNode.scrollTop || documentNode.scrollTop
      );
      if (
        prevScrollTop === scrollTop ||
        (to > from && scrollTop >= to) ||
        (to < from && scrollTop <= to)
      ) {
        clearInterval(move);
        history.replaceState(
          history.state,
          document.title,
          location.href.replace(REG_EXP, '') + hash
        );
      } else {
        bodyNode.scrollTop += speed;
        documentNode.scrollTop += speed;
        prevScrollTop = scrollTop;
      }
    }, timeInterval);
  };

  const onUpButtonClick = (evt) => {
    evt.preventDefault();
    const scrollTop = Math.round(bodyNode.scrollTop || documentNode.scrollTop);

    if (evt.target.hash === '') {
      return;
    }

    let hashNode = document.querySelector(evt.currentTarget.hash);
    let hashNodeOffsetTop = 0;

    // на случай если ссылка не внутри body
    while (hashNode.offsetParent) {
      hashNodeOffsetTop += hashNode.offsetTop;
      hashNode = hashNode.offsetParent;
    }

    hashNodeOffsetTop = Math.round(hashNodeOffsetTop);

    activateSmoothScroll(scrollTop, hashNodeOffsetTop, evt.currentTarget.hash);
  };

  window.addEventListener('scroll', onWindowScroll);
  upButtonNode.addEventListener('click', onUpButtonClick);
};

const initSmoothScroll = () => {
  bindSmoothScroll('.pageup');
};

export { initSmoothScroll };
