const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt'); // Solo una vez
const { registrarRecepcion, registrarFritura, obtenerProductos } = require('./public/js/frying'); 
const router = express.Router();

const app = express();
const port = 3000;
app.use(router);

app.use(express.static(path.join(__dirname, 'public')));

// Ruta de la base de datos
const dbPath = path.resolve(__dirname, 'inventario.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err.message);
    } else {
        console.log('Conectado a la base de datos Eseculito.');
        console.log('Base de datos:', dbPath);
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuración de la sesión
app.use(session({
    secret: 'mi_clave_secreta',
    resave: false,
    saveUninitialized: true
}));

// --------------------------------------------- RUTAS PARA RECEPCIÓN Y FRITURA ---------------------------------------------
// Usamos express.Router() para organizar las rutas


// Ruta para registrar productos recibidos (Empacadores)
router.post('/api/recepcion', (req, res) => {
    const { productoId, cantidad } = req.body;

    // Validación de entrada
    if (!productoId || !cantidad) {
        return res.status(400).json({ message: 'Por favor, complete todos los campos.' });
    }

    // Llamamos a la función para registrar la recepción en la base de datos
    registrarRecepcion(productoId, cantidad, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al registrar la recepción', error: err });
        }
        res.json(result);
    });
});

// Ruta para registrar frituras de productos
router.post('/api/fritura', (req, res) => {
    const { productoId, cantidad } = req.body;

    // Validación de entrada
    if (!productoId || !cantidad) {
        return res.status(400).json({ message: 'Por favor, complete todos los campos.' });
    }

    // Llamamos a la función para registrar la fritura en la base de datos
    registrarFritura(productoId, cantidad, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al registrar la fritura', error: err });
        }
        res.json(result);
    });
});

// Ruta para obtener productos desde la base de datos
router.get('/api/productos', (req, res) => {
    const query = 'SELECT id, nombre FROM productos';
    console.log('query', query, dbPath, db);
    
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Error al obtener productos:', err.message);
            return res.status(500).json({ message: 'Error al obtener productos' });
        }
        res.json({ message: 'success', data: rows });
    });
});

// --------------------------------------------- FIN DE LAS RUTAS ---------------------------------------------

// Usamos el Router para todas las rutas de la API

// --------------------------------------------- RUTAS DE LOGIN Y DASHBOARD ---------------------------------------------


const password = '1234';

// Encriptamos la contraseña
bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
        console.error('Error al encriptar la contraseña:', err);
    } else {
        // Ahora 'hashedPassword' es la contraseña encriptada
        const USERS = { username: 'admin', password: hashedPassword };

        // Verificar en el login
        app.post('/users/login', (req, res) => {
            const { username, password } = req.body;

            if (username === USERS.username) {
                bcrypt.compare(password, USERS.password, (err, isMatch) => {
                    if (err) {
                        return res.status(500).json({ message: 'Error al verificar la contraseña' });
                    }
                    if (isMatch) {
                        req.session.user = username; // Guardar usuario en la sesión
                        res.json({ success: true, message: 'Bienvenido!' });
                    } else {
                        res.json({ success: false, message: 'Credenciales incorrectas' });
                    }
                });
            } else {
                res.json({ success: false, message: 'Credenciales incorrectas' });
            }
        });
    }
});


// Ruta para servir la página del dashboard, solo si el usuario está autenticado
app.get('/dashboard', (req, res) => {
    if (req.session.user) {
        res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
    } else {
        res.status(401).send('No autorizado');
    }
});

// Ruta para servir la página de inicio (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// --------------------------------------------- INICIO DEL SERVIDOR ---------------------------------------------

// Iniciar el servidor en el puerto especificado
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
