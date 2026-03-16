const orderForm = document.querySelector(".form");

const pristine = new Pristine(
  orderForm,
  {
    classTo: "form__item", // Элемент, на который будут добавляться классы
    errorClass: "form__item--invalid", // Класс, обозначающий невалидное поле
    successClass: "form__item--valid", // Класс, обозначающий валидное поле
    errorTextParent: "form__item", // Элемент, куда будет выводиться текст с ошибкой
    errorTextTag: "span", // Тег, который будет обрамлять текст ошибки
    errorTextClass: "form__error", // Класс для элемента с текстом ошибки
  },
  false // не валидирует во время ввода
);

function validateNickname(value) {
  return value.length >= 2 && value.length <= 50;
}

pristine.addValidator(
  orderForm.querySelector("#nickname"),
  validateNickname,
  "От 2 до 50 символов"
);

// УСЛОВИЯ

// Максимальное количество зависит от размера упаковки:
// S-размер - 10 штук, M-размер - 5 штук в одни руки

// Доставка возможна на следующий день или на выходных
// Самовывоз в этот же день, либо на следующий

const amountField = orderForm.querySelector("#amount");
const maxAmount = {
  s: 10,
  m: 5,
};

function validateAmount(value) {
  const unit = orderForm.querySelector('[name="unit"]:checked');
  return value.length && parseInt(value) <= maxAmount[unit.value];
}

function getAmountErrorMessage() {
  const unit = orderForm.querySelector('[name="unit"]:checked');
  return `Не больше ${maxAmount[unit.value]} штук в одни руки`;
}

pristine.addValidator(amountField, validateAmount, getAmountErrorMessage);

function onUnitChange() {
  amountField.placeholder = maxAmount[this.value];
  pristine.validate(amountField);
}

orderForm
  .querySelectorAll('[name="unit"]')
  .forEach((item) => item.addEventListener("change", onUnitChange));

const deliveryField = orderForm.querySelector('[name="delivery"]');
const dateField = orderForm.querySelector('[name="date"]');
const deliveryOption = {
  Доставка: ["Завтра", "На выходных"],
  Самовывоз: ["Сегодня", "Завтра"],
};

function validateDelivery() {
  return deliveryOption[deliveryField.value].includes(dateField.value);
}

function getDeliveryErrorMessage() {
  return `
    ${deliveryField.value}
    ${dateField.value.toLowerCase()}
    ${deliveryField.value === "Доставка" ? "невозможна" : "невозможен"}
  `;
}

pristine.addValidator(deliveryField, validateDelivery, getDeliveryErrorMessage);
pristine.addValidator(dateField, validateDelivery, getDeliveryErrorMessage);

orderForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  pristine.validate();
});
