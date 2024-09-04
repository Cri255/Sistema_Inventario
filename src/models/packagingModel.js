// models/packagingModel.js
const db = require('../config/db');

class PackagingModel {
  static createTable() {
    db.run(`
      CREATE TABLE IF NOT EXISTS empaques (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
        material_id INTEGER,
        cantidad FLOAT NOT NULL,
        FOREIGN KEY (material_id) REFERENCES materiales(id)
      )
    `);
  }

  static getAllPackagings(callback) {
    db.all('SELECT * FROM empaques', [], callback);
  }

  static createPackaging(material_id, cantidad, callback) {
    const query = 'INSERT INTO empaques (material_id, cantidad) VALUES (?, ?)';
    db.run(query, [material_id, cantidad], function (err) {
      callback(err, this.lastID);
    });
  }
}

module.exports = PackagingModel;
