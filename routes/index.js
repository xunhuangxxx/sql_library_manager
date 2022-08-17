var express = require('express');
var router = express.Router();
const sequelize = require('../models/index').sequelize;
const { DataTypes } = require("sequelize"); 
const library = require('../models/book')(sequelize, DataTypes);

/* GET home page. */
router.get('/', async function(req, res, next) {
  res.redirect('/books');
});


/* GET books page. */
router.get('/books', async function(req, res, next) {
  const books = await library.findAll();
  // res.json(books);
  res.render('index', {books, title: 'Books'});
   
});

/* GET create now book form page */
router.get('/books/new', async function(req, res, next) {
  res.render('new-book', {title:"New Book"});
});
/* GET book detail page */
router.get('/books/:id', async function(req, res, next) {
  const bookDetail = await library.findByPk(req.params.id);
  res.render('update-book', {bookDetail, title: bookDetail.title});
});


/* POST create new book form page */
router.post('/books/new', async function(req, res, next) {
  await library.create(req.body);
  res.redirect('/books');
});
/* POST updates book page */
router.post('/books/:id', async function(req, res, next) {
  await library.update(req.body, {where: {id: req.params.id}});
  res.redirect('/books');  
});

/* POST deletes book */
router.post('/books/:id/delete', async function(req, res, next) {
 await library.destroy({where: {id: req.params.id}});
 res.redirect('/books');
});




module.exports = router;
