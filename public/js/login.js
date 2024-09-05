$(document).ready(function() {
    console.log('Document is ready'); // Verifica si el documento está listo

    $('.log-btn').click(function() {
        console.log('Login button clicked'); // Verifica si el botón está funcionando

        const username = $('#UserName').val();
        const password = $('#Password').val();

        $.ajax({
            url: '/users/login',
            method: 'POST',
            data: { username, password },
            success: function(response) {
                console.log('Server response:', response); // Verifica la respuesta del servidor
                if (response.success) {
                    window.location.href = '/dashboard.html'; // Redirigir al dashboard
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
