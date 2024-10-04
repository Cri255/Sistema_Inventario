$(document).ready(function() {
    // Cargar productos en el dropdown al cargar la página
    $.ajax({
        url: '/productos',  // Asegúrate de que esta sea la ruta correcta en el servidor
        method: 'GET',
        success: function(response) {
            console.log('Productos recibidos:', response); // Verifica la respuesta completa en la consola

            const productos = response.data; // Accede a la lista de productos dentro del objeto "data"
            const select = $('#productos'); // Selecciona el dropdown

            // Limpiar el dropdown antes de agregar opciones
            select.empty();
            select.append(new Option('Seleccione un producto', ''));

            // Verificar si hay productos disponibles
            if (Array.isArray(productos) && productos.length > 0) {
                // Agregar los productos como opciones al dropdown
                productos.forEach(producto => {
                    select.append(new Option(producto.nombre, producto.id));
                });
                console.log(productos);
            } else {
                select.append(new Option('No hay productos disponibles', ''));
            }
        },
        error: function(xhr, status, error) {
            console.error('Error al cargar productos:', error); // Verifica si hay un error
            $('#message').html('<div class="alert alert-danger">Error al cargar productos. Por favor, inténtalo más tarde.</div>');
        }
    });
});
