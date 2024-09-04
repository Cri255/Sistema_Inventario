// public/js/login.js
$(document).ready(function() {
    $('.log-btn').click(function() {
        const username = $('#UserName').val();
        const password = $('#Password').val();

        $.ajax({
            url: '/users/login',
            method: 'POST',
            data: { username, password },
            success: function(response) {
                if (response.success) {
                    window.location.href = '/dashboard'; // Redirigir al dashboard
                } else {
                    $('.alert').text(response.message).show();
                }
            },
            error: function() {
                $('.alert').text('Datos Incorrectos').show();
            }
        });
    });
});
