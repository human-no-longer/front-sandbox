const popupNode = document.createElement('div');
const bigImgNode = document.createElement('img');

const createPopup = () => {
  popupNode.classList.add('popup');
  popupNode.style.display = 'none';
  popupNode.style.justifyContent = 'center';
  popupNode.style.alignItems = 'center';
  bigImgNode.style.maxHeight = '80vh';

  popupNode.append(bigImgNode);
  document.body.append(popupNode);
};

const bindImageContainer = (selector) => {
  const imgContainerNode = document.querySelector(selector);
  imgContainerNode.addEventListener('click', (evt) => {
    evt.preventDefault();

    if (!evt.target.closest('.preview')) {
      return;
    }

    bigImgNode.src = evt.target.parentElement.href;
    popupNode.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  });
};

const bindPopup = () => {
  popupNode.addEventListener('click', (evt) => {
    if (evt.target === popupNode) {
      popupNode.style.display = '';
      document.body.style.overflow = '';
    }
  });
};

const initPopupImages = () => {
  createPopup();
  bindPopup();
  bindImageContainer('.works');
};

export {initPopupImages};
