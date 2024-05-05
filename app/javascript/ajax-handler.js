"use stict";



document.addEventListener('DOMContentLoaded', function() {
    const createPostLink = document.getElementById('create-post-link');
    const homeLink = document.getElementById('home-link');
    //const editPostLink = document.getElementById('edit-post-link');
    const postsLink = document.getElementById('post-link');
    const profileLink = document.getElementById('profile-link');


    createPostLink.addEventListener('click', function(event) {
        event.preventDefault(); // Detiene el comportamiento predeterminado del enlace

        // Realizar una solicitud AJAX para cargar la página
        fetch('/create-post')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(html => {
                // Insertar el HTML de la página en el cuerpo del documento
                document.body.innerHTML = html;
                history.pushState(null, '', '/create-post');
                window.location.reload();
            })
            .catch(error => {
                console.error('Error fetching page:', error);
            });
    });


    homeLink.addEventListener('click', function(event) {
        event.preventDefault(); // Detiene el comportamiento predeterminado del enlace

        // Realizar una solicitud AJAX para cargar la página
        fetch('/home')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(html => {
                // Insertar el HTML de la página en el cuerpo del documento
                document.body.innerHTML = html;
                history.pushState(null, '', '/home');
                window.location.reload();
            })
            .catch(error => {
                console.error('Error fetching page:', error);
            });
    });
/* //FIXME: Descomentar cuando se haya implementado la funcionalidad de administrador
    editPostLink.addEventListener('click', function(event) {
        event.preventDefault(); // Detiene el comportamiento predeterminado del enlace

        // Realizar una solicitud AJAX para cargar la página
        fetch('/admin/posts')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(html => {
                // Insertar el HTML de la página en el cuerpo del documento
                document.body.innerHTML = html;
                history.pushState(null, '', '/home');
                window.location.reload();
            })
            .catch(error => {
                console.error('Error fetching page:', error);
            });
    });
    */
    postsLink.addEventListener('click', function(event) {
        event.preventDefault(); // Detiene el comportamiento predeterminado del enlace

        // Realizar una solicitud AJAX para cargar la página
        fetch('/posts')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(html => {
                // Insertar el HTML de la página en el cuerpo del documento
                document.body.innerHTML = html;
                history.pushState(null, '', '/posts');
                window.location.reload();
            })
            .catch(error => {
                console.error('Error fetching page:', error);
            });
    });

    profileLink.addEventListener('click', function(event) {
        event.preventDefault(); // Detiene el comportamiento predeterminado del enlace

        // Realizar una solicitud AJAX para cargar la página
        fetch('/profile')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(html => {
                // Insertar el HTML de la página en el cuerpo del documento
                document.body.innerHTML = html;
                history.pushState(null, '', '/profile');
                window.location.reload();
            })
            .catch(error => {
                console.error('Error fetching page:', error);
            });
    });

});