const bindInputsCheck = (selector) => {
  const inputs = Array.from(document.querySelectorAll(selector));

  inputs.forEach((item) => {
    item.addEventListener('input', () => {
      item.value = item.value.replace(/\D/, '');
    });
  });
};

const calcScroll = () => {
  const div = document.createElement('div');
  div.style.height = '50px';
  div.style.width = '50px';
  div.style.overflowY = 'scroll';
  div.style.visibility = 'hidden';

  document.body.append(div);
  const scrollWidth = div.offsetWidth - div.clientWidth;
  div.remove();

  return scrollWidth;
};

export {
  bindInputsCheck,
  calcScroll
};
