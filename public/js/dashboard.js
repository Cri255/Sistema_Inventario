document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.sidebar a');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const contentId = link.getAttribute('data-content');
            
            // Cambiar el src del iframe en lugar de cargar el contenido en un div
            const iframe = document.getElementById('content-frame');
            iframe.src = `${contentId}.html`;
        });
    });
});
