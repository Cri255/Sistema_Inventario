const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const router = express.Router();

// Crear una instancia de la base de datos SQLite
const db = new sqlite3.Database('./inventario.db', (err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err.message);
  } else {
    console.log('Conexión a la base de datos exitosa');
  }
});

// Función para obtener los productos desde la base de datos
function obtenerProductos(callback) {
  const query = 'SELECT id, nombre FROM productos';
  db.all(query, [], (err, rows) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, rows);
  });
}

// Ruta para obtener productos
router.get('/productos', (req, res) => {
  obtenerProductos((err, rows) => {
    if (err) {
      console.error('Error al obtener productos:', err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'success', data: rows });
  });
});

// Función para registrar los productos recibidos (Empacadores)
function registrarRecepcion(productoId, cantidad, callback) {
  const query = 'INSERT INTO prod_recibidos_empacadores (producto_id, cantidad) VALUES (?, ?)';
  db.run(query, [productoId, cantidad], function(err) {
    if (err) {
      return callback(err, null);
    }
    callback(null, { message: 'Recepción registrada con éxito', id: this.lastID });
  });
}

// Función para registrar la fritura de productos
function registrarFritura(productoId, cantidad, callback) {
  const query = 'INSERT INTO frituras (producto_id, cantidad) VALUES (?, ?)';
  db.run(query, [productoId, cantidad], function(err) {
    if (err) {
      return callback(err, null);
    }
    callback(null, { message: 'Fritura registrada con éxito', id: this.lastID });
  });
}

// Cerrar la conexión cuando ya no sea necesario
function cerrarConexion() {
  db.close((err) => {
    if (err) {
      console.error('Error al cerrar la base de datos:', err.message);
    } else {
      console.log('Conexión cerrada');
    }
  });
}

// Exportar las funciones y el enrutador
module.exports = { obtenerProductos, registrarRecepcion, registrarFritura, cerrarConexion, router };
