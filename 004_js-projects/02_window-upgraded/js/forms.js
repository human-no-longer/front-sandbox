import {bindInputsCheck} from './util.js';
import {clearWindowOptionsState, getWindowOptionsState} from './window-state.js';

const SERVER_URL = '../assets/server.php';
const STATUS_MESSAGE_SHOW_TIME = 3000;
const PHONE_REGEXP = /\D/;

const Messages = {
  LOADING: 'Загрузка...',
  SUCCESS: 'Спасибо! Скоро с вами свяжемся',
  FAILURE: 'Что-то пошло не так'
};

const formNodes = document.querySelectorAll('form');
const inputNodes = document.querySelectorAll('input');

const postData = async (url, data) => {
  const statusMessageNode = document.querySelector('.status');
  statusMessageNode.textContent = Messages.LOADING;

  const result = await fetch(url, {
    method: 'POST',
    body: data
  });

  return await result.text();
};

const clearInputs = () => {
  inputNodes.forEach((item) => {
    item.value = '';
  });
};

const bindForms = () => {
  formNodes.forEach((item) => {
    item.addEventListener('submit', (evt) => {
      evt.preventDefault();

      const statusMessageNode = document.createElement('div');
      statusMessageNode.classList.add('status');
      item.append(statusMessageNode);

      const formData = new FormData(item);

      // срабатывает на последней модальной форме калькулятора, чтобы добавить все данные калькулятора в запрос
      if (item.getAttribute('data-calc') === 'end') {
        const state = getWindowOptionsState();
        for (const key in state) {
          formData.append(key, state[key]);
        }
        clearWindowOptionsState();
      }

      postData(SERVER_URL, formData)
        .then(() => {
          statusMessageNode.textContent = Messages.SUCCESS;
        }).catch(() => {
          statusMessageNode.textContent = Messages.FAILURE;
        }).finally(() => {
          clearInputs();
          setTimeout(() => {
            statusMessageNode.remove();
          }, STATUS_MESSAGE_SHOW_TIME);
        });
    });
  });
};

const initForms = () => {
  bindInputsCheck('input[name=user_phone]', PHONE_REGEXP);
  bindInputsCheck('#width', PHONE_REGEXP);
  bindInputsCheck('#height', PHONE_REGEXP);
  bindForms();
};

export {initForms};
