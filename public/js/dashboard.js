// dashboard.js
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.sidebar a');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const contentId = link.getAttribute('data-content');
            
            // Cargar contenido de los archivos HTML
            fetch(`${contentId}.html`)
                .then(response => response.text())
                .then(html => {
                    document.getElementById('content').innerHTML = html;
                })
                .catch(err => console.error('Error al cargar el contenido:', err));
        });
    });
});
