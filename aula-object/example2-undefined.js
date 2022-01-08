const book = {
    title: "Clean code",
    author: "Robert C. Martin",
    pages: 464,
    available: true
}

console.log("title" in book)
console.log("publisher" in book)

delete book.available;
console.log(book)

