import {setWindowOptionsState} from './window-state.js';

const bindActionToElement = (elements, event, property) => {
  const nodes = [elements].flat();

  nodes.forEach((item, i) => {
    item.addEventListener(event, () => {
      switch (item.nodeName) {
        case 'SPAN':
          setWindowOptionsState(property, i);
          break;
        case 'SELECT':
          setWindowOptionsState(property, item.value);
          break;
        case 'INPUT':
          if (item.getAttribute('type') === 'checkbox') {
            nodes.forEach((input) => (input.checked = false));
            item.checked = true;
            setWindowOptionsState(property, item.nextElementSibling.id);
          } else {
            setWindowOptionsState(property, item.value);
          }
          break;
      }
    });
  });
};

const changeWindowOptions = () => {
  const balconTypeNodes = [...document.querySelectorAll('.balcon_icons_img')];
  const windowWidthNode = document.querySelector('#width');
  const windowHeightNode = document.querySelector('#height');
  const glazingTypeNode = document.querySelector('#view_type');
  const windowProfileNodes = [...document.querySelectorAll('.checkbox')];

  bindActionToElement(balconTypeNodes, 'click', 'form');
  bindActionToElement(windowWidthNode, 'input', 'width');
  bindActionToElement(windowHeightNode, 'input', 'height');
  bindActionToElement(glazingTypeNode, 'change', 'type');
  bindActionToElement(windowProfileNodes, 'change', 'profile');
};

export {changeWindowOptions};
