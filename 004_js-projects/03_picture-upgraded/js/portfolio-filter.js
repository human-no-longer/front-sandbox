const menuNode = document.querySelector('.portfolio-menu');
const wrapperNode = document.querySelector('.portfolio-wrapper');
const placeholderMessageNode = document.querySelector('.portfolio-no');
const menuOptionNodes = [...menuNode.querySelectorAll('li')];
const portfolioItemNodes = [...wrapperNode.querySelectorAll('.all')];

const hideAllPortfolioItems = () => {
  portfolioItemNodes.forEach((item) => {
    item.style.display = 'none';
    item.classList.remove('animated', 'fadeIn');
  });
  placeholderMessageNode.style.display = 'none';
  placeholderMessageNode.classList.remove('animated', 'fadeIn');
};

const showPortfolioItemsByType = (type) => {
  hideAllPortfolioItems();
  const typeNodes = [...wrapperNode.querySelectorAll(`.${type}`)];
  if (typeNodes.length) {
    typeNodes.forEach((item) => {
      item.style.display = 'block';
      item.classList.add('animated', 'fadeIn');
    });
  } else {
    placeholderMessageNode.style.display = 'block';
    placeholderMessageNode.classList.add('animated', 'fadeIn');
  }
};

const onMenuClick = (evt) => {
  if (!evt.target.closest('li[data-filter]')) {
    return;
  }
  menuOptionNodes.forEach((item) => item.classList.remove('active'));
  evt.target.classList.add('active');
  showPortfolioItemsByType(evt.target.dataset.filter);
};

const initPortfolioFilter = () => {
  menuNode.addEventListener('click', onMenuClick);
};

export { initPortfolioFilter };
