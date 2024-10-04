// controllers/productosController.js
const productos = []; // Suponiendo que tienes una lista de productos

const getProductos = (req, res) => {
    res.json(productos); // Devuelve la lista de productos
};

const createProducto = (req, res) => {
    const nuevoProducto = req.body; // Asumiendo que envías el producto en el cuerpo de la solicitud
    productos.push(nuevoProducto); // Agrega el producto a la lista
    res.status(201).json(nuevoProducto); // Devuelve el producto creado
};

module.exports = {
    getProductos,
    createProducto,
};
