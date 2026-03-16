import { postData } from './requests.js';

const FILENAME_LENGTH = 6;
const MESSAGE_SHOWING_TIME = 3000;

const formNodes = [...document.querySelectorAll('form')];
const inputNodes = [...document.querySelectorAll('input')];
const selectNodes = [...document.querySelectorAll('select')];
const uploadNodes = [...document.querySelectorAll('[name=upload]')];

const messages = {
  NO_FILE: 'Файл не выбран',
  LOADING: 'Loading...',
  SUCCESS: 'Thanks! We will contact you soon',
  FAILURE: 'Something is wrong :(((',
  SPINNER: 'assets/img/spinner.gif',
  OK: 'assets/img/ok.png',
  FAIL: 'assets/img/fail.png',
};

const paths = {
  DESIGNER: 'assets/server.php',
  QUESTION: 'assets/question.php',
};

const clearInputs = () => {
  inputNodes.forEach((item) => {
    item.value = '';
  });
  selectNodes.forEach((item) => {
    item.selectedIndex = 0;
  });
  uploadNodes.forEach((item) => {
    item.previousElementSibling.textContent = messages.NO_FILE;
  });
};

const onFileUpload = (evt) => {
  const [fileName, fileExtension] = evt.target.files[0].name.split('.');
  const newFileName =
    fileName.length > FILENAME_LENGTH
      ? `${fileName.substr(0, FILENAME_LENGTH)}...`
      : fileName;
  const newFileExtensionName = `${newFileName}.${fileExtension}`;
  evt.target.previousElementSibling.textContent = newFileExtensionName;
};

const bindUploadForms = () => {
  uploadNodes.forEach((item) => {
    item.addEventListener('input', onFileUpload);
  });
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  const formNode = evt.target;

  const statusMessageNode = document.createElement('div');
  statusMessageNode.classList.add('status');

  const statusImgNode = document.createElement('img');
  statusImgNode.src = messages.SPINNER;
  statusImgNode.classList.add('animated', 'fadeIn');
  statusMessageNode.append(statusImgNode);

  const statusTextNode = document.createElement('div');
  statusTextNode.textContent = messages.LOADING;
  statusMessageNode.append(statusTextNode);

  formNode.parentElement.append(statusMessageNode);
  formNode.classList.add('animated', 'fadeOut');
  formNode.style.display = 'none';

  const formData = new FormData(formNode);
  const api =
    formNode.closest('.popup-design') ||
    formNode.classList.contains('calc-form')
      ? paths.DESIGNER
      : paths.QUESTION;

  postData(api, formData)
    .then(() => {
      statusImgNode.src = messages.OK;
      statusTextNode.textContent = messages.SUCCESS;
    })
    .catch(() => {
      statusImgNode.src = messages.FAIL;
      statusTextNode.textContent = messages.FAILURE;
    })
    .finally(() => {
      clearInputs();
      setTimeout(() => {
        statusMessageNode.remove();
        formNode.style.display = 'block';
        formNode.classList.remove('fadeOut');
        formNode.classList.add('fadeIn');
      }, MESSAGE_SHOWING_TIME);
    });
};

const bindModalForms = () => {
  formNodes.forEach((item) => {
    item.addEventListener('submit', onFormSubmit);
  });
};

const initForms = () => {
  bindUploadForms();
  bindModalForms();
};

export { initForms };
