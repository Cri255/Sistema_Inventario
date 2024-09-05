const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./config/db'); // Asegúrate de que la ruta sea correcta

const app = express();
const PORT = 3000;

// Credenciales fijas para el login
const USERNAME = 'admin';
const PASSWORD = '1234';

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta de autenticación de login
app.post('/users/login', (req, res) => {
  const { username, password } = req.body;

  if (username === USERNAME && password === PASSWORD) {
    res.status(200).json({ success: true, message: 'Login exitoso' });
  } else {
    res.status(401).json({ success: false, message: 'Datos incorrectos' });
  }
});

app.get('/api/empacadores', (req, res) => {
  const query = 'SELECT id, nombre FROM empacadores';

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Error al obtener empacadores:', err);
      res.status(500).send('Error al obtener empacadores');
    } else {
      res.json(rows);
    }
  });
});

app.post('/api/empaques', (req, res) => {
  const { productoEmpacadoId, cantidadEmpacada, empacadorId } = req.body;

  if (!productoEmpacadoId || !cantidadEmpacada || !empacadorId) {
    return res.status(400).send('Faltan datos requeridos.');
  }

  const query = 'INSERT INTO empaques (producto_id, cantidad, empacador_id) VALUES (?, ?, ?)';

  db.run(query, [productoEmpacadoId, cantidadEmpacada, empacadorId], function (err) {
    if (err) {
      console.error('Error al registrar el empaque:', err);
      res.status(500).send('Error al registrar el empaque');
    } else {
      res.status(201).send('Empaque registrado con éxito');
    }
  });
});


// Ruta para obtener la lista de productos
app.get('/api/productos', (req, res) => {
  const query = 'SELECT id, nombre FROM productos';

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Error al obtener productos:', err);
      res.status(500).send('Error al obtener productos');
    } else {
      res.json(rows);
    }
  });
});

app.post('/api/recepciones', (req, res) => {
  console.log('Datos recibidos:', req.body); // Asegúrate de que estos datos sean correctos
  const { productoId, cantidad } = req.body;
  
  // Verifica que los valores no sean undefined o nulos
  if (productoId === undefined || cantidad === undefined) {
      return res.status(400).send('Faltan datos requeridos.');
  }

  const query = 'INSERT INTO recepciones (material_id, cantidad) VALUES (?, ?)';
  
  db.run(query, [productoId, cantidad], function (err) {
      if (err) {
          console.error('Error al registrar la recepción:', err);
          res.status(500).send('Error al registrar la recepción');
      } else {
          res.status(201).send('Recepción registrada con éxito');
      }
  });
});


// Ruta para registrar fritura de productos
app.post('/api/frituras', (req, res) => {
  const { productoFritoId, cantidadFrita } = req.body;
  const query = 'INSERT INTO frituras (material_id, cantidad) VALUES (?, ?)';

  db.run(query, [productoFritoId, cantidadFrita], function (err) {
    if (err) {
      console.error('Error al registrar la fritura:', err);
      res.status(500).send('Error al registrar la fritura');
    } else {
      res.status(201).send('Fritura registrada con éxito');
    }
  });
});

// Ruta para obtener todas las recepciones (opcional, si lo necesitas)
app.get('/api/recepciones', (req, res) => {
  const query = 'SELECT * FROM recepciones';

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Error al obtener recepciones:', err);
      res.status(500).send('Error al obtener recepciones');
    } else {
      res.json(rows);
    }
  });
});

// Middleware para manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
