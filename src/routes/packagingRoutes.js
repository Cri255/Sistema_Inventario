// src/routes/empaquesRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../../config/db');

// Obtener todos los empaques
router.get('/', (req, res) => {
  db.all('SELECT * FROM empaques', [], (err, rows) => {
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

// Registrar un nuevo empaque
router.post('/', (req, res) => {
  const { material_id, cantidad } = req.body;
  const query = 'INSERT INTO empaques (material_id, cantidad) VALUES (?, ?)';
  db.run(query, [material_id, cantidad], function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'Empaque registrado',
      data: { id: this.lastID, material_id, cantidad },
    });
  });
});

module.exports = router;
