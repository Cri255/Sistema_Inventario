// models/materialModel.js
const db = require('../config/db');

class MaterialModel {
  static createTable() {
    db.run(`
      CREATE TABLE IF NOT EXISTS materiales (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL
      )
    `);
  }

  static getAllMaterials(callback) {
    db.all('SELECT * FROM materiales', [], callback);
  }

  static createMaterial(nombre, callback) {
    const query = 'INSERT INTO materiales (nombre) VALUES (?)';
    db.run(query, [nombre], function (err) {
      callback(err, this.lastID);
    });
  }
}

module.exports = MaterialModel;
