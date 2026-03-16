const SHOW_MODAL_TIMER = 500000;

const modalNodes = document.querySelectorAll('[data-modal]');

const openModal = (modalNode) => {
  modalNode.style.display = 'block';
  document.body.style.overflow = 'hidden';
};

const closeAllModals = () => {
  modalNodes.forEach((item) => {
    item.style.display = '';
  });
  document.body.style.overflow = '';
};

// isOverlayClickable триггерит закрытие модального окна по нажатию на подложку
const bindModal = (triggerSelector, modalSelector, closerSelector, isOverlayClickable = true) => {
  const modalTriggerNodes = document.querySelectorAll(triggerSelector);
  const modalNode = document.querySelector(modalSelector);
  const modalCloserNode = document.querySelector(closerSelector);

  modalTriggerNodes.forEach((item) => {
    item.addEventListener('click', (evt) => {
      evt.preventDefault();
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
    openModal(modalNode);
  }, time);
};

const initModals = () => {
  bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
  bindModal('.phone_link', '.popup', '.popup .popup_close');
  bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
  bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
  bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);
  showModalByTimer('.popup', SHOW_MODAL_TIMER);
};

export {initModals};
