const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Crear una base de datos en la carpeta 'data'
const dataDir = path.resolve(__dirname, '../data');
const dbPath = path.join(dataDir, 'inventario.db');

// Asegúrate de que la carpeta 'data' exista
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err.message);
  } else {
    console.log('Conectado a la base de datos SQLite.');

    // Crear tablas si no existen
    db.serialize(() => {
      db.run(`
        CREATE TABLE IF NOT EXISTS productos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT NOT NULL,
          cantidad FLOAT NOT NULL
        )
      `);

      db.run(`
        CREATE TABLE IF NOT EXISTS recepciones (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
          material_id INTEGER,
          cantidad FLOAT NOT NULL,
          FOREIGN KEY (material_id) REFERENCES productos(id) ON DELETE CASCADE
        )
      `);

      db.run(`
        CREATE TABLE IF NOT EXISTS frituras (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
          material_id INTEGER,
          cantidad FLOAT NOT NULL,
          FOREIGN KEY (material_id) REFERENCES productos(id) ON DELETE CASCADE
        )
      `);

      db.run(`
        CREATE TABLE IF NOT EXISTS empaques (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
          material_id INTEGER,
          cantidad FLOAT NOT NULL,
          FOREIGN KEY (material_id) REFERENCES productos(id) ON DELETE CASCADE
        )
      `);

      db.run(`
        CREATE TABLE IF NOT EXISTS inventario (
          material_id INTEGER PRIMARY KEY,
          cantidad FLOAT DEFAULT 0,
          FOREIGN KEY (material_id) REFERENCES productos(id) ON DELETE CASCADE
        )
      `);

      db.run(`
        CREATE TABLE IF NOT EXISTS usuarios (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
    });
  }
});

module.exports = db;
