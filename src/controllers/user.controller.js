const User = require('../models/user.model');

const UserController = {
  // Get all users
  getAll: (req, res) => {
    User.getAll((err, users) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json(users);
    });
  },

  // Get user by ID
  getById: (req, res) => {
    const id = req.params.id;
    User.getById(id, (err, user) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    });
  },

  // Create a new user
  create: (req, res) => {
    const userData = req.body;
    
    if (!userData.name || !userData.email || !userData.password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    User.create(userData, (err, id) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id, message: 'User created successfully' });
    });
  },

  // Update a user
  update: (req, res) => {
    const id = req.params.id;
    const userData = req.body;
    
    if (!userData.name || !userData.email || !userData.password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    User.update(id, userData, (err, changes) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (changes === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json({ message: 'User updated successfully' });
    });
  },

  // Delete a user
  delete: (req, res) => {
    const id = req.params.id;
    User.delete(id, (err, changes) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (changes === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json({ message: 'User deleted successfully' });
    });
  }
};

module.exports = UserController;
