class AbstractMan {
  // абстрактный класс(интерфейс)
  // new AbstractMan('Foo', 'Bar') вызовет ошибку
  constructor(firstName, lastName) {
    if (new.target === AbstractMan) {
      throw new Error("Can't instantiate Abstract class, only concrete one.");
    }

    this.firstName = firstName;
    this.lastName = lastName;
  }

  walk() {
    throw new Error(`Abstract method not implemented: ${this.walk.name}`);
  }

  jump() {
    throw new Error(`Abstract method not implemented: ${this.jump.name}`);
  }
}

class Man extends AbstractMan {
  walk() {
    console.log("Walk...");
  }

  jump() {
    console.log("Jump...");
  }
}

class GuitarPlayer extends Man {
  jump() {
    console.log("Mega jump!!!");
  }

  doubleJump() {
    this.jump();
    this.jump();
  }
}

class Manager {
  #junior = null;

  /**
   * Эта нотация называтся JSDoc https://jsdoc.app/howto-es2015-classes.html
   * @type {AbstractMan} junior
   */
  setJunior(junior) {
    this.#junior = junior;
    const { firstName, lastName } = junior;
    console.log(`Manager controll ${firstName} ${lastName}`);
  }
  /* Метод `setJunior` может принимать любой объект, который удовлетворяет интерфейсу `AbsractMan`. Нотация у метода — это просто комментарий, который подсказывает, с какой структурой он работает.
   */

  commandWalk() {
    this.#junior.walk();
  }

  commandJump() {
    this.#junior.jump();
  }
}

const manager = new Manager();
const bob = new Man("Bob", "Gale");
const richieSambora = new GuitarPlayer("Richie", "Sambora");

/* Передаем менеджеру инстансы разных классов, но имеющие единый интерфейс. Менеджер ничего не знает о реализации этих объектов, но он знает все об их интерфейсе  */
manager.setJunior(bob);
manager.commandWalk();
manager.commandJump();

manager.setJunior(richieSambora);
manager.commandWalk();
manager.commandJump();

console.log("--");
richieSambora.doubleJump();
