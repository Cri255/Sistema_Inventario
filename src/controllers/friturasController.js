const db = require('../../config/db');

// Registrar una fritura
exports.createFritura = (req, res) => {
    const { productoId, cantidad } = req.body;
    const fecha = new Date().toISOString();

    if (!productoId || !cantidad) {
        console.error('Producto o cantidad no proporcionados:', { productoId, cantidad });
        return res.status(400).send('Producto o cantidad no proporcionados');
    }

    const query = 'INSERT INTO frituras (fecha, material_id, cantidad) VALUES (?, ?, ?)';
    
    db.run(query, [fecha, productoId, cantidad], function (err) {
        if (err) {
            console.error('Error al registrar la fritura:', err.message);
            return res.status(500).send('Error al registrar la fritura');
        }
        console.log('Fritura registrada con éxito. ID:', this.lastID);
        res.status(201).send('Fritura registrada con éxito');
    });
};
