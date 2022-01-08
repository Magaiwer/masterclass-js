const createPerson = function (name, city, year) {
    return {
        name,
        city,
        year
    };
        // short handle notation when parameters has the same name attribute
};

const person = createPerson("Alan Kay", "Springfield", 1940);
console.log(person);


// arrow function
const createPerson2 =  (name, city, year) => ({name, city, year});
const person2 = createPerson2("Alan Kay", "Springfield", 1940);
console.log(person2);

