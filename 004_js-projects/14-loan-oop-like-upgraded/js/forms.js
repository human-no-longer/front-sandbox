const SERVER_URL = '../assets/server.php';
const STATUS_MESSAGE_SHOW_TIME = 3000;
// eslint-disable-next-line no-useless-escape
const REG_EXP = /[^a-z0-9@\.]/gi;
const Messages = {
  LOADING: 'Загрузка...',
  SUCCESS: 'Спасибо! Скоро с вами свяжемся',
  FAILURE: 'Что-то пошло не так',
};

class Forms {
  #messages = {
    loading: Messages.LOADING,
    success: Messages.SUCCESS,
    failure: Messages.FAILURE,
  };

  #path = SERVER_URL;

  constructor(formsSelector) {
    this.forms = Array.from(document.querySelectorAll(formsSelector));
    this.inputs = Array.from(document.querySelectorAll('input'));
    this.mailInputs = Array.from(document.querySelectorAll('[type="email"]'));
  }

  async #postData(url, data) {
    const result = await fetch(url, {
      method: 'POST',
      body: data,
    });

    return await result.text();
  }

  #clearInputs() {
    this.inputs.forEach((item) => (item.value = ''));
  }

  #checkMailInputs() {
    this.mailInputs.forEach((item) => {
      item.addEventListener('keypress', (evt) => {
        if (evt.key.match(REG_EXP)) {
          evt.preventDefault();
        }
      });
    });
  }

  #onFormSubmit = (evt) => {
    evt.preventDefault();

    const statusMessageNode = document.createElement('div');
    statusMessageNode.style.cssText = `
      margin-top: 18px;
      font-size: 18px;
      color: tomato;
    `;
    evt.target.append(statusMessageNode);
    statusMessageNode.textContent = this.#messages.loading;

    const formData = new FormData(evt.target);

    this.#postData(this.#path, formData)
      .then(() => {
        statusMessageNode.textContent = this.#messages.success;
      })
      .catch(() => {
        statusMessageNode.textContent = this.#messages.failure;
      })
      .finally(() => {
        this.#clearInputs();
        setTimeout(() => {
          statusMessageNode.remove();
        }, STATUS_MESSAGE_SHOW_TIME);
      });
  };

  init() {
    this.forms.forEach((item) => {
      item.addEventListener('submit', this.#onFormSubmit);
    });
    this.#checkMailInputs();
  }
}

export default Forms;
