const sum = function () {
    let total = 0;
    for (let argument in arguments) {
        total += arguments[argument];
    }
    return total;
};
console.log(sum(1, 2, 3, 4, 5, 6, 7, 8, 9));

// do not arrow functions / arrow functions do not pass this context or arguments
const sum2 = () => {
    console.log(arguments)
    let total = 0;
    for (let argument in arguments) {
        total += arguments[argument];
    }
    return total;
};
console.log(sum2(1, 2, 3, 4, 5, 6, 7, 8, 9));
