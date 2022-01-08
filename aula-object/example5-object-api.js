const javascript = Object.create({});
Object.assign(javascript, {
    name: 'JavaScript',
    year: 1995,
    paradigm: 'OO and Functional'
}, {
    author: 'Brendan Eich',
    influencedBy: 'Java, Scheme and Self'
});

console.log(javascript)



const javascript1 = {
    name: 'JavaScript',
    year: 1995,
    paradigm: 'OO and Functional'
}

const javascript2 = {
    name: 'JavaScript',
    year: 1995,
    paradigm: 'OO and Functional'
}

console.log(Object.keys(javascript2))
console.log(Object.values(javascript2))
console.log(Object.entries(javascript2))
console.log(Object.is(javascript1, javascript2))


const javascript3 = {};
Object.defineProperty(javascript3, "name", {
    enumerable: true,
    value: "JavaScript"
});
console.log(javascript3);
console.log(Object.keys(javascript3));
console.log(Object.values(javascript3));
console.log(Object.entries(javascript3));
