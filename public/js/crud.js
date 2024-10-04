$(document).ready(function() {
    // Cargar empacadores al inicio
    loadData();

    // Crear empacador
    $('#createForm').submit(function(e) {
        e.preventDefault();
        const data = {
            id: $('#createId').val(),
            nombre: $('#createNombre').val(),
            fecha_ingreso: $('#createFechaIngreso').val()
        };
        $.ajax({
            url: '/api/empacadores',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function(response) {
                $('#createModal').modal('hide');
                loadData();
            },
            error: function(error) {
                console.error('Error al crear empacador:', error);
            }
        });
    });

    // Leer empacadores
    function loadData() {
        $.ajax({
            url: '/api/empacadores',
            method: 'GET',
            success: function(data) {
                $('#empacadoresTable').empty();
                data.forEach(empacador => {
                    $('#empacadoresTable').append(`
                        <tr>
                            <td>${empacador.id}</td>
                            <td>${empacador.nombre}</td>
                            <td>${empacador.fecha_ingreso}</td>
                            <td>
                                <button class="btn btn-primary edit-btn" data-id="${empacador.id}">Editar</button>
                                <button class="btn btn-danger delete-btn" data-id="${empacador.id}">Eliminar</button>
                            </td>
                        </tr>
                    `);
                });
                // Asociar eventos de edición y eliminación
                $('.edit-btn').click(editEmpacador);
                $('.delete-btn').click(deleteEmpacador);
            },
            error: function(error) {
                console.error('Error al cargar empacadores:', error);
            }
        });
    }

    // Editar empacador
    function editEmpacador() {
        const id = $(this).data('id');
        $.ajax({
            url: `/api/empacadores/${id}`,
            method: 'GET',
            success: function(data) {
                $('#editId').val(data.id);
                $('#editNombre').val(data.nombre);
                $('#editFechaIngreso').val(data.fecha_ingreso);
                $('#editModal').modal('show');
            },
            error: function(error) {
                console.error('Error al obtener empacador para edición:', error);
            }
        });
    }

    // Actualizar empacador
    $('#editForm').submit(function(e) {
        e.preventDefault();
        const id = $('#editId').val();
        const data = {
            nombre: $('#editNombre').val(),
            fecha_ingreso: $('#editFechaIngreso').val()
        };
        $.ajax({
            url: `/api/empacadores/${id}`,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function(response) {
                $('#editModal').modal('hide');
                loadData();
            },
            error: function(error) {
                console.error('Error al actualizar empacador:', error);
            }
        });
    });

    // Eliminar empacador
    function deleteEmpacador() {
        const id = $(this).data('id');
        $.ajax({
            url: `/api/empacadores/${id}`,
            method: 'DELETE',
            success: function(response) {
                loadData();
            },
            error: function(error) {
                console.error('Error al eliminar empacador:', error);
            }
        });
    }
});
