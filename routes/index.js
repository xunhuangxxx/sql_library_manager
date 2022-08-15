var express = require('express');
var router = express.Router();
const sequelize = require('../models/index').sequelize;
const { DataTypes } = require("sequelize"); 
const book = require('../models/book')(sequelize, DataTypes);

/* GET home page. */
router.get('/', async function(req, res, next) {
  res.redirect('/books');
});


/* GET books page. */
router.get('/books', async function(req, res, next) {
  const books = await book.findAll();
  // res.json(books);
  res.render('books');
   
});

/* GET create now book form page */
router.get('/books/new', async function(req, res, next) {
  res.render('new-book');
});
/* GET book detail page */
router.get('/books/:id', async function(req, res, next) {
  const showbook = await book.findByPk(req.params.id);
  res.json(showbook);
});


/* POST create new book form page */
router.post('/books/new', async function(req, res, next) {
  await book.create(req.body);
  res.send("New book added");
  //res.redirect('/books');
});
/* POST updates book page */
router.post('/books/:id', async function(req, res, next) {
  await book.update(req.body, {where: {id: req.params.id}});
  res.send("Book updated");  
});

/* POST deletes book */
router.post('/books/:id/delete', async function(req, res, next) {
 const deleteBook =  await book.findByPk(req.params.id);
 book.destroy(deleteBook);
 res.send('Book deleted');
});




module.exports = router;
