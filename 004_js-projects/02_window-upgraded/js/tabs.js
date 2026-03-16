const bindTabs = (headerSelector, tabSelector, contentSelector, activeClass = 'active', display = 'block') => {
  const headerNode = document.querySelector(headerSelector);
  const tabNodes = [...document.querySelectorAll(tabSelector)];
  const contentNodes = [...document.querySelectorAll(contentSelector)];

  const hideTabsContent = () => {
    contentNodes.forEach((item) => {
      item.style.display = 'none';
    });
    tabNodes.forEach((item) => {
      item.classList.remove(activeClass);
    });
  };

  const showTabContent = (i = 0) => {
    contentNodes[i].style.display = display;
    tabNodes[i].classList.add(activeClass);
  };

  headerNode.addEventListener('click', (evt) => {
    const tabNode = evt.target.closest(tabSelector);
    if (!tabNode) {
      return;
    }
    const index = tabNodes.findIndex((item) => item === tabNode);
    hideTabsContent();
    showTabContent(index);
  });

  hideTabsContent();
  showTabContent();
};

const initTabs = () => {
  bindTabs('.glazing_slider', '.glazing_block', '.glazing_content', 'active');
  bindTabs('.decoration_slider', '.decoration_item > div', '.decoration_content > div > div', 'after_click');
  bindTabs('.balcon_icons', '.balcon_icons_img', '.big_img > img', 'do_image_more', 'inline-block');
};

export {initTabs};
