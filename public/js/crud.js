$(document).ready(function() {
    let editId;

    // Función para cargar los datos
    function loadData() {
        $.ajax({
            url: '/api/registro', // Endpoint para obtener los registros
            method: 'GET',
            success: function(data) {
                let rows = '';
                data.forEach(item => {
                    rows += `
                        <tr>
                            <td>${item.id}</td>
                            <td>${item.nombre}</td>
                            <td>${item.fecha_ingreso}</td>
                            <td>
                                <button class="btn btn-warning btn-sm edit-btn" data-id="${item.id}">Editar</button>
                                <button class="btn btn-danger btn-sm delete-btn" data-id="${item.id}">Eliminar</button>
                            </td>
                        </tr>
                    `;
                });
                $('#data-table-body').html(rows);
            },
            error: function(error) {
                console.error('Error al obtener datos:', error);
            }
        });
    }

    // Cargar los datos al inicio
    loadData();

    // Manejar el envío del formulario de creación
    $('#createForm').submit(function(e) {
        e.preventDefault();
        const data = $(this).serialize();
        $.ajax({
            url: '/api/registro', // Endpoint para crear un nuevo registro
            method: 'POST',
            data: data,
            success: function(response) {
                $('#createModal').modal('hide');
                loadData();
            },
            error: function(error) {
                console.error('Error al crear registro:', error);
            }
        });
    });

    // Manejar el clic en el botón de editar
    $('#data-table-body').on('click', '.edit-btn', function() {
        editId = $(this).data('id');
        $.ajax({
            url: `/api/registro/${editId}`, // Endpoint para obtener un registro específico
            method: 'GET',
            success: function(data) {
                $('#editId').val(data.id);
                $('#editNombre').val(data.nombre);
                $('#editFechaIngreso').val(data.fecha_ingreso);
                $('#editModal').modal('show');
            },
            error: function(error) {
                console.error('Error al obtener registro para editar:', error);
            }
        });
    });

    // Manejar el envío del formulario de edición
    $('#editForm').submit(function(e) {
        e.preventDefault();
        const data = $(this).serialize();
        $.ajax({
            url: `/api/registro/${editId}`, // Endpoint para actualizar un registro específico
            method: 'PUT',
            data: data,
            success: function(response) {
                $('#editModal').modal('hide');
                loadData();
            },
            error: function(error) {
                console.error('Error al actualizar registro:', error);
            }
        });
    });

    // Manejar el clic en el botón de eliminar
    $('#data-table-body').on('click', '.delete-btn', function() {
        editId = $(this).data('id');
        $('#deleteModal').modal('show');
    });

    // Confirmar eliminación
    $('#confirmDelete').click(function() {
        $.ajax({
            url: `/api/registro/${editId}`, // Endpoint para eliminar un registro específico
            method: 'DELETE',
            success: function(response) {
                $('#deleteModal').modal('hide');
                loadData();
            },
            error: function(error) {
                console.error('Error al eliminar registro:', error);
            }
        });
    });
});
