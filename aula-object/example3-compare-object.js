const book1 = {
    title: "Clean code",
    author: "Robert C. Martin",
    pages: 464,
    available: true
}

const book2 = {
    title: "Clean code",
    author: "Robert C. Martin",
    pages: 420,
    available: true
}

let equal = true;

for (let key in book1) {
    if (book1[key] !== book2[key]) equal = false;
}

for (let key in book2) {
    if (book2[key] !== book1[key]) equal = false;
}

console.log(equal)
