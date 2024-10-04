const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./src/routes/authRoutes');
const friturasRoutes = require('./src/routes/friturasRoutes');
const materialRoutes = require('./src/routes/materialRoutes');
const empaquesRoutes = require('./src/routes/empaquesRoutes');
const recepcionesRoutes = require('./src/routes/recepcionesRoutes');
const userRoutes = require('./src/routes/userRoutes');

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Rutas
app.use('/auth', authRoutes);
app.use('/frituras', friturasRoutes);
app.use('/materiales', materialRoutes);
app.use('/empaques', empaquesRoutes);
app.use('/recepciones', recepcionesRoutes);
app.use('/users', userRoutes);

module.exports = app;
