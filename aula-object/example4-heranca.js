console.log('first way')
const functionalLanguage = {
    paradigm: "Functional"
}

const scheme = {
    name: "Scheme",
    year: 1975,
    __proto__: functionalLanguage
};

const javascript = {
    name: "JavaScript",
    year: 1995,
    __proto__: functionalLanguage
};

for (let key in scheme) {
    console.log(key, scheme.hasOwnProperty(key))
}

console.log('second way')
const functionalLanguage1 = {
    paradigm: "Functional"
}

const scheme1 = {
    name: "Scheme",
    year: 1975,
};
Object.setPrototypeOf(scheme1, functionalLanguage1);

const javascript1 = {
    name: "JavaScript",
    year: 1995,
};
Object.setPrototypeOf(javascript1, functionalLanguage1)

for (let key in scheme1) {
    console.log(key, scheme.hasOwnProperty(key))
}


console.log('third way')
const functionalLanguage2 = {
    paradigm: "Functional"
}

const scheme2 = Object.create(functionalLanguage2)
scheme2.name =  "Scheme";
scheme2.year = 1975;

const javascript2 = Object.create(functionalLanguage2)
    javascript2.name = "JavaScript";
    javascript2.year =  1995;

for (let key in scheme2) {
    console.log(key, scheme.hasOwnProperty(key))
}
