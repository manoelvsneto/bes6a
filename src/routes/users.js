const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');

// GET all users
router.get('/', UserController.getAll);

// GET a user by ID
router.get('/:id', UserController.getById);

// POST a new user
router.post('/', UserController.create);

// PUT update a user
router.put('/:id', UserController.update);

// DELETE a user
router.delete('/:id', UserController.delete);

module.exports = router;
