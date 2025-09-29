const db = require('../config/database');

class User {
  static getAll(callback) {
    const sql = 'SELECT id, name, email, created_at FROM users';
    db.all(sql, [], callback);
  }

  static getById(id, callback) {
    const sql = 'SELECT id, name, email, created_at FROM users WHERE id = ?';
    db.get(sql, [id], callback);
  }

  static create(userData, callback) {
    const { name, email, password } = userData;
    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.run(sql, [name, email, password], function(err) {
      callback(err, this.lastID);
    });
  }

  static update(id, userData, callback) {
    const { name, email, password } = userData;
    const sql = 'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?';
    db.run(sql, [name, email, password, id], function(err) {
      callback(err, this.changes);
    });
  }

  static delete(id, callback) {
    const sql = 'DELETE FROM users WHERE id = ?';
    db.run(sql, [id], function(err) {
      callback(err, this.changes);
    });
  }
}

module.exports = User;
