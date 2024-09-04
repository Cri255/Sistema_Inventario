// models/fryingModel.js
const db = require('../config/db');

class FryingModel {
  static createTable() {
    db.run(`
      CREATE TABLE IF NOT EXISTS frituras (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
        material_id INTEGER,
        cantidad FLOAT NOT NULL,
        FOREIGN KEY (material_id) REFERENCES materiales(id)
      )
    `);
  }

  static getAllFryings(callback) {
    db.all('SELECT * FROM frituras', [], callback);
  }

  static createFrying(material_id, cantidad, callback) {
    const query = 'INSERT INTO frituras (material_id, cantidad) VALUES (?, ?)';
    db.run(query, [material_id, cantidad], function (err) {
      callback(err, this.lastID);
    });
  }
}

module.exports = FryingModel;
