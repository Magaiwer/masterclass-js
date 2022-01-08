const personPrototype = {
    getAge() {
        return (new Date()).getFullYear() - this.year;
    }
}
const createPerson = function (name, city, year) {
    const person = {
        name,
        city,
        year
    };
    Object.setPrototypeOf(person, personPrototype)
    return person;
}

const person1 = createPerson('Linus Torvalds', 'Helsink', 1969);
const person2 = createPerson('Bill Gates', 'Seattle', 1955);
console.log(person1)
console.log(person1.getAge())
console.log(person2)
console.log(person2.getAge())


// second way

const Person = function (name, city, year) {
    this.name = name;
    this.city = city;
    this.year = year;
    this.getAge = function () {
        return (new Date).getFullYear() - this.year;
    }
}

const person3 = new Person('Linus Torvalds', 'Helsink', 1969);
const person4 = new Person('Bill Gates', 'Seattle', 1955);
console.log(person3)
console.log(person3.getAge())
console.log(person4)
console.log(person4.getAge())
