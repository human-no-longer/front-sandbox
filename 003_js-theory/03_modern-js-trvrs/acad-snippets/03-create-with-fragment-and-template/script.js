const pools = document.querySelectorAll('.pool');

const templateFragment = document.querySelector('#element-template').content; // Находим фрагмент с содержимым темплейта

const template = templateFragment.querySelector('div'); // В фрагменте находим нужный элемент

const fragment = document.createDocumentFragment();

for (let i = 0; i < 6; i++) {
  const element = template.cloneNode(true); // Клонируем элемент со всеми "внутренностями"
  element.classList.add('el-' + (i + 1)); // Добавляем порядковый класс, который начинается с единицы, а не с нуля, поэтому 'i + 1'
  element.children[0].textContent = i; // Записываем содержимое
  fragment.appendChild(element);
}

pools[1].appendChild(fragment);
