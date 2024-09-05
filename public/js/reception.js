$(document).ready(function() {
    // Cargar productos en el dropdown
    $.ajax({
        url: '/api/productos',  // Ruta correcta en el servidor
        method: 'GET',
        success: function(productos) {
            console.log('Productos recibidos:', productos); // Verifica los productos recibidos en la consola
            const select = $('#productos'); // Selecciona el dropdown

            // Limpiar el dropdown antes de agregar opciones
            select.empty();
            select.append(new Option('Seleccione un producto', ''));

            // Agregar los productos como opciones al dropdown
            productos.forEach(producto => {
                select.append(new Option(producto.nombre, producto.id));
            });
        },
        error: function(xhr, status, error) {
            console.error('Error al cargar productos:', error); // Verifica si hay un error
        }
    });

    // Manejar el envío de formulario de recepción
    $('#formRecepcion').submit(function(e) {
        e.preventDefault(); // Evitar el envío del formulario tradicional

        const productoId = $('#productos').val();
        const cantidad = $('#cantidad').val();

        if (productoId === '') {
            alert('Por favor, selecciona un producto.');
            return;
        }

        $.ajax({
            url: '/api/recepciones', // Ruta correcta para registrar recepciones
            method: 'POST',
            data: { productoId, cantidad },
            success: function(response) {
                alert('Recepción registrada con éxito'); // Mensaje de éxito
                $('#formRecepcion')[0].reset(); // Limpiar el formulario
            },
            error: function(xhr, status, error) {
                console.error('Error al registrar la recepción:', error); // Verifica si hay un error
            }
        });
    });
});
