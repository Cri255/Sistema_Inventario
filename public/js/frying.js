$(document).ready(function() {
    // Obtener los productos desde la base de datos para las listas desplegables
    $.ajax({
        url: '/api/productos', // Asegúrate de que este endpoint devuelva los productos
        method: 'GET',
        success: function(data) {
            // Llenar las listas desplegables con los productos obtenidos
            data.forEach(function(producto) {
                $('#productoRecibido').append(new Option(producto.nombre, producto.id));
                $('#productoFrito').append(new Option(producto.nombre, producto.id));
            });
        },
        error: function(error) {
            console.error('Error al obtener productos:', error);
        }
    });

    // Manejar el envío del formulario
    $('#friturasForm').submit(function(e) {
        e.preventDefault();
        const productoRecibidoId = $('#productoRecibido').val();
        const cantidadRecibida = $('#cantidadRecibida').val();
        const productoFritoId = $('#productoFrito').val();
        const cantidadFrita = $('#cantidadFrita').val();

        // Realizar una solicitud POST al servidor para registrar la fritura
        $.ajax({
            url: '/api/frituras', // Endpoint para registrar la fritura
            method: 'POST',
            data: { productoRecibidoId, cantidadRecibida, productoFritoId, cantidadFrita },
            success: function(response) {
                alert('Fritura registrada con éxito.');
                $('#friturasForm')[0].reset(); // Limpiar el formulario
            },
            error: function(error) {
                console.error('Error al registrar la fritura:', error);
                alert('Ocurrió un error al registrar la fritura.');
            }
        });
    });
});
