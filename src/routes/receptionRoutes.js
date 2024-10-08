// src/routes/recepcionesRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../../config/db');

// Obtener todas las recepciones
router.get('/', (req, res) => {
  db.all('SELECT * FROM recepciones', [], (err, rows) => {
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

// Registrar una nueva recepción
router.post('/', (req, res) => {
  const { material_id, cantidad } = req.body;
  const query = 'INSERT INTO recepciones (material_id, cantidad) VALUES (?, ?)';
  db.run(query, [material_id, cantidad], function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'Recepción registrada',
      data: { id: this.lastID, material_id, cantidad },
    });
  });
});

module.exports = router;
