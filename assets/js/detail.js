var imagenUrl = localStorage.getItem('imagenUrl');
var titulo = localStorage.getItem('titulo');
var descripcion = localStorage.getItem('descripcion');

var detailContainer = document.querySelector('#detail-container');

detailContainer.querySelector('img').src = imagenUrl;
detailContainer.querySelector('.card-title').textContent = titulo;
detailContainer.querySelector('.card-text').textContent = descripcion;

// Limpiamos los datos de localStorage para que no se guarden indefinidamente
localStorage.removeItem('imagenUrl');
localStorage.removeItem('titulo');
localStorage.removeItem('descripcion');