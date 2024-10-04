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
          id TEXT PRIMARY KEY,
          nombre TEXT NOT NULL
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
          empacador_id INTEGER,
          FOREIGN KEY (material_id) REFERENCES productos(id) ON DELETE CASCADE,
          FOREIGN KEY (empacador_id) REFERENCES empacadores(id) ON DELETE SET NULL
        )
      `);

      db.run(`
        CREATE TABLE IF NOT EXISTS empacadores (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT NOT NULL,
          fecha_ingreso DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Agregar las nuevas tablas
      db.run(`
        CREATE TABLE IF NOT EXISTS prod_recibidos_recepcion (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          producto TEXT NOT NULL,
          cantidad FLOAT NOT NULL,
          fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      db.run(`
        CREATE TABLE IF NOT EXISTS prod_recibidos_frituras (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          producto TEXT NOT NULL,
          cantidad FLOAT NOT NULL,
          fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);
    });
  }
});

module.exports = db;
