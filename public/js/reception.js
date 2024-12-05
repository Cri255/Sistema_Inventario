const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const router = express.Router();
const dbPath = path.resolve(__dirname, 'inventario.db');
const db = new sqlite3.Database(dbPath, (err) => {
    console.log('dbPath', dbPath);
    console.log('db', db);
    console.log('Conectado a la base de datos SQLite.');
    if (err) {
        console.error('Error al conectar con la base de datos:', err.message);
    } else {
        console.log('Conectado a la base de datos SQLite.');
    }
});

// Crear las tablas "productos" y "recepciones" si no existen
db.run(`
    CREATE TABLE IF NOT EXISTS productos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL
    )
`, (err) => {
    if (err) {
        console.error('Error al crear la tabla productos:', err.message);
    } else {
        console.log('Tabla "productos" lista.');
    }
});

db.run(`
    CREATE TABLE IF NOT EXISTS recepciones (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        material_id INTEGER NOT NULL,
        cantidad INTEGER NOT NULL,
        FOREIGN KEY (material_id) REFERENCES productos(id)
    )
`, (err) => {
    if (err) {
        console.error('Error al crear la tabla recepciones:', err.message);
    } else {
        console.log('Tabla "recepciones" lista.');
    }
});

// Ruta para obtener productos
router.get('/api/productos', (req, res) => {
    
    const query = 'SELECT id, nombre FROM productos';
    db.all(query, [], (err, rows) => {
        console.log('peneeeeeeeeeeeeeeeee');
        if (err) {
            console.error('Error al obtener productos:', err.message);
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'success', data: rows });
    });
});

// Ruta para registrar una nueva recepción
router.post('/recepciones', (req, res) => {
    const { material_id, cantidad } = req.body;

    if (!material_id || !cantidad) {
        return res.status(400).json({ error: 'Faltan datos requeridos.' });
    }

    // Validar que el material_id existe en la tabla productos
    const checkProductQuery = 'SELECT id FROM productos WHERE id = ?';
    db.get(checkProductQuery, [material_id], (err, row) => {
        if (err) {
            console.error('Error al verificar el producto:', err.message);
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: 'Producto no encontrado.' });
        }

        // Insertar la recepción en la tabla "recepciones"
        const query = 'INSERT INTO recepciones (material_id, cantidad) VALUES (?, ?)';
        db.run(query, [material_id, cantidad], function (err) {
            if (err) {
                console.error('Error al registrar recepción:', err.message);
                return res.status(500).json({ error: err.message });
            }
            res.json({
                message: 'Recepción registrada',
                data: { id: this.lastID, material_id, cantidad },
            });
        });
    });
});

module.exports = router;
