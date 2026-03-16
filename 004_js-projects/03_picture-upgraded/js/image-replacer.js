const onBlockMouseOver = (evt) => {
  const blockNode = evt.currentTarget;
  const imgNode = blockNode.querySelector('img');
  const textNodes = [...blockNode.querySelectorAll('p:not(.sizes-hit)')];
  imgNode.src = imgNode.src.replace('.png', '-1.png');
  textNodes.forEach((item) => (item.style.display = 'none'));
};

const onBlockMouseOut = (evt) => {
  const blockNode = evt.currentTarget;
  const imgNode = blockNode.querySelector('img');
  const textNodes = [...blockNode.querySelectorAll('p:not(.sizes-hit)')];
  imgNode.src = imgNode.src.replace('-1.png', '.png');
  textNodes.forEach((item) => (item.style.display = ''));
};

const bindPictures = (blockSelector) => {
  const blockNodes = [...document.querySelectorAll(blockSelector)];
  blockNodes.forEach((item) => {
    item.addEventListener('mouseover', onBlockMouseOver);
    item.addEventListener('mouseout', onBlockMouseOut);
  });
};

const initImageReplacer = () => {
  bindPictures('.sizes-block');
};

export { initImageReplacer };
