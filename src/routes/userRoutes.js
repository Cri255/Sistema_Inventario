// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../../config/db'); // Asegúrate de que la ruta es correcta
const bcrypt = require('bcrypt'); // Asegúrate de instalar bcrypt para el hash de contraseñas
const jwt = require('jsonwebtoken'); // Asegúrate de instalar jsonwebtoken

// Ruta para agregar un nuevo usuario
router.post('/add', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Se requiere un nombre de usuario y una contraseña' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10); // Hash de la contraseña

    const sql = 'INSERT INTO usuarios (username, password) VALUES (?, ?)';
    db.run(sql, [username, hashedPassword], function (err) {
        if (err) {
            console.error('Error al agregar el usuario:', err.message);
            return res.status(500).json({ error: 'Error al agregar el usuario' });
        }
        res.status(201).json({ id: this.lastID, username });
    });
});

// Ruta para login
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Se requiere un nombre de usuario y una contraseña' });
    }

    const sql = 'SELECT * FROM usuarios WHERE username = ?';
    db.get(sql, [username], (err, user) => {
        if (err) {
            console.error('Error al consultar el usuario:', err.message);
            return res.status(500).json({ success: false, message: 'Error en la consulta' });
        }

        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
        }

        // Generar un token JWT (opcional)
        const token = jwt.sign({ id: user.id, username: user.username }, 'SECRET_KEY', { expiresIn: '1h' });

        res.json({ success: true, token });
    });
});

module.exports = router;
