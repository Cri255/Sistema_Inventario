// routes/authRoutes.js
const express = require('express');
const router = express.Router();

// Ruta de autenticación (ejemplo)
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Aquí deberías agregar la lógica de autenticación
    res.send('Autenticación exitosa');
});

module.exports = router;
