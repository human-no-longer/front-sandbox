const SHOW_MODAL_TIMER = 500000;
let isModalTriggered = false;

const modalNodes = document.querySelectorAll('[data-modal]');

const openModal = (modalNode) => {
  modalNode.style.display = 'block';
  document.body.style.overflow = 'hidden';
};

const closeAllModals = () => {
  modalNodes.forEach((item) => {
    item.style.display = '';
    item.classList.add('animated', 'fadeIn');
  });
  document.body.style.overflow = '';
};

// isTriggerRemovable - триггер удаляется после одного нажатия
// isOverlayClickable - закрытие модального окна по нажатию на подложку
const bindModal = (
  triggerSelector,
  modalSelector,
  closerSelector,
  isTriggerRemovable = false,
  isOverlayClickable = true
) => {
  const modalTriggerNodes = document.querySelectorAll(triggerSelector);
  const modalNode = document.querySelector(modalSelector);
  const modalCloserNode = document.querySelector(closerSelector);

  modalTriggerNodes.forEach((item) => {
    item.addEventListener('click', (evt) => {
      evt.preventDefault();

      isModalTriggered = true;

      if (isTriggerRemovable) {
        item.remove();
      }

      closeAllModals();
      openModal(modalNode);
    });
  });

  modalCloserNode.addEventListener('click', () => {
    closeAllModals();
  });

  modalNode.addEventListener('click', (evt) => {
    if (isOverlayClickable && evt.target === evt.currentTarget) {
      closeAllModals();
    }
  });
};

const showModalByTimer = (modalSelector, time) => {
  const modalNode = document.querySelector(modalSelector);
  setTimeout(() => {
    let isOtherModalOpen = false;
    modalNodes.forEach((item) => {
      if (getComputedStyle(item).display !== 'none') {
        isOtherModalOpen = true;
      }
    });
    if (!isOtherModalOpen) {
      openModal(modalNode);
    }
  }, time);
};

const showModalByScrollEnd = (triggerSelector) => {
  window.addEventListener('scroll', () => {
    const currentScrollPosition =
      window.scrollY + document.documentElement.clientHeight;
    // для старых браузеров
    const fullScrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
    if (!isModalTriggered && currentScrollPosition >= fullScrollHeight) {
      document.querySelector(triggerSelector)?.click();
    }
  });
};

const initModals = () => {
  bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
  bindModal(
    '.button-consultation',
    '.popup-consultation',
    '.popup-consultation .popup-close'
  );
  // подарок пропадает после открытия модалки или после скроллинга к концу страницы
  bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);
  showModalByScrollEnd('.fixed-gift');
  showModalByTimer('.popup-consultation', SHOW_MODAL_TIMER);
};

export { initModals };
