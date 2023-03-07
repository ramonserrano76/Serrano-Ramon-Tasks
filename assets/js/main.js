function mostrarDetalle(boton) {
    // Obtenemos la tarjeta que contiene el botón
    var tarjeta = boton.closest('.card');

    // Obtenemos los datos que necesitamos de la tarjeta
    var imagenUrl = tarjeta.querySelector('img').src;
    var titulo = tarjeta.querySelector('.card-title').textContent;
    var subtitulo = tarjeta.querySelector('.card-subtitle').textContent;
    var descripcion = tarjeta.querySelector('.card-text').textContent;
    var place = tarjeta.querySelector('#place-text').textContent;
    var date = tarjeta.querySelector('#date-text').textContent;
    var precio = tarjeta.querySelector('.text-muted').textContent;
    // Guardamos los datos en localStorage para poder acceder a ellos desde la página detail.html
    localStorage.setItem('imagenUrl', imagenUrl);
    localStorage.setItem('titulo', titulo);
    localStorage.setItem('subtitulo', subtitulo);
    localStorage.setItem('descripcion', descripcion);
    localStorage.setItem('place', place);
    localStorage.setItem('date', date);
    localStorage.setItem('precio', precio);
    // Redireccionamos a la página detail.html
    setTimeout(function () {
        window.location.href = './detail.html';
    }, 100); // se asigna un tiempo de esperar para que se cargue la info en detail.html y rebderizarla.
};

// contruimos una funcion para enviar al DOM el template string de la card tipo y llenarla con los 
// datos del array a través del id "containerId". Verificando que el id "containerId" esté presente en el html y sino genere un error.  

function send_template_to_dom(array, containerId) {
    // Inicializamos el DOM
    const html = document.getElementById(containerId);
    
    let template = "";
    for (const item of array) {
        template += `
        <!-- Tarjeta ${item._id} -->
        <div class="col-md-6 col-lg-3 mb-4" id="${item._id}">
            <div class="card p-3 d-flex align-items-stretch">
                <img class="card-img-top h-150 shadow w-100" src="${item.image}" style="height: 180px;">
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <h6 class="card-subtitle d-none">Subtitulo de la tarjeta</h6>
                    <p class="card-text">${item.description}</p>
                    <p id="place-text" class="card-text d-none" >Event place: ${item.place}</p>
                    <p id="date-text" class="card-text d-none" >Event date: ${item.date}</p>
                </div>
                <div class="card-footer d-flex justify-content-between">
                    <small class="text-muted align-self-center fw-bold">Price: $${item.price}</small>
                    <a href="javascript:void(0)" class="btn btn-sm btn-outline-secondary shadow btn-ver-mas"
                        onclick="mostrarDetalle(this)" data-id="${item._id}">See more</a>
                </div>
            </div>
        </div>
        `;
    }
    html.innerHTML = template;
};

// Construimos una funcion para enviar la seccion de checkbox de categorias y search input al DOM automaticamente, 
// colocandole los nombres de las categorias existentes en el array filtrado creado arriba. 

function createCategories(categories) {
    const categoryContainer = document.querySelector('#categoryContainer');
    const categoryMap = {};

    categories.forEach((categories) => {
        if (!categoryMap[categories.category]) { // verificar si la categoría ya existe para que no se repitan
            const categoryLabel = document.createElement('label');
            categoryLabel.classList.add('form-check-label');
            categoryLabel.setAttribute('for', categories.id);
            categoryLabel.textContent = categories.category;

            const categoryInput = document.createElement('input');
            categoryInput.classList.add('form-check-input', 'form-check-input-dark');
            categoryInput.setAttribute('type', 'checkbox');
            categoryInput.setAttribute('value', categories.category);
            categoryInput.setAttribute('id', categories.id);

            const categoryDiv = document.createElement('div');
            categoryDiv.classList.add('form-check', 'me-3');
            categoryDiv.appendChild(categoryInput);
            categoryDiv.appendChild(categoryLabel);

            categoryContainer.appendChild(categoryDiv);

            categoryMap[categories.category] = true; // agregar la categoría al mapa
        }
    });
    // Agregar el formulario de búsqueda después del ciclo forEach
    const searchForm = document.createElement('form');
    searchForm.classList.add('d-flex', 'me-3');

    const searchInput = document.createElement('input');
    searchInput.classList.add('form-control', 'me-2');
    searchInput.setAttribute('type', 'search');
    searchInput.setAttribute('placeholder', 'Search');
    searchInput.setAttribute('aria-label', 'Search');
    searchInput.setAttribute('id', 'searchText');

    const searchButton = document.createElement('button');
    searchButton.classList.add('btn', 'btn-outline-dark');
    searchButton.setAttribute('type', 'submit');
    searchButton.setAttribute('id', 'searchButton');

    const searchIcon = document.createElement('i');
    searchIcon.classList.add('bi', 'bi-search');

    searchButton.appendChild(searchIcon);

    searchForm.appendChild(searchInput);
    searchForm.appendChild(searchButton);

    categoryContainer.appendChild(searchForm);
};


// Por último creamos una funcion para la funcionalidad la busqueda con filtrado de categorias y texto de busqueda
// con criterios de búsqueda por name, place, description y price. Se reutilizan funciones ya creadas anteriormente.

function searchEvents(array) {
    event.preventDefault();
    const searchText = document.querySelector('#searchText').value;
    const categories = Array.from(document.querySelectorAll('input[type="checkbox"]'));
    const selectedCategories = categories.filter(category => category.checked).map(category => category.value);

    if (selectedCategories.length === 0) { // // si no hay categorías seleccionadas, mostrar todos los eventos, filtrar eventos por todas las categorias que existan y por texto de búsqueda
        // agregar todas las categorias al arreglo selectedCategories
        categories.forEach(category => selectedCategories.push(category.value));
        const filteredEvents = array.filter(event => {
            const containsSearchText =
                (event.name && event.name.toLowerCase().includes(searchText)) || // genera y convierte los criterios de busqueda a lowercase para hacerlo insensitivos a mayusc y minusc
                (event.place && event.place.toLowerCase().includes(searchText)) || // criterio de busqueda por place 
                (event.description && event.description.toLowerCase().includes(searchText)) || // criterio de busqueda por description
                (event.price && event.price.toString().includes(searchText)); // criterio de busqueda por price      
            const matchesCategory = selectedCategories.includes(event.category);
            return containsSearchText && matchesCategory;
        });;
        send_template_to_dom(filteredEvents, "containerId");
    } else { // filtrar eventos por categoría y texto de búsqueda
        const filteredEvents = array.filter(event => {
            const containsSearchText =
                (event.name && event.name.toLowerCase().includes(searchText)) || // genera y convierte los criterios de busqueda a lowercase para hacerlo insensitivos a mayusc y minusc
                (event.place && event.place.toLowerCase().includes(searchText)) || // criterio de busqueda por place 
                (event.description && event.description.toLowerCase().includes(searchText)) || // criterio de busqueda por description
                (event.price && event.price.toString().includes(searchText)); // criterio de busqueda por price   
            const matchesCategory = selectedCategories.includes(event.category);
            return containsSearchText && matchesCategory;
        });

        send_template_to_dom(filteredEvents, "containerId");
    }
};