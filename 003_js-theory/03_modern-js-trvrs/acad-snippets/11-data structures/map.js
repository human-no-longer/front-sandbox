const Alyonushka = {
  age: 14,
  gender: "female",
  name: "Алёнушка",
  job: "Сестрица",
};

const Ivanushka = {
  age: 12,
  gender: "male goat",
  name: "Иванушка",
  job: "Братец",
};

const Bonnie = {
  age: 24,
  gender: "female",
  name: "Bonnie Parker",
  job: "Gangster",
};

const Clyde = {
  age: 25,
  gender: "male",
  name: "Clyde Barrow",
  job: "Gangster",
};

// `Map` создаётся в JS с помощью конструктора
let legendaryPairs = new Map();

// Можно добавлять элементы с помощью метода `set`.
// В `set` первым аргументом передаётся ключ, вторым — значение.
// Таким образом мы можем сопоставить, например, два объекта:
legendaryPairs.set(Alyonushka, Ivanushka);
legendaryPairs.set(Bonnie, Clyde);

// Другой способ создания `Map` — это создание
// на основе другой перечисляемой структуры,
// например, на основе массива массивов
legendaryPairs = new Map([
  [Alyonushka, Ivanushka],
  [Bonnie, Clyde],
]);

// Теперь к элементам словаря можно обращаться,
// добавлять в словарь новые значения, но самое
// интересное, что можно их перебирать или с помощью
// встроенного метода `forEach` или с помощью
// цикла `for..of`.
// Обратите внимание на то, как в примере с `for..of`
// переменные `first` и `second` создаются
// с помощью деструктуризации.
for (const [first, second] of legendaryPairs) {
  console.log(`${first.name} всегда поддержит ${second.name}`);
}

// конструктор
const guitarPlayer = new Map([
  ["firstName", "Richie"],
  ["lastName", "Sambora"],
]);

console.log(guitarPlayer);

// итерация
console.log("Итерация по парам");
for (const pair of guitarPlayer) {
  console.log(pair);
}

console.log("Итерация по значениям");
for (const value of guitarPlayer.values()) {
  console.log(value);
}

console.log("Итерация по ключам");
for (const value of guitarPlayer.keys()) {
  console.log(value);
}

console.log("Итерация по парам ключ/значение .entries()");
for (const value of guitarPlayer.entries()) {
  console.log(value);
}

// создание из объекта, трансформация в объект
const guitarPlayer1 = {
  firstName: "Richie",
  lastName: "Sambora",
};

const map = new Map(Object.entries(guitarPlayer1));
console.log(map); // Map

const newObject = Object.fromEntries(map.entries());
console.log(newObject); // Object
