const Product = require('../models/product.model');

const ProductController = {
  // Get all products
  getAll: (req, res) => {
    Product.getAll((err, products) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json(products);
    });
  },

  // Get product by ID
  getById: (req, res) => {
    const id = req.params.id;
    Product.getById(id, (err, product) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.status(200).json(product);
    });
  },

  // Create a new product
  create: (req, res) => {
    const productData = req.body;
    
    if (!productData.name || !productData.price) {
      return res.status(400).json({ error: 'Name and price are required' });
    }

    Product.create(productData, (err, id) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id, message: 'Product created successfully' });
    });
  },

  // Update a product
  update: (req, res) => {
    const id = req.params.id;
    const productData = req.body;
    
    if (!productData.name || !productData.price) {
      return res.status(400).json({ error: 'Name and price are required' });
    }

    Product.update(id, productData, (err, changes) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (changes === 0) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.status(200).json({ message: 'Product updated successfully' });
    });
  },

  // Delete a product
  delete: (req, res) => {
    const id = req.params.id;
    Product.delete(id, (err, changes) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (changes === 0) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.status(200).json({ message: 'Product deleted successfully' });
    });
  }
};

module.exports = ProductController;
