// src/routes/materialRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../../config/db');

// Obtener todos los materiales
router.get('/', (req, res) => {
  db.all('SELECT * FROM materiales', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows,
    });
  });
});

// Crear un nuevo material
router.post('/', (req, res) => {
  const { nombre } = req.body;
  const query = 'INSERT INTO materiales (nombre) VALUES (?)';
  db.run(query, [nombre], function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'Material creado',
      data: { id: this.lastID, nombre },
    });
  });
});

module.exports = router;
