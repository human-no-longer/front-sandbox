const promo = {
  VALUE: 0.7,
  CODE: 'SKIDKA',
};
const messages = {
  DEFAULT: 'Для расчета нужно выбрать размер картины и материал картины',
  MORE_OPTIONS: 'Пожалуйста, выберите материал и размер картины🤲',
};

const calc = (
  sizeSelector,
  materialSelector,
  optionsSelector,
  promocodeSelector,
  resultSelector
) => {
  const sizeNode = document.querySelector(sizeSelector);
  const materialNode = document.querySelector(materialSelector);
  const optionsNode = document.querySelector(optionsSelector);
  const promocodeNode = document.querySelector(promocodeSelector);
  const resultNode = document.querySelector(resultSelector);
  const formNode = sizeNode.closest('form');
  let sum = 0;

  const onCalcOptionChange = (evt) => {
    if (evt.target === formNode) {
      resultNode.textContent = messages.DEFAULT;
      return;
    }
    const size = Number(sizeNode.value);
    const material = Number(materialNode.value);
    const options = Number(optionsNode.value);
    sum = Math.round(size * material + options);

    if (sizeNode.value === '' || materialNode.value === '') {
      resultNode.textContent = messages.MORE_OPTIONS;
    } else if (promocodeNode.value === promo.CODE) {
      resultNode.textContent = `${Math.round(sum * promo.VALUE)} рублей`;
    } else {
      resultNode.textContent = `${sum} рублей`;
    }
  };

  sizeNode.addEventListener('change', onCalcOptionChange);
  materialNode.addEventListener('change', onCalcOptionChange);
  optionsNode.addEventListener('change', onCalcOptionChange);
  promocodeNode.addEventListener('input', onCalcOptionChange);
  formNode.addEventListener('submit', onCalcOptionChange);
};

const initCalc = () => {
  calc('#size', '#material', '#options', '.promocode', '.calc-price');
};

export { initCalc };
