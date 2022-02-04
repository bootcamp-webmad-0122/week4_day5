const router = require("express").Router()

const Book = require('../models/Book.model')
const Author = require('../models/Author.model')


// Books list 
router.get("/listado", (req, res, next) => {
  Book
    .find()
    .select('title')
    .then(books => res.render('books/list', { books }))
    .catch(err => console.log(err))
})




// Book details
router.get('/detalles/:book_id', (req, res) => {

  const { book_id } = req.params

  Book
    .findById(book_id)
    .populate('author')       // Nombre del campo que se debe popular
    .then(book => res.render('books/details', book))
    .catch(err => console.log(err))
})





// Book creation form (render)
router.get('/crear', (req, res) => {
  res.render('books/create')
})

// Book creation form (handle)
router.post('/crear', (req, res) => {

  const { title, description, author, rating } = req.body

  Book
    .create({ title, description, author, rating })
    .then(() => res.redirect('/libros/listado'))
    .catch(err => console.log(err))

})






// Book update form (render)
router.get('/editar', (req, res) => {

  const { book_id } = req.query

  Book
    .findById(book_id)
    .then(book => res.render('books/edit', book))
    .catch(err => console.log(err))
})


// Book update form (handle)
router.post('/editar', (req, res) => {

  const { book_id } = req.query
  const { title, description, author, rating } = req.body

  Book
    .findByIdAndUpdate(book_id, { title, description, author, rating }, { new: true })
    .then(updatedBook => res.redirect(`/libros/detalles/${updatedBook._id}`))
    .catch(err => console.log(err))
})



// Delete book
router.post('/eliminar/:book_id', (req, res) => {

  const { book_id } = req.params

  Book
    .findByIdAndDelete(book_id)
    .then(() => res.redirect('/libros/listado'))
    .catch(err => console.log(err))
})


module.exports = router