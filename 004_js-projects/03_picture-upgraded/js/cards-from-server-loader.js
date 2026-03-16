import { getResource } from './requests.js';

const showMoreCards = (triggerSelector, containerSelector) => {
  const buttonNode = document.querySelector(triggerSelector);
  const containerNode = document.querySelector(containerSelector);

  const createCards = (response) => {
    response.forEach(({ src, title, link }) => {
      const cardNode = document.createElement('div');
      cardNode.classList.add(
        'col-sm-3',
        'col-sm-offset-0',
        'col-xs-10',
        'col-xs-offset-1',
        'animated',
        'fadeInUp'
      );
      cardNode.innerHTML = `
      <div class="styles-block">
        <img src="${src}" alt>
        <h4>${title}</h4>
        <a href="${link}">Подробнее</a>
      </div>`;
      containerNode.append(cardNode);
    });
  };

  const onLoadMoreButtonClick = () => {
    getResource('assets/db.json')
      .then((res) => {
        createCards(res.styles);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
    buttonNode.remove();
  };

  buttonNode.addEventListener('click', onLoadMoreButtonClick);
};

const initJsonCardsLoader = () => {
  showMoreCards('.button-styles-2', '#styles .row');
};

export { initJsonCardsLoader };
