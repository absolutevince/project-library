const openModal = document.querySelector(".open-modal");
const dialog = document.querySelector("dialog");
const addBook = document.querySelector(".add-book");
const bookContainer = document.querySelector(".book-container");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const numberOfPagesInput = document.querySelector("#number-of-pages");
const pagesReadInput = document.querySelector("#pages-read");

let BOOKS = [];

openModal.addEventListener("click", (e) => {
  e.preventDefault();
  dialog.showModal();
});

addBook.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    titleInput.value.length <= 0 ||
    authorInput.value.length <= 0 ||
    numberOfPagesInput.value <= 0 ||
    pagesReadInput.value < 0
  )
    return;

  createBook(
    titleInput.value,
    authorInput.value,
    numberOfPagesInput.value,
    pagesReadInput.value
  );
  dialog.close();
});

function createBook(title, author, numberOfPages, pagesRead) {
  BOOKS.push(new Book(title, author, numberOfPages, pagesRead));
  console.log(BOOKS);
  displayBooks();
}

function Book(title, author, numberOfPages, pagesRead) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.pagesRead = pagesRead.length <= 0 ? 0 : pagesRead;
  this.id = generateId();
  this.readStatus = false;

  function generateId() {
    let id = "";
    const chars = title.split(" ").concat(author.split(" ")).join("");

    for (let i = 0; i < 10; i++) {
      const rng = Math.floor(Math.random() * chars.length);
      id += chars[rng];
    }
    return id;
  }

  this.toggleReadStatus = () => {
    this.readStatus = !this.readStatus;
  };
}

function displayBooks() {
  bookContainer.innerHTML = "";
  BOOKS.forEach((book) => {
    bookContainer.appendChild(bookElement(book));
  });
}

function bookElement(book) {
  const container = document.createElement("article");
  const title = document.createElement("h2");
  const author = document.createElement("p");
  const numberOfPages = document.createElement("span");
  const pagesRead = document.createElement("span");
  const readBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");
  const pagesDiv = document.createElement("div");
  const buttonsDiv = document.createElement("div");
  container.className = "book";
  title.className = "title";
  author.className = "author";
  numberOfPages.className = "number-of-pages";
  pagesRead.className = "pages-read";
  pagesDiv.className = "pages-div";
  buttonsDiv.className = "buttons-div";
  readBtn.className = "read-button";
  deleteBtn.className = "delete-button";

  title.textContent = book.title;
  author.textContent = book.author;
  numberOfPages.textContent = book.numberOfPages;
  pagesRead.textContent = book.pagesRead;
  readBtn.textContent = book.readStatus ? "reading" : "not reading";
  deleteBtn.textContent = "delete";

  container.appendChild(title);
  container.appendChild(author);
  container.appendChild(pagesDiv);
  container.appendChild(buttonsDiv);
  pagesDiv.innerHTML = `
   read ${pagesRead.innerHTML} / ${numberOfPages.innerHTML} pages
  `;

  buttonsDiv.appendChild(readBtn);
  buttonsDiv.appendChild(deleteBtn);

  readBtn.addEventListener("click", () => {
    readBook(book.id);
  });

  deleteBtn.addEventListener("click", () => {
    deleteBook(book.id);
  });

  return container;
}

function deleteBook(id) {
  BOOKS = BOOKS.filter((book) => book.id !== id);
  displayBooks();
}

function readBook(id) {
  BOOKS = BOOKS.map((book) => {
    if (book.id === id) {
      book.toggleReadStatus();
    }
    return book;
  });
  displayBooks();
}
