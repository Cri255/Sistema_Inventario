const db = require('../../config/db');

// Obtener todos los empacadores
exports.getEmpacadores = (req, res) => {
    const query = 'SELECT id, nombre FROM empacadores';

    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Error al obtener empacadores:', err);
            res.status(500).send('Error al obtener empacadores');
        } else {clea
        }
    });
};

// Crear un nuevo empacador
exports.createEmpacador = (req, res) => {
    const { id, nombre, fecha_ingreso } = req.body;

    if (!id || !nombre || !fecha_ingreso) {
        return res.status(400).send('Faltan datos requeridos.');
    }

    const query = 'INSERT INTO empacadores (id, nombre, fecha_ingreso) VALUES (?, ?, ?)';

    db.run(query, [id, nombre, fecha_ingreso], function (err) {
        if (err) {
            console.error('Error al crear empacador:', err.message);
            return res.status(500).send('Error al crear empacador');
        }
        res.status(201).send('Empacador creado con éxito');
    });
};

// Obtener empacador por ID
exports.getEmpacadorById = (req, res) => {
    const { id } = req.params;

    db.get('SELECT * FROM empacadores WHERE id = ?', [id], (err, row) => {
        if (err) {
            console.error('Error al obtener empacador:', err.message);
            return res.status(500).send('Error al obtener empacador');
        }
        if (!row) {
            return res.status(404).send('Empacador no encontrado');
        }
        res.json(row);
    });
};

// Actualizar un empacador
exports.updateEmpacador = (req, res) => {
    const { id } = req.params;
    const { nombre, fecha_ingreso } = req.body;

    if (!nombre || !fecha_ingreso) {
        return res.status(400).send('Faltan datos requeridos.');
    }

    const query = 'UPDATE empacadores SET nombre = ?, fecha_ingreso = ? WHERE id = ?';

    db.run(query, [nombre, fecha_ingreso, id], function (err) {
        if (err) {
            console.error('Error al actualizar empacador:', err.message);
            return res.status(500).send('Error al actualizar empacador');
        }
        if (this.changes === 0) {
            return res.status(404).send('Empacador no encontrado');
        }
        res.status(200).send('Empacador actualizado con éxito');
    });
};

// Eliminar un empacador
exports.deleteEmpacador = (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM empacadores WHERE id = ?';

    db.run(query, [id], function (err) {
        if (err) {
            console.error('Error al eliminar empacador:', err.message);
            return res.status(500).send('Error al eliminar empacador');
        }
        if (this.changes === 0) {
            return res.status(404).send('Empacador no encontrado');
        }
        res.status(200).send('Empacador eliminado con éxito');
    });
};
