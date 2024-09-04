// models/receptionModel.js
const db = require('../config/db');

class ReceptionModel {
  static createTable() {
    db.run(`
      CREATE TABLE IF NOT EXISTS recepciones (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
        material_id INTEGER,
        cantidad FLOAT NOT NULL,
        FOREIGN KEY (material_id) REFERENCES materiales(id)
      )
    `);
  }

  static getAllRecepciones(callback) {
    db.all('SELECT * FROM recepciones', [], callback);
  }

  static createReception(material_id, cantidad, callback) {
    const query = 'INSERT INTO recepciones (material_id, cantidad) VALUES (?, ?)';
    db.run(query, [material_id, cantidad], function (err) {
      callback(err, this.lastID);
    });
  }
}

module.exports = ReceptionModel;
