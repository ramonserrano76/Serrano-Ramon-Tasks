function mostrarDetalle(boton) {
    // Obtenemos la tarjeta que contiene el botón
    var tarjeta = boton.closest('.card');

    // Obtenemos los datos que necesitamos de la tarjeta
    var imagenUrl = tarjeta.querySelector('img').src;
    var titulo = tarjeta.querySelector('.card-title').textContent;
    var descripcion = tarjeta.querySelector('.card-text').textContent;

    // Guardamos los datos en localStorage para poder acceder a ellos desde la página detail.html
    localStorage.setItem('imagenUrl', imagenUrl);
    localStorage.setItem('titulo', titulo);
    localStorage.setItem('descripcion', descripcion);

    // Redireccionamos a la página detail.html
    setTimeout(function () {
        window.location.href = './detail.html';
    }, 100);
}