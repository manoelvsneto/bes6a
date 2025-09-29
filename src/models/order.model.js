const db = require('../config/database');

class Order {
  static getAll(callback) {
    const sql = 'SELECT * FROM orders';
    db.all(sql, [], callback);
  }

  static getById(id, callback) {
    const sql = 'SELECT * FROM orders WHERE id = ?';
    db.get(sql, [id], callback);
  }

  static create(orderData, callback) {
    const { user_id, total_amount, status } = orderData;
    const sql = 'INSERT INTO orders (user_id, total_amount, status) VALUES (?, ?, ?)';
    db.run(sql, [user_id, total_amount, status || 'pending'], function(err) {
      callback(err, this.lastID);
    });
  }

  static update(id, orderData, callback) {
    const { user_id, total_amount, status } = orderData;
    const sql = 'UPDATE orders SET user_id = ?, total_amount = ?, status = ? WHERE id = ?';
    db.run(sql, [user_id, total_amount, status, id], function(err) {
      callback(err, this.changes);
    });
  }

  static delete(id, callback) {
    const sql = 'DELETE FROM orders WHERE id = ?';
    db.run(sql, [id], function(err) {
      callback(err, this.changes);
    });
  }
}

module.exports = Order;
