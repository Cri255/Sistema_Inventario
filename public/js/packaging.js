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

    $('#empaquetadoForm').submit(function(e) {
        e.preventDefault();
        const productoEmpacadoId = $('#productoEmpacado').val();
        const cantidadEmpacada = $('#cantidadEmpacada').val();
        const fecha = new Date().toISOString(); // Agregar fecha actual
    
        // Realizar una solicitud POST al servidor para registrar el producto empacado
        $.ajax({
            url: '/api/empaques',
            method: 'POST',
            contentType: 'application/json', // Asegúrate de que el tipo de contenido sea JSON
            data: JSON.stringify({ fecha, material_id: productoEmpacadoId, cantidad: cantidadEmpacada, empacador_id: $('#empacador').val() }),
            success: function(response) {
                alert('Producto empacado registrado con éxito.');
                $('#empaquetadoForm')[0].reset(); // Limpiar el formulario
            },
            error: function(error) {
                console.error('Error al registrar el producto empacado:', error);
                alert('Ocurrió un error al registrar el producto empacado.');
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
            url: '/api/recibido-fritador',
            method: 'POST',
            contentType: 'application/json', // Asegúrate de que el tipo de contenido sea JSON
            data: JSON.stringify({ producto: productoFritadorId, cantidad: cantidadRecibida }),
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
