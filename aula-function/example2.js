/*
function sum(a, b) {
    return a + b;
}
console.log(sum(2,2));
*/

const sum = function (a, b) {
    let total = 0;

    for (let argument in arguments) {
        total += arguments[argument];
    }

    return total;
}

console.log(sum(1,2,3,4,5,6,7,7,8,8,8));

const sum2 = function (...numbers) {
    let total = 0;

    for (let number in numbers) {
        total += numbers[number];
    }

    return total;
}

console.log(sum(1,2,3,4,5,6,7,7,8,8,8));

