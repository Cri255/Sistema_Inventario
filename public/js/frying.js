$(document).ready(function() {
    // Obtener los productos desde la base de datos para las listas desplegables
    $.ajax({
        url: '/api/productos', // Asegúrate de que esta URL sea correcta
        method: 'GET',
        success: function(data) {
            // Limpiar las listas desplegables antes de llenarlas
            $('#productoRecibido').empty();
            $('#productoFrito').empty();

            // Llenar las listas desplegables con los productos obtenidos
            if (Array.isArray(data) && data.length > 0) {
                data.forEach(function(producto) {
                    $('#productoRecibido').append(new Option(producto.nombre, producto.id));
                    $('#productoFrito').append(new Option(producto.nombre, producto.id));
                });
            } else {
                $('#productoRecibido').append(new Option('No hay productos disponibles', ''));
                $('#productoFrito').append(new Option('No hay productos disponibles', ''));
            }
        },
        error: function(error) {
            console.error('Error al obtener productos:', error);
            alert('Ocurrió un error al cargar los productos.');
        }
    });

    // Manejar el envío del formulario de recepción
    $('#recibidoForm').submit(function(e) {
        e.preventDefault();
        const productoRecibidoId = $('#productoRecibido').val();
        const cantidadRecibida = $('#cantidadRecibida').val();
    
        // Validar los datos
        if (!productoRecibidoId || !cantidadRecibida) {
            alert('Por favor, complete todos los campos.');
            return;
        }
    
        // Realizar una solicitud POST al servidor para registrar la recepción
        $.ajax({
            url: '/api/recibidos_recepcion',
            method: 'POST',
            data: { productoId: productoRecibidoId, cantidad: cantidadRecibida },
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

        // Validar los datos
        if (!productoFritoId || !cantidadFrita) {
            alert('Por favor, complete todos los campos.');
            return;
        }

        // Realizar una solicitud POST al servidor para registrar la fritura
        $.ajax({
            url: '/api/frituras',
            method: 'POST',
            data: { productoId: productoFritoId, cantidad: cantidadFrita }, // Asegúrate de que los nombres coincidan
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
