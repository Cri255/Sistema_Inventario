$(document).ready(function() {
    console.log('Document is ready'); // Verifica si el documento está listo

    $('#login-form').submit(function(e) {
        e.preventDefault(); // Evita el comportamiento predeterminado de submit

        const username = $('#UserName').val();
        const password = $('#Password').val();

        $.ajax({
            url: '/users/login',
            method: 'POST',
            data: { username, password },
            success: function(response) {
                console.log('Server response:', response); // Verifica la respuesta del servidor
                if (response.success) {
                    window.location.href = '/dashboard'; // Redirigir al dashboard
                } else {
                    $('.alert').text(response.message).show();
                }
            },
            error: function(xhr, status, error) {
                console.error('AJAX error:', status, error); // Verifica errores AJAX
                $('.alert').text('Datos Incorrectos').show();
            }
        });
    });
});
