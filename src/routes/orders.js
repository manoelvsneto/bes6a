const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/order.controller');

// GET all orders
router.get('/', OrderController.getAll);

// GET an order by ID
router.get('/:id', OrderController.getById);

// POST a new order
router.post('/', OrderController.create);

// PUT update an order
router.put('/:id', OrderController.update);

// DELETE an order
router.delete('/:id', OrderController.delete);

module.exports = router;
