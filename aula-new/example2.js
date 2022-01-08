const _new = function (fn, ...params) {
    const obj = {};
    Object.setPrototypeOf(obj, fn.prototype)
    fn.apply(obj, params);
    return obj;
}

const Person = function (name, city, year) {
    this.name = name;
    this.city = city;
    this.year = year;
}

Person.prototype.getAge = function () {
        return (new Date).getFullYear() - this.year;
}

const person3 = _new(Person,'Linus Torvalds', 'Helsink', 1969);
const person4 = _new(Person,'Bill Gates', 'Seattle', 1955);
console.log(person3)
console.log(person3.getAge())
console.log(person4)
console.log(person4.getAge())
