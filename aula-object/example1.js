const book = {
    title: "Clean code",
    author: "Robert C. Martin",
    pages: 464,
    available: true
}

for (let bookKey in book) {
    console.log(book[bookKey])
}

const book2 = {};
for (let key in book) {
    book2[key] = book[key];
}

console.log(book2)
