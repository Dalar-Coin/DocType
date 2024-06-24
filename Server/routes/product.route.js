const express = require("express");
const Prodcut = require("../models/product.model.js");
const router = express.Router();
const {getProducts, getProduct, createProduct} = require('../controllers/product.controller.js');

router.get('/', getProducts);
router.get('/:id', getProduct);

router.post("/", createProduct);

module.exports = router;