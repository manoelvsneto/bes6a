const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product.controller');

// GET all products
router.get('/', ProductController.getAll);

// GET a product by ID
router.get('/:id', ProductController.getById);

// POST a new product
router.post('/', ProductController.create);

// PUT update a product
router.put('/:id', ProductController.update);

// DELETE a product
router.delete('/:id', ProductController.delete);

module.exports = router;
