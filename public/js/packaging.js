$(document).ready(function() {
    // Obtener los productos desde la base de datos para las listas desplegables
    $.ajax({
        url: '/api/productos', // Asegúrate de que este endpoint devuelva los productos
        method: 'GET',
        success: function(data) {
            // Cargar productos en el acordeón "Producto Empacado"
            $('#productoEmpacado').empty(); // Limpiar la lista antes de llenarla
            // Cargar productos en el acordeón "Producto Recibido del Fritador"
            $('#productoFritador').empty(); // Limpiar la lista antes de llenarla

            data.forEach(function(producto) {
                $('#productoEmpacado').append(new Option(producto.nombre, producto.id));
                $('#productoFritador').append(new Option(producto.nombre, producto.id));
            });
        },
        error: function(error) {
            console.error('Error al obtener productos:', error);
        }
    });

    // Obtener los empacadores desde la base de datos
    $.ajax({
        url: '/api/empacadores', // Asegúrate de que este endpoint devuelva los empacadores
        method: 'GET',
        success: function(data) {
            $('#empacador').empty(); // Limpiar la lista antes de llenarla
            data.forEach(function(empacador) {
                $('#empacador').append(new Option(empacador.nombre, empacador.id));
            });
        },
        error: function(error) {
            console.error('Error al obtener empacadores:', error);
        }
    });

    // Manejar el envío del formulario de empaquetado
    $('#empaquetadoForm').submit(function(e) {
        e.preventDefault();
        const productoEmpacadoId = $('#productoEmpacado').val();
        const cantidadEmpacada = $('#cantidadEmpacada').val();
        const empacadorId = $('#empacador').val();

        // Realizar una solicitud POST al servidor para registrar el empaque
        $.ajax({
            url: '/api/empaques', // Endpoint para registrar el empaque
            method: 'POST',
            data: { productoEmpacadoId, cantidadEmpacada, empacadorId },
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

    // Manejar el envío del formulario de recibido fritador
    $('#recibidoFritadorForm').submit(function(e) {
        e.preventDefault();
        const productoFritadorId = $('#productoFritador').val();
        const cantidadRecibida = $('#cantidadRecibida').val();

        // Realizar una solicitud POST al servidor para registrar el producto recibido
        $.ajax({
            url: '/api/recibido-fritador', // Endpoint para registrar el producto recibido
            method: 'POST',
            data: { productoFritadorId, cantidadRecibida },
            success: function(response) {
                alert('Producto recibido registrado con éxito.');
                $('#recibidoFritadorForm')[0].reset(); // Limpiar el formulario
            },
            error: function(error) {
                console.error('Error al registrar el producto recibido:', error);
                alert('Ocurrió un error al registrar el producto recibido.');
            }
        });
    });
});
