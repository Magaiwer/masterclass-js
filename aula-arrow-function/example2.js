const person = {
    name: "James Gosling",
    city: "Alberta",
    year: 1955,
    getAge: function () {
        return (new Date()).getFullYear() - this.year;
    }
};
console.log(person);
console.log(person.getAge());


// arrow function do not
const person2 = {
    name: "James Gosling",
    city: "Alberta",
    year: 1955,
    getAge:  () => {
        return (new Date()).getFullYear() - this.year;
    }
};
console.log(person2);
console.log(person2.getAge());
