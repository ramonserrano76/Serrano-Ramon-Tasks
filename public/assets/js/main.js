// Construimos una función para convertir el array data en un array listando todos los eventos.
function convert_arrayAll(array, property) {
    let new_array = [];

    for (let i = 0; i < array[property].length; i++) {
        new_array.push(array[property][i]);
    }
    return new_array;
};

// Construimos una función para convertir el array data  en un array solo con los eventos pasados
function convert_arrayPast(array, property) {

    const currentDate = array.currentDate;
    const pastArray = [];
    try {
        for (let i = 0; i < array[property].length; i++) {
            const eventDate = array[property][i]['date'];

            if (eventDate <= currentDate) {
                pastArray.push(array[property][i]);
            }
        }
        return pastArray;
    } catch (err) {
        console.error(`Error al obtener los datos de eventos: ${err.message}`);
    }
};

// Construimos una función para convertir el array data  en un array solo con los eventos futuros
function convert_arrayUpcoming(array, property) {
    const currentDate = new Date(array.currentDate);
    const upcomingArray = [];
    try {
        for (let i = 0; i < array[property].length; i++) {
            const eventDate = new Date(array[property][i]['date']);

            if (eventDate > currentDate) {
                upcomingArray.push(array[property][i]);
            }
        }
        return upcomingArray;
    } catch (err) {
        console.error(`Error al obtener los datos de eventos: ${err.message}`);
    }
};


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
                    <a href="./detail.html?id=${item._id}" class="btn btn-sm btn-outline-secondary shadow btn-ver-mas"
                        data-id="${item._id}">See more</a>
                </div>
            </div>
        </div>
        `;
    }
    html.innerHTML = template;
};

// Construimos una funcion para enviar la seccion de checkbox de categorias y search input al DOM automaticamente,
// colocandole los nombres de las categorias existentes en el array filtrado creado arriba.

function createCategories(categories, events) {
    const categoryContainer = document.querySelector('#categoryContainer');
    const categoryMap = {};

    categories.forEach((category) => {
        if (!categoryMap[category.category]) {
            const categoryLabel = document.createElement('label');
            categoryLabel.classList.add('form-check-label');
            categoryLabel.setAttribute('for', category._id);
            categoryLabel.textContent = category.category;

            const categoryInput = document.createElement('input');
            categoryInput.classList.add('form-check-input');
            categoryInput.setAttribute('type', 'checkbox');
            categoryInput.setAttribute('value', category.category);
            categoryInput.setAttribute('id', category._id);
            categoryInput.setAttribute('name', category.category);

            const categoryDiv = document.createElement('div');
            categoryDiv.classList.add('form-check', 'me-3');
            categoryDiv.setAttribute('id', 'checkboxId');

            categoryDiv.appendChild(categoryInput);
            categoryDiv.appendChild(categoryLabel);

            categoryContainer.appendChild(categoryDiv)            

            categoryMap[category.category] = true;
        }
    });

    // agregar el formulario de búsqueda
    const searchForm = document.createElement('form');
    searchForm.classList.add('d-flex', 'me-3');
    searchForm.setAttribute('id', 'checkboxId');

    const searchInput = document.createElement('input');
    searchInput.classList.add('form-control', 'me-2');
    searchInput.setAttribute('type', 'search');
    searchInput.setAttribute('placeholder', 'Search');
    searchInput.setAttribute('aria-label', 'Search');
    searchInput.setAttribute('id', 'searchText');

    const searchButton = document.createElement('button');
    searchButton.classList.add('btn', 'btn-outline-dark', 'disabled');
    searchButton.setAttribute('type', 'submit');
    searchButton.setAttribute('id', 'searchButton');

    const searchIcon = document.createElement('i');
    searchIcon.classList.add('bi', 'bi-xbox');

    searchButton.appendChild(searchIcon);

    searchForm.appendChild(searchInput);
    searchForm.appendChild(searchButton);

    categoryContainer.appendChild(searchForm);
}


function searchEvents(array) {
    event.preventDefault();
    const searchText = document.querySelector('#searchText').value;
    const categories = Array.from(document.querySelectorAll('input[type="checkbox"]'));
    const selectedCategories = categories.filter(category => category.checked).map(category => category.value);

    if (selectedCategories.length === 0) { // si no hay categorías seleccionadas, mostrar todos los eventos, filtrar eventos por todas las categorias que existan y por texto de búsqueda
        // agregar todas las categorias al arreglo selectedCategories
        categories.forEach(category => selectedCategories.push(category.value));
    }

    const filteredEvents = array.filter(event => {
        const containsSearchText =
            (event.name && (event.name.includes(searchText) ||
                event.name.toLowerCase().includes(searchText) ||
                event.name.toUpperCase().includes(searchText))) ||
            (event.place && (event.place.includes(searchText) ||
                event.place.toLowerCase().includes(searchText) ||
                event.place.toUpperCase().includes(searchText))) ||
            (event.description && (event.description.includes(searchText) ||
                event.description.toLowerCase().includes(searchText) ||
                event.description.toUpperCase().includes(searchText))) ||
            (event.price && event.price.toString().includes(searchText));
        const matchesCategory = selectedCategories.includes(event.category);
        return containsSearchText && matchesCategory;
    });

    const container = document.querySelector("#containerId");
    container.innerHTML = "";

    if (filteredEvents.length === 0) {
        const message = document.createElement("p");
        message.classList.add("text-center", "alert", "alert-danger", "mt-5");
        message.setAttribute("role", "alert")
        message.textContent = "¡Oops! Nothing found here!";
        container.appendChild(message);
    } else {
        send_template_to_dom(filteredEvents, "containerId");
    }
}


function updateTable(array, row) {
    // Verificar si el array de eventos tiene la propiedad 'assistance'
    const hasAssistanceProperty = array.some(event => event.hasOwnProperty('assistance'));

    // Si el array no tiene la propiedad 'assistance', renombrar la propiedad 'estimate' a 'assistance' en cada evento
    if (!hasAssistanceProperty) {
        array.forEach(event => {
            if (event.hasOwnProperty('estimate')) {
                event.assistance = event.estimate;
                delete event.estimate;
            }
        });
    }

    // Obtener los ingresos totales y la asistencia por categoría
    const revenueAndAttendanceByCategory = array.reduce((result, event) => {

        const { category, assistance, capacity, price, revenue = (assistance * price), } = event;

        // Inicializar el objeto de la categoría si aún no existe
        if (!result[category]) {
            result[category] = { assistance: 0, capacity: 0, revenue: 0, };
        }

        // Agregar los ingresos y la asistencia del evento a la categoría correspondiente
        result[category].assistance += assistance;
        result[category].capacity += capacity;
        result[category].revenue += revenue;

        return result;

    }, {});

    // Calcular el porcentaje de asistencia combinado para cada categoría
    Object.values(revenueAndAttendanceByCategory).forEach(categoryData => {
        const attendancePercentage = ((categoryData.assistance) / (categoryData.capacity) * 100).toFixed(2);
        categoryData.percentage = attendancePercentage;
    });

    // Actualizar la tabla con la información correspondiente
    const categories = Object.keys(revenueAndAttendanceByCategory);
    for (let i = row; i < row + categories.length; i++) {
        const categoryEvent = document.querySelector(`table tr:nth-child(${i}) td:nth-child(1)`);
        const revenueByCategory = document.querySelector(`table tr:nth-child(${i}) td:nth-child(2)`);
        const attendancePercentageByCategory = document.querySelector(`table tr:nth-child(${i}) td:nth-child(3)`);
        const categoryItem = categories[i - row];
        const categoryData = revenueAndAttendanceByCategory[categoryItem];
        const revenue = categoryData.revenue;
        const attendancePercentage = categoryData.percentage;
        categoryEvent.textContent = categoryItem;
        revenueByCategory.textContent = `$${revenue.toFixed(0)}`;
        attendancePercentageByCategory.textContent = `${attendancePercentage}%`;
    }
};
