"use strict";
console.log("------Prototypes-------");
function Person(firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
}

Person.prototype.printAge = function () {
  console.log(2025 - this.birthYear);
};

const dog = new Person("Sharik", 2020);
dog.printAge();

const cat = new Person("Matroskin", 2021);
console.log(dog, cat);
console.log(cat instanceof Person);
console.log(cat.__proto__ === Person.prototype);
// eslint-disable-next-line no-prototype-builtins
console.log(Person.prototype.isPrototypeOf(cat));

console.log("--------Classes----------");

class PersonClass {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }
  printAge() {
    console.log(this.age);
  }
  get age() {
    return 2025 - this.birthYear;
  }
  set fullName(name) {
    if (name.includes(" ")) this._fullName = name;
    else alert("Full name should consist of more than one word");
  }
  get fullName() {
    return this._fullName;
  }
  static ask() {
    console.log("Who is there?");
  }
}

const pechkin = new PersonClass("Pechkin", 1970);
console.log(pechkin);
pechkin.printAge();
console.log(pechkin.__proto__ === PersonClass.prototype);
// pechkin.fullName = "George";
pechkin.fullName = "Valisiliy Pechkin";
console.log(pechkin.fullName);
PersonClass.ask();
console.log("-------------Obj.Create()-------------");

const PersonProto = {
  printAge() {
    console.log(2025 - this.birthYear);
  },
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};
const moorka = Object.create(PersonProto);
moorka.init("Moorka", 2023);
moorka.printAge();
console.log(moorka.__proto__ == PersonProto);

console.log("------------Inheritance--------------");

const Human = function (name, birthYear) {
  this.name = name;
  this.birthYear = birthYear;
};

Human.prototype.printAge = function () {
  console.log(2025 - this.birthYear);
};

const Student = function (name, birthYear, course) {
  Human.call(this, name, birthYear);
  this.course = course;
};

Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

Student.prototype.introduce = function () {
  console.log(`My name is ${this.name}. I study ${this.course}`);
};

const student1 = new Student("John", 2005, "Art");

student1.printAge();
student1.introduce();
console.log(student1 instanceof Student);
console.log(student1 instanceof Object);

console.log("-----------Class inheritance-----------------");

class HumanClass {
  constructor(name, birthYear) {
    this.name = name;
    this.birthYear = birthYear;
  }
  printAge() {
    console.log(2025 - this.birthYear);
  }
}

class StudentClass extends HumanClass {
  constructor(name, birthYear, course) {
    super(name, birthYear);
    this.course = course;
  }
  introduce() {
    console.log(`My name is ${this.name}. I study ${this.course}`);
  }
  /* printAge() {
    console.log("My age is only " + (2025 - this.birthYear));
  } */
}

const student2 = new StudentClass("Mark", 2006, "Literature");
console.log(student2);
student2.printAge();
student2.introduce();

console.log("--------------Obj.Create inheritance------------------");
const HumanProto = {
  printAge() {
    console.log(2025 - this.birthYear);
  },
  init(name, birthYear) {
    this.name = name;
    this.birthYear = birthYear;
  },
};

const StudentProto = Object.create(HumanProto);
StudentProto.init = function (name, birthYear, course) {
  HumanProto.init.call(this, name, birthYear);
  this.course = course;
};
StudentProto.introduce = function () {
  console.log(`My name is ${this.name}. I study ${this.course}`);
};

const student3 = Object.create(StudentProto);
student3.init("Boris", 2007, "CS");
console.log(student3);
student3.printAge();
student3.introduce();

console.log("----------------Encapsulation---------------------");
class Account {
  locale = navigator.language;
  bank = "VTB";
  #movements = [];
  #pin;

  constructor(ownwer, currency, pin) {
    this.ownwer = ownwer;
    this.currency = currency;
    this.#pin = pin;
    // console.log("Thank you for opening an account!")
  }

  deposit(value) {
    this.#movements.push(value);
    return this;
  }

  withdraw(value) {
    this.deposit(-value);
    return this;
  }

  getMovements() {
    return this.#movements;
  }

  #approveLoan(value) {
    console.log("do something", this.#pin);
    console.log("do something", value);
    return true;
  }

  requestLoan(value) {
    if (!this.#approveLoan(value)) return;
    this.deposit(value);
    console.log("Loan approved ");
    return this;
  }
}

const acc1 = new Account("Bob", "EUR", 1234);
console.log(
  acc1
    .deposit(1000)
    .withdraw(200)
    .requestLoan(2000)
    .withdraw(1000)
    .getMovements()
);
