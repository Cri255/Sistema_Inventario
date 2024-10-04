const db = require('../../config/db');

// Registrar un empaque
exports.createEmpaque = (req, res) => {
    const { fecha, material_id, cantidad, empacador_id } = req.body;

    if (!fecha || !material_id || !cantidad || !empacador_id) {
        return res.status(400).send('Faltan datos requeridos.');
    }

    const query = 'INSERT INTO empaques (fecha, material_id, cantidad, empacador_id) VALUES (?, ?, ?, ?)';

    db.run(query, [fecha, material_id, cantidad, empacador_id], function (err) {
        if (err) {
            console.error('Error al registrar el empaque:', err.message);
            return res.status(500).send('Error al registrar el empaque');
        }
        res.status(201).send('Empaque registrado con éxito');
    });
};

// Obtener todos los empaques
exports.getEmpaques = (req, res) => {
    const query = 'SELECT * FROM empaques';

    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Error al obtener empaques:', err.message);
            return res.status(500).send('Error al obtener empaques');
        }
        res.json(rows);
    });
};
