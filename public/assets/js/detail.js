const API_URL = 'https://mindhub-xj03.onrender.com/api/amazing';
const DATA_FILE_PATH = './assets/js/data.js';
forceUpdate = false
let data = null;

if (!forceUpdate) {
    const response = fetch(API_URL)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            
            try {
                // Función para mostrar el detalle de cada evento
                // inicializo el DOM
                const detailHtml = document.getElementById("containerId")

                const querySearch = window.location.search

                const params = new URLSearchParams(querySearch).get("id")

                const item = data.events.find(item => item._id == params)

                if (item) {
                    detailHtml.innerHTML = `
                        <div class="col-md-6 mb-4">
                            <div class="card border rounded p-5">
                                <img class="card-img-top img-fluid shadow" src="${item.image}" 
                                    alt="Imagen">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="card-body border rounded mb-3 p-3">
                                <h2 class="card-title text-center mt-4 mb-3">${item.name}</h2>
                                <h5 class="card-subtitle mb-3 text-muted d-none">Subtítulo</h5>
                                <p class="card-text text-justify fs-4 mb-3">${item.description}</p>
                                <p id="place-text" class="card-text fs-6">Event place: ${item.place}</p>
                                <p id="date-text" class="card-text fs-6">Event date: ${item.date}</p>
                                <div class="card-footer d-flex justify-content-between mt-3 p-2">
                                    <a class="text-muted text-decoration-none align-self-center fw-bold fs-5">Price: ${item.price}</a>
                                    <a class="btn btn-lg btn-outline-secondary shadow" id="back-button">Back</a>
                                </div>
                            </div>
                        </div>
                        `
                } else {
                    detailHtml.innerHTML = `
                <h3 style="color: red; font-size:1.5em;">No hay detalles. . .</h3>
                `
                };
                // Definimos una función que nos permita volver a la página anterior
                function goBack() {
                    window.history.back();
                }
                // Agregamos un event listener al botón de volver para que llame a la función goBack() cuando se haga clic en él
                var backButton = document.querySelector('#back-button');
                backButton.addEventListener('click', goBack);
                // tambien se puede colocar la acción onClick y llamar a la funcion goBack() desde el boton y haria lo mismo.

            }
            catch (error) {
                console.error(`Error al obtener los datos de la API: ${err.message}`);

            }
            
        })
}

if (!data) {
    const response = fetch(DATA_FILE_PATH)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            try {
                // Función para mostrar el detalle de cada evento
                // inicializo el DOM

                const detailHtml = document.getElementById("containerId")

                const querySearch = window.location.search

                const params = new URLSearchParams(querySearch).get("id")

                const item = data.events.find(item => item._id == params)

                if (item) {
                    detailHtml.innerHTML = `
                        <div class="col-md-6 mb-4">
                            <div class="card border rounded p-5">
                                <img class="card-img-top img-fluid shadow" src="${item.image}" 
                                    alt="Imagen">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="card-body border rounded mb-3 p-3">
                                <h2 class="card-title text-center mt-4 mb-3">${item.name}</h2>
                                <h5 class="card-subtitle mb-3 text-muted d-none">Subtítulo</h5>
                                <p class="card-text text-justify fs-4 mb-3">${item.description}</p>
                                <p id="place-text" class="card-text fs-6">Event place: ${item.place}</p>
                                <p id="date-text" class="card-text fs-6">Event date: ${item.date}</p>
                                <div class="card-footer d-flex justify-content-between mt-3 p-2">
                                    <a class="text-muted text-decoration-none align-self-center fw-bold fs-5">Price: ${item.price}</a>
                                    <a class="btn btn-lg btn-outline-secondary shadow" id="back-button">Back</a>
                                </div>
                            </div>
                        </div>
                        `
                } else {
                    detailHtml.innerHTML = `
                <h3 style="color: red; font-size:1.5em;">No hay detalles. . .</h3>
                `
                };
                // Definimos una función que nos permita volver a la página anterior
                function goBack() {
                    window.history.back();
                }
                // Agregamos un event listener al botón de volver para que llame a la función goBack() cuando se haga clic en él
                var backButton = document.querySelector('#back-button');
                backButton.addEventListener('click', goBack);
                // tambien se puede colocar la acción onClick y llamar a la funcion goBack() desde el boton y haria lo mismo.

            }
            catch (error) {
                console.error(`Error al obtener los datos de la API: ${err.message}`);
            }
        })
}








