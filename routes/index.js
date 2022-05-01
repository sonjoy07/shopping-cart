const express = require('express');
const router = express.Router();
const Product = require('./../controller/ProductController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/addProduct',Product.create)

module.exports = router;
