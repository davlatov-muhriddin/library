const showModal = document.querySelector(".main-content_btn")
const modalContainer = document.querySelector(".modal-container")
const modalBox = document.querySelector(".modal-box")

// modal
showModal.addEventListener("click", () => {
  modalContainer.classList.add("active")
  modalBox.style.display = "block"
})

modalBox.addEventListener("click", (e) => {
  modalContainer.classList.remove("active")
  e.target.style.display = "none"
})

// localstorage
const form = document.querySelector(".content-modal_form")
const inputs = document.querySelectorAll("[data-input]")



let storageBook = JSON.parse(localStorage.getItem("books")) ? JSON.parse(localStorage.getItem("books")) : []

if (storageBook.length) {
  showBooks()
}

// set book localStorage
const setBook = () => {
  localStorage.setItem("books", JSON.stringify(storageBook))
}

// submit form
form.addEventListener("submit", (e) => {
  e.preventDefault()
  modalContainer.classList.remove("active")
  modalBox.style.display = "none"

  storageBook.push({ bookTitle: inputs[0].value, authorName: inputs[1].value, bookPage: inputs[2].value, toggle: inputs[3].checked })
  setBook()
  showBooks()
  form.reset()
})

// show books

function showBooks() {
  const cardsContainer = document.querySelector(".main-cards")
  const books = JSON.parse(localStorage.getItem("books"))
  cardsContainer.innerHTML = ""

  books.forEach((book, index) => {
    cardsContainer.innerHTML += `
      <div class="main-card">
        <h1>${book.bookTitle}</h1>
        <h2>${book.authorName}</h2>
        <h3>${book.bookPage}</h3>
        <div class="main-card_btns">
          <button onclick="changeBook(${index})" type="button" class="btn ${book.toggle == true ? "show-more" : "isRead"} effect-btn">read</button>
          <button onclick="deleteBook(${index})" type="submit" class="btn remove effect-btn">remove</button>
        </div>
      </div>
    `
  })
}

// delete book

const deleteBook = (id) => {
  const newBook = storageBook.filter((book, index) => {
    return id !== index
  })
  storageBook = newBook
  setBook()
  showBooks()
}

// change book

const changeBook = (id) => {
  const toggleBook = storageBook.map((item, index) => {
    if (id == index) {
      return { ...item, toggle: item.toggle = !item.toggle };
    }else {
      return { ...item }
    }
  })

  storageBook = toggleBook
  setBook()
  showBooks()
}