class Animal {
  constructor(name) {
    this.name = name
  }

  eat() {
    return this.name +  ': eat';
  }
}

class Dog extends Animal {
  constructor(age, name) {
    super(name)
    this.age = age
  }
}

const dog = new Dog(12, 'Peter');

console.log(dog);