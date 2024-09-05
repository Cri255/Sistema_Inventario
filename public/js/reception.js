$(document).ready(function() {
    // Obtener los productos desde la base de datos
    $.ajax({
        url: '/api/productos', // Asegúrate de que este endpoint devuelva los productos
        method: 'GET',
        success: function(data) {
            // Llenar la lista desplegable con los productos obtenidos
            data.forEach(function(producto) {
                $('#producto').append(new Option(producto.nombre, producto.id));
            });
        },
        error: function(error) {
            console.error('Error al obtener productos:', error);
        }
    });

    // Manejar el envío del formulario
    $('#receptionForm').submit(function(e) {
        e.preventDefault();
        const productoId = $('#producto').val();
        const cantidad = $('#cantidad').val();

        // Realizar una solicitud POST al servidor para registrar la recepción
        $.ajax({
            url: '/api/recepciones', // Endpoint para registrar la recepción
            method: 'POST',
            data: { productoId, cantidad },
            success: function(response) {
                alert('Recepción registrada con éxito.');
                $('#receptionForm')[0].reset(); // Limpiar el formulario
            },
            error: function(error) {
                console.error('Error al registrar la recepción:', error);
                alert('Ocurrió un error al registrar la recepción.');
            }
        });
    });
});
