// models/userModel.js
const db = require('../config/db');

class UserModel {
  static createTable() {
    db.run(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }

  static getAllUsers(callback) {
    db.all('SELECT * FROM usuarios', [], callback);
  }

  static createUser(username, password, callback) {
    const query = 'INSERT INTO usuarios (username, password) VALUES (?, ?)';
    db.run(query, [username, password], function (err) {
      callback(err, this.lastID);
    });
  }
}

module.exports = UserModel;
