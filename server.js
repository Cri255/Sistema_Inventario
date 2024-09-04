// server.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt'); // Para hashing de contraseñas
const db = require('./config/db'); // Tu archivo de configuración de la base de datos
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para el inicio de sesión
app.post('/users/login', (req, res) => {
    const { username, password } = req.body;

    // Consultar el usuario en la base de datos
    db.get('SELECT * FROM usuarios WHERE username = ?', [username], (err, user) => {
        if (err) {
            console.error('Error al consultar el usuario:', err.message);
            return res.status(500).json({ success: false, message: 'Error en el servidor' });
        }

        if (!user) {
            return res.status(401).json({ success: false, message: 'Usuario no encontrado' });
        }

        // Verificar la contraseña
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                console.error('Error al comparar contraseñas:', err.message);
                return res.status(500).json({ success: false, message: 'Error en el servidor' });
            }

            if (result) {
                // Contraseña correcta
                res.json({ success: true });
            } else {
                // Contraseña incorrecta
                res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
            }
        });
    });
});

// Ruta para el dashboard
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Ruta para la página de inicio
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
