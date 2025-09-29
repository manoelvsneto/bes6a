const Order = require('../models/order.model');

const OrderController = {
  // Get all orders
  getAll: (req, res) => {
    Order.getAll((err, orders) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json(orders);
    });
  },

  // Get order by ID
  getById: (req, res) => {
    const id = req.params.id;
    Order.getById(id, (err, order) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.status(200).json(order);
    });
  },

  // Create a new order
  create: (req, res) => {
    const orderData = req.body;
    
    if (!orderData.user_id || !orderData.total_amount) {
      return res.status(400).json({ error: 'User ID and total amount are required' });
    }

    Order.create(orderData, (err, id) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id, message: 'Order created successfully' });
    });
  },

  // Update an order
  update: (req, res) => {
    const id = req.params.id;
    const orderData = req.body;
    
    if (!orderData.user_id || !orderData.total_amount || !orderData.status) {
      return res.status(400).json({ error: 'User ID, total amount, and status are required' });
    }

    Order.update(id, orderData, (err, changes) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (changes === 0) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.status(200).json({ message: 'Order updated successfully' });
    });
  },

  // Delete an order
  delete: (req, res) => {
    const id = req.params.id;
    Order.delete(id, (err, changes) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (changes === 0) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.status(200).json({ message: 'Order deleted successfully' });
    });
  }
};

module.exports = OrderController;
