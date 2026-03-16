class CollapsiblePanels {
  constructor(triggersSelector) {
    this.buttonNodes = Array.from(document.querySelectorAll(triggersSelector));
  }

  #showPanel = (evt) => {
    const panelNode = evt.target.closest('.module__info-show').nextElementSibling;
    panelNode.classList.toggle('msg');
    panelNode.style.marginTop = '20px';
  };

  init() {
    this.buttonNodes.forEach((item) => item.addEventListener('click', this.#showPanel));
  }
}

export default CollapsiblePanels;
