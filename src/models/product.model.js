const db = require('../config/database');

class Product {
  static getAll(callback) {
    const sql = 'SELECT * FROM products';
    db.all(sql, [], callback);
  }

  static getById(id, callback) {
    const sql = 'SELECT * FROM products WHERE id = ?';
    db.get(sql, [id], callback);
  }

  static create(productData, callback) {
    const { name, description, price, stock } = productData;
    const sql = 'INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)';
    db.run(sql, [name, description, price, stock], function(err) {
      callback(err, this.lastID);
    });
  }

  static update(id, productData, callback) {
    const { name, description, price, stock } = productData;
    const sql = 'UPDATE products SET name = ?, description = ?, price = ?, stock = ? WHERE id = ?';
    db.run(sql, [name, description, price, stock, id], function(err) {
      callback(err, this.changes);
    });
  }

  static delete(id, callback) {
    const sql = 'DELETE FROM products WHERE id = ?';
    db.run(sql, [id], function(err) {
      callback(err, this.changes);
    });
  }
}

module.exports = Product;
