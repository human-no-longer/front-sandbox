"use strict";
const numDeclineIf = (num, nominative, genitiveSingular, genitivePlural) => {
  let reminder100 = num % 100;
  let reminder10 = num % 10;

  if (reminder100 >= 11 && reminder100 <= 14) return genitivePlural;
  if (reminder10 === 1) return nominative;
  if (reminder10 >= 2 && reminder10 <= 4) return genitiveSingular;
  return genitivePlural;
};

const numDeclineSwitch = (
  num,
  nominative,
  genitiveSingular,
  genitivePlural
) => {
  switch (true) {
    case num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 11 || num % 100 > 14):
      return genitiveSingular;
    case num % 10 === 1 && num % 100 !== 11:
      return nominative;
    default:
      return genitivePlural;
  }
};

console.log(116, numDeclineSwitch(116, "гость", "гостя", "гостей"));
console.log(123, numDeclineSwitch(123, "гость", "гостя", "гостей"));
console.log(131, numDeclineSwitch(131, "гость", "гостя", "гостей"));
console.log(124, numDeclineSwitch(124, "гость", "гостя", "гостей"));
console.log(1111, numDeclineSwitch(1111, "гость", "гостя", "гостей"));
