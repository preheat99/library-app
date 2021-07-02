//Variables for HTML Elements
const libraryElement = document.querySelector('.library');
const mainElement = document.querySelector('.main');
const formElement = document.querySelector('.library-form');


//Creating library, array of Book objects
let myLibrary = [];

//Creating js object named Book 
function Book(title, author, page, read) {
    this.title = title;
    this.author = author;
    this.page = page;
    this.read = read;
}

//function to add books to library
function addBookToLibrary(bookObj) {
    myLibrary.push(bookObj);
}

//Creating Books for example
let book1 = new Book('The Mist', 'Stephen King', 150,true);
let book2 = new Book('The Silent Patient', 'Alex Michaelides', 330, false);
let book3 = new Book('Delhi is not far', 'Ruskin Bond', 120, false);
let book4 = new Book('Inferno', 'Dan Brown', 400, true);

//Adding books to the library
addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
addBookToLibrary(book4);

//Function to display each book on html
let id = 0;
function displayEachBook() {
    myLibrary.forEach(book => {
        //console.log(book);
        displayBook(book);
    });
}

//Displaying each book on html
displayEachBook();

function readBook(e) {
    let bookId = e.target.parentElement.id;
    myLibrary[bookId].read = !myLibrary[bookId].read;
    if (myLibrary[bookId].read === true) {
        e.target.parentElement.classList.remove('disable');
    } else {
        e.target.parentElement.classList.add('disable');
    }
    e.target.parentElement.childNodes[1].textContent = `Have Read the book: ${myLibrary[bookId].read}`;
}
function removeBook(e) {
    let bookId = e.target.parentElement.id;
    myLibrary[bookId] = "";
    libraryElement.removeChild(e.target.parentElement);
    //myLibrary.indexOf(e.target.p)
}

function disableButton() {
    mainElement.classList.add('disable');
    formElement.style.display = 'block'; 
}
function displayBook(book) {
    let eachBookElement = document.createElement('div');
    eachBookElement.classList.add('book');
    eachBookElement.setAttribute('id',id++);

    let paraInBookElement = document.createElement('p');
    let para2InBookElement = document.createElement('p');
    paraInBookElement.textContent = `Title: ${book.title}, Author: ${book.author}, 
                                         Pages: ${book.page}`;
    para2InBookElement.textContent = `Have Read the book: ${book.read}`;

    let removeBookElement = document.createElement('button');
    removeBookElement.textContent='Remove';

    let readBookElement = document.createElement('button');
    readBookElement.textContent='Read/Not Read';
    removeBookElement.addEventListener('click',removeBook);
    readBookElement.addEventListener('click',readBook);
        
    if (book.read === false) {
        eachBookElement.classList.add('disable');
    }
    eachBookElement.appendChild(paraInBookElement);
    eachBookElement.appendChild(para2InBookElement);
    eachBookElement.appendChild(removeBookElement);
    eachBookElement.appendChild(readBookElement);
    libraryElement.appendChild(eachBookElement);
}
function submitForm() {
    console.log(formElement.childNodes[1].elements[3].id);
    console.log(formElement.childNodes[1].elements[3].checked);
    
    let newBook = new Book(formElement.childNodes[1].elements[0].value,
                            formElement.childNodes[1].elements[1].value,
                            formElement.childNodes[1].elements[2].value,
                            formElement.childNodes[1].elements[3].checked);
    console.log(newBook);
    myLibrary.push(newBook);
    mainElement.classList.remove('disable');
    formElement.style.display = 'none'; 
    displayBook(newBook);
}