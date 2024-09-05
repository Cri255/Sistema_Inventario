$(document).ready(function() {
    // Obtener los productos desde la base de datos para las listas desplegables
    $.ajax({
        url: '/api/productos', // Asegúrate de que este endpoint devuelva los productos
        method: 'GET',
        success: function(data) {
            // Llenar las listas desplegables con los productos obtenidos
            data.forEach(function(producto) {
                $('#productoFritador').append(new Option(producto.nombre, producto.id));
                $('#productoEmpacado').append(new Option(producto.nombre, producto.id));
            });
        },
        error: function(error) {
            console.error('Error al obtener productos:', error);
        }
    });

    // Manejar el envío del formulario
    $('#empaquetadoForm').submit(function(e) {
        e.preventDefault();
        const productoFritadorId = $('#productoFritador').val();
        const cantidadRecibida = $('#cantidadRecibida').val();
        const productoEmpacadoId = $('#productoEmpacado').val();
        const cantidadEmpacada = $('#cantidadEmpacada').val();

        // Realizar una solicitud POST al servidor para registrar el empaque
        $.ajax({
            url: '/api/empaques', // Endpoint para registrar el empaque
            method: 'POST',
            data: { productoFritadorId, cantidadRecibida, productoEmpacadoId, cantidadEmpacada },
            success: function(response) {
                alert('Empaque registrado con éxito.');
                $('#empaquetadoForm')[0].reset(); // Limpiar el formulario
            },
            error: function(error) {
                console.error('Error al registrar el empaque:', error);
                alert('Ocurrió un error al registrar el empaque.');
            }
        });
    });
});
