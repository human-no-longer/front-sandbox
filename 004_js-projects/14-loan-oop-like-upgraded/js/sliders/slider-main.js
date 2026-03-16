import Slider from './slider.js';

const PAGE_WITH_PROMO = 3;
const SHOW_PROMO_DELAY = 3000;

class MainSlider extends Slider {
  #timeoutId = null;
  #startIndex = 1;

  constructor(buttonsSelector, prevSelector, nextSelector) {
    super(buttonsSelector, prevSelector, nextSelector);

    this.slideIndex = this.#startIndex;
  }

  #showSlide(n) {
    if (n > this.slideNodes.length) {
      this.slideIndex = this.#startIndex;
    }

    if (n < this.#startIndex) {
      this.slideIndex = this.slideNodes.length;
    }

    this.slideNodes.forEach((item) => {
      item.style.display = 'none';
    });

    this.slideNodes[this.slideIndex - 1].style.display = '';

    // промо появляется только на одной странице
    if (n === PAGE_WITH_PROMO) {
      this.#showPromo();
    } else {
      if (this.promoNode) {
        this.#hidePromo();
      }
    }
  }

  #plusSlide(n) {
    this.#showSlide((this.slideIndex += n));
  }

  #showPromo() {
    try {
      this.promoNode = document.querySelector('.hanson');
      this.promoNode.style.opacity = '0';
      this.promoNode.classList.add('animated');
      this.#timeoutId = setTimeout(() => {
        clearInterval(this.#timeoutId);
        this.promoNode.style.opacity = '1';
        this.promoNode.classList.add('slideInUp');
      }, SHOW_PROMO_DELAY);
    } catch (error) {
      // error
    }
  }

  #hidePromo() {
    try {
      clearInterval(this.#timeoutId);
      this.promoNode.classList.remove('slideInUp');
      this.promoNode = null;
    } catch (error) {
      // error
    }
  }

  #bindTriggers() {
    // смена страниц по нажатию кнопок слайдера
    this.buttonNodes.forEach((item) => {
      item.addEventListener('click', () => {
        this.#plusSlide(1);
      });

      try {
        item
          .closest('.sidecontrol')
          .firstElementChild.addEventListener('click', (evt) => {
            evt.preventDefault();
            this.slideIndex = this.#startIndex;
            this.#showSlide(this.slideIndex);
          });
      } catch (error) {
        //error
      }
      // ссылка на первую страницу с логотипом
    });

    // активация первого слайда
    this.#showSlide(this.slideIndex);

    // для кнопок переключения внизу второй страницы
    this.nextButtonNodes.forEach((item) => {
      item.addEventListener('click', () => {
        this.#plusSlide(1);
      });
    });

    this.prevButtonNodes.forEach((item) => {
      item.addEventListener('click', () => {
        this.#plusSlide(-1);
      });
    });
  }

  render() {
    this.#bindTriggers();
  }
}

export default MainSlider;
