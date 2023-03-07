// Definimos variables con los datos que necesitamos en la tarjeta de detail
var imagenUrl = localStorage.getItem('imagenUrl');
var titulo = localStorage.getItem('titulo');
var subtitulo = localStorage.getItem('subtitulo');
var descripcion = localStorage.getItem('descripcion');
var place = localStorage.getItem('place');
var date = localStorage.getItem('date');
var precio = localStorage.getItem('precio');
var detailContainer = document.querySelector('#detail-container');

// Escribimos los datos guardados de localStorage para poder escribirlos hasta la tarjeta detail
detailContainer.querySelector('img').src = imagenUrl;
detailContainer.querySelector('.card-title').textContent = titulo;
detailContainer.querySelector('.card-subtitle').textContent = subtitulo;
detailContainer.querySelector('.card-text').textContent = descripcion;
detailContainer.querySelector('#place-text').textContent = place;
detailContainer.querySelector('#date-text').textContent = date;
detailContainer.querySelector('a').textContent = precio;

// // Limpiamos los datos de localStorage para que no se guarden indefinidamente
// localStorage.removeItem('imagenUrl');
// localStorage.removeItem('titulo');
// localStorage.removeItem('descripcion');


// Definimos una función que nos permita volver a la página anterior
function goBack() {
    window.history.back();
}
// Agregamos un event listener al botón de volver para que llame a la función goBack() cuando se haga clic en él
var backButton = document.querySelector('#back-button');
backButton.addEventListener('click', goBack);
// tambien se puede colocar la acción onClick y llamar a la funcion goBack() desde el boton y haria lo mismo.
 

