const showMoreCards = (triggerSelector, cardSelector) => {
  const cardNodes = [...document.querySelectorAll(cardSelector)];
  const buttonNode = document.querySelector(triggerSelector);

  cardNodes.forEach((item) => {
    item.classList.add('animated', 'fadeInUp');
  });

  const onLoadMoreButtonClick = () => {
    cardNodes.forEach((item) => {
      item.classList.remove('hidden-lg', 'hidden-md', 'hidden-sm', 'hidden-xs');
      item.classList.add(
        'col-sm-3',
        'col-sm-offset-0',
        'col-xs-10',
        'col-xs-offset-1'
      );
    });
    buttonNode.remove();
  };

  buttonNode.addEventListener('click', onLoadMoreButtonClick);
};

const initCardsLoader = () => {
  showMoreCards('.button-styles', '.styles-2');
};

export { initCardsLoader };
