const express = require('express');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const PDFDocument = require('pdfkit');
const db = require('../../config/db'); // Asegúrate de que la ruta a tu db.js sea correcta

const router = express.Router();

const getEmpacadorData = (timePeriod, callback) => {
    const now = new Date().toISOString().split('T')[0]; // Fecha actual en formato ISO
    let query = '';

    switch(timePeriod) {
        case 'daily':
            query = `SELECT empacador_id, SUM(cantidad) as total_cantidad FROM empaques WHERE fecha >= DATE('now', 'start of day') GROUP BY empacador_id`;
            break;
        case 'weekly':
            query = `SELECT empacador_id, SUM(cantidad) as total_cantidad FROM empaques WHERE fecha >= DATE('now', 'start of week') GROUP BY empacador_id`;
            break;
        case 'monthly':
            query = `SELECT empacador_id, SUM(cantidad) as total_cantidad FROM empaques WHERE fecha >= DATE('now', 'start of month') GROUP BY empacador_id`;
            break;
        case 'annual':
            query = `SELECT empacador_id, SUM(cantidad) as total_cantidad FROM empaques WHERE fecha >= DATE('now', 'start of year') GROUP BY empacador_id`;
            break;
        default:
            return callback(new Error('Período de tiempo no válido'));
    }

    db.all(query, [], (err, rows) => {
        if (err) {
            return callback(err);
        }

        // Obtener los nombres de los empacadores
        const empacadoresQuery = 'SELECT id, nombre FROM empacadores';
        db.all(empacadoresQuery, [], (err, empacadores) => {
            if (err) {
                return callback(err);
            }

            const empacadorMap = empacadores.reduce((map, empacador) => {
                map[empacador.id] = empacador.nombre;
                return map;
            }, {});

            const data = rows.map(row => ({
                nombre: empacadorMap[row.empacador_id] || `Empacador ${row.empacador_id}`,
                total_cantidad: row.total_cantidad
            }));

            callback(null, data);
        });
    });
};

const generateReport = async (req, res, timePeriod) => {
    try {
        const data = await new Promise((resolve, reject) => {
            getEmpacadorData(timePeriod, (err, data) => {
                if (err) return reject(err);
                resolve(data);
            });
        });

        const chartJSNodeCanvas = new ChartJSNodeCanvas({ width: 600, height: 400 });
        
        const chartConfiguration = {
            type: 'bar',
            data: {
                labels: data.map(item => item.nombre),
                datasets: [{
                    label: 'Cantidad Empacada',
                    data: data.map(item => item.total_cantidad),
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        };

        const chartBuffer = await chartJSNodeCanvas.renderToBuffer(chartConfiguration);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="Informe_${timePeriod}.pdf"`);

        const doc = new PDFDocument();
        doc.pipe(res);
        doc.fontSize(25).text(`Informe ${timePeriod.charAt(0).toUpperCase() + timePeriod.slice(1)}`, { align: 'center' });
        doc.image(chartBuffer, { width: 500, align: 'center' });
        doc.end();
    } catch (err) {
        console.error('Error al generar el gráfico o PDF:', err);
        res.status(500).send('Error al generar el gráfico o PDF');
    }
};

// Rutas para generar informes
router.get('/generate-report/:period', (req, res) => {
    const { period } = req.params;
    if (['daily', 'weekly', 'monthly', 'annual'].includes(period)) {
        generateReport(req, res, period);
    } else {
        res.status(400).send('Período de tiempo no válido');
    }
});

module.exports = router;
