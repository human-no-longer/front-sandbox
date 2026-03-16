const numbers = [1, 3, 4, 4, 1];
const mySet = new Set(numbers);

// Удалить элемент коллекции
mySet.delete(1);
console.log(mySet);

// Проверить наличие значения
console.log(mySet.has(4));

// Количество элементов в коллекции
console.log(mySet.size);

// Очистить
mySet.clear();
console.log(mySet);
