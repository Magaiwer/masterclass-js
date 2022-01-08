const sum = function (a, b) {
    return a + b;
};
const subtract = function (a, b) {
    return a - b;
};

const calculator = function (fn) {
    return function (a, b) {
        return fn(a, b);
    }
};
console.log(calculator(subtract)(2, 2));
console.log(calculator(sum)(2, 2));

// arrow function 1
const sum1 = (a, b) => {
    return a + b;
};
const subtract1 = (a, b) => {
    return a - b;
};
const calculator1 = (fn) => {
    return (a, b) => {
        return fn(a, b);
    }
};
console.log(calculator1(subtract1)(2, 2));
console.log(calculator1(sum1)(2, 2));

// arrow function 2
const sum2 = (a, b) => a + b;
const subtract2 = (a, b) => a - b;
const calculator2 = fn => (a, b) => fn(a, b);
console.log(calculator2(subtract2)(2, 2));
console.log(calculator2(sum2)(2, 2));
