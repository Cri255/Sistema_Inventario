const db = require('../../config/db');

// Registrar una recepción
exports.createRecepcion = (req, res) => {
    const { material_id, cantidad } = req.body;

    if (!material_id || !cantidad) {
        return res.status(400).send('Faltan datos requeridos.');
    }

    const query = 'INSERT INTO recepciones (material_id, cantidad, fecha) VALUES (?, ?, ?)';

    db.run(query, [material_id, cantidad, new Date().toISOString()], function (err) {
        if (err) {
            console.error('Error al registrar la recepción:', err.message);
            return res.status(500).send('Error al registrar la recepción');
        }
        res.status(201).send('Recepción registrada con éxito');
    });
};
