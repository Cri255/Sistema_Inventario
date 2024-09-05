$(document).ready(function() {
    // Obtener los productos desde la base de datos para las listas desplegables
    $.ajax({
        url: '/api/productos', // Asegúrate de que este endpoint devuelva los productos
        method: 'GET',
        success: function(data) {
            // Limpiar las listas desplegables antes de llenarlas
            $('#productoRecibido').empty();
            $('#productoFrito').empty();

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

    // Manejar el envío del formulario de recepción
    $('#recibidoForm').submit(function(e) {
        e.preventDefault();
        const productoRecibidoId = $('#productoRecibido').val();
        const cantidadRecibida = $('#cantidadRecibida').val();

        // Realizar una solicitud POST al servidor para registrar la recepción
        $.ajax({
            url: '/api/recepciones', // Endpoint para registrar la recepción
            method: 'POST',
            data: { productoRecibidoId, cantidadRecibida },
            success: function(response) {
                alert('Recepción registrada con éxito.');
                $('#recibidoForm')[0].reset(); // Limpiar el formulario
            },
            error: function(error) {
                console.error('Error al registrar la recepción:', error);
                alert('Ocurrió un error al registrar la recepción.');
            }
        });
    });

    // Manejar el envío del formulario de fritura
    $('#fritoForm').submit(function(e) {
        e.preventDefault();
        const productoFritoId = $('#productoFrito').val();
        const cantidadFrita = $('#cantidadFrita').val();

        // Realizar una solicitud POST al servidor para registrar la fritura
        $.ajax({
            url: '/api/frituras', // Endpoint para registrar la fritura
            method: 'POST',
            data: { productoFritoId, cantidadFrita },
            success: function(response) {
                alert('Fritura registrada con éxito.');
                $('#fritoForm')[0].reset(); // Limpiar el formulario
            },
            error: function(error) {
                console.error('Error al registrar la fritura:', error);
                alert('Ocurrió un error al registrar la fritura.');
            }
        });
    });
});
