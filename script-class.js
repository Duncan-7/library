index = 0;

// book1 = new Book("The Hobbit", "JRR Tolkien", 250, "yes")
// book2 = new Book("Harry Potter", "JK Rowling", 500, "yes")



let myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    if(read == "yes"){
      this.read = "Read";
    } else {
      this.read = "Unread";
    }
    this.index = index
    index++
  }
}

function loadLibrary() {
  if(localStorage.getItem("myLibrary")){
    myLibraryString = localStorage.getItem("myLibrary");
    myLibrary = JSON.parse(myLibraryString);
    index = myLibrary.length;
  } else {
    myLibrary = [];
  }
}

function updateStorage() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function createBook() {
  bookform = document.getElementById("bookform")
  book = new Book(bookform.name.value, bookform.author.value, bookform.pages.value, bookform.read.value);
  myLibrary.push(book);
  render(book);
  updateStorage();
}

function renderLibrary(){
  myLibrary.forEach(render)
}

function render(book){
  const books = document.getElementById("books")
  const entry = document.createElement('div');
  entry.setAttribute('class', 'library-entry');
  entry.dataset.index = book.index;
  heading = document.createElement('h3');
  heading.textContent = book.title;
  entry.appendChild(heading);
  details = document.createElement('p');
  details.innerHTML = `<p>Author: ${book.author}</p>
  <p>No. of pages: ${book.pages}</p>`;
  ifread = document.createElement('p');
  ifread.textContent = book.read;
  entry.appendChild(details);
  entry.appendChild(ifread);
  addReadButton(entry, ifread);
  addDeleteButton(entry);
  books.appendChild(entry);
}

function addReadButton(entry, ifread) {
  readbutton = document.createElement("button");
  readbutton.setAttribute('class', 'read-button');
  readbutton.innerHTML = "Toggle Read";
  
  readbutton.addEventListener('click', (e) => {
    book = myLibrary[findBookPosition(e.target.parentNode.dataset.index)];
    if(book.read == "Read"){
      book.read = "Unread";
      ifread.textContent = book.read;
    }else{
      book.read = "Read"
      ifread.textContent = book.read;
    }
    updateStorage();
  })
  entry.appendChild(readbutton);
}

function addDeleteButton(entry){
  deleteButton = document.createElement("button")
  deleteButton.innerHTML = "Remove Book"
  deleteButton.addEventListener('click', (e) => {
    e.target.parentNode.parentNode.removeChild(entry);
    myLibrary.splice(findBookPosition(e.target.parentNode.dataset.index), 1);
    updateStorage();
  })
  entry.appendChild(deleteButton)
}

function findBookPosition(index){
  let i;
  for(i = 0; i < myLibrary.length; i++) {
    if(myLibrary[i].index == index){
      return i;
    }
  }
}

const submitButton = document.querySelector('#submitbutton')
submitButton.addEventListener('click', (e) => {
  e.preventDefault();
  form = document.getElementById('bookform');
  createBook();
  form.reset();
  form.style.display = 'none';
});

const addButton = document.querySelector('#add-book')
addButton.addEventListener('click', () => {
  document.getElementById('bookform').style.display = 'block';
})



loadLibrary();
renderLibrary();