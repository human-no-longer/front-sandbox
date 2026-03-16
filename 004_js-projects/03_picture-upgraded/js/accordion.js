const getAccordionHeight = (contentNode) => {
  if (contentNode.classList.contains('is-open')) {
    return 0;
  }
  return contentNode.firstElementChild.getBoundingClientRect().height;
};

const updateAccordion = (contentNode, height) => {
  contentNode.classList.toggle('is-open');
  contentNode.style.height = `${height}px`;
};

const onContainerClick = (evt) => {
  const headerNode = evt.target.closest('.accordion-heading');

  if (!headerNode) {
    return;
  }

  const contentNode = headerNode.nextElementSibling;
  const contentHeight = getAccordionHeight(contentNode);

  updateAccordion(contentNode, contentHeight);
};

const bindAccordion = (containerSelector) => {
  const containerNode = document.querySelector(containerSelector);

  containerNode.addEventListener('click', onContainerClick);
};

const initAccordions = () => {
  bindAccordion('#accordion');
};

export { initAccordions };
