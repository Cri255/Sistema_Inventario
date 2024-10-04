// src/routes/productosRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../../config/db');

// Obtener todos los productos
router.get('/', (req, res) => {  // Cambia '/productos' por '/'  
    const query = 'SELECT id, nombre FROM productos';
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Error al ejecutar la consulta:', err.message);
            return res.status(500).json({ error: err.message });
        }

        console.log('Resultados de la consulta:', rows); // Verifica el resultado en la consola del servidor

        if (!rows || rows.length === 0) {
            return res.json({
                message: 'success',
                data: [], // Devuelve un array vacío si no hay resultados
            });
        }

        res.json({
            message: 'success',
            data: rows,
        });
    });
});

module.exports = router;
