const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const app = express();

const productosRoutes = require('./src/routes/productosRoutes');

const authController = require('./src/controllers/authController');
const empacadoresController = require('./src/controllers/empacadoresController');
const friturasController = require('./src/controllers/friturasController');
const empaquesController = require('./src/controllers/empaquesController');
const recepcionesController = require('./src/controllers/recepcionesController');

const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'mi_clave_secreta',
    resave: false,
    saveUninitialized: true
}));

// Rutas de autenticación
app.post('/login', authController.login);
app.post('/logout', authController.logout);

// Rutas de productos
app.use('/productos', productosRoutes);

// Rutas de empacadores 
app.get('/empacadores', empacadoresController.getEmpacadores);
app.post('/empacadores', empacadoresController.createEmpacador);
app.get('/empacadores/:id', empacadoresController.getEmpacadorById);
app.put('/empacadores/:id', empacadoresController.updateEmpacador);
app.delete('/empacadores/:id', empacadoresController.deleteEmpacador);

// Rutas de frituras
app.post('/frituras', friturasController.createFritura);

// Rutas de empaques
app.get('/empaques', empaquesController.getEmpaques);
app.post('/empaques', empaquesController.createEmpaque);

// Rutas de recepciones
app.post('/recepciones', recepcionesController.createRecepcion);

// Middleware para servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));  
});

app.get('/dashboard', (req, res) => {
    if (req.session.user) {
        res.sendFile(path.join(__dirname, 'public', 'dashboard.html')); // Cambia el nombre de archivo según corresponda
    } else {
        res.status(401).send('No autorizado'); 
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
