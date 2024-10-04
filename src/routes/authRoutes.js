// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // Asegúrate de que la ruta sea correcta

// Ruta de autenticación
router.post('/login', authController.login);

module.exports = router;
