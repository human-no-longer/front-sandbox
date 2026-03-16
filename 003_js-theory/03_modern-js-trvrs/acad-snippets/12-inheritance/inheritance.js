class Man {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  walk() {
    console.log("Walk...");
  }

  jump() {
    console.log("Jump...");
  }
}

const bob = new Man("Bob", "Gale");

console.log(bob.firstName, bob.lastName);

bob.walk();
bob.jump();

class GuitarPlayer extends Man {
  jump() {
    console.log("Mega jump!!!");
  }

  doubleJump() {
    super.jump(); // Jump...
    this.jump(); // Mega jump!!!
  }
}

const richieSambora = new GuitarPlayer("Richie", "Sambora");

console.log(richieSambora.firstName, richieSambora.lastName);

richieSambora.jump(); // Mega jump!!!

// richieSambora.walk(); // Walk...
richieSambora.doubleJump(); // Jump... Mega jump!!!
