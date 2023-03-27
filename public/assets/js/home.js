const API_URL = 'https://mindhub-xj03.onrender.com/api/amazing';
const DATA_FILE_PATH = './assets/js/data.js';

async function obtenerDatosDeEventos(forceUpdate = false) {
    let data = null;

    if (!forceUpdate) {
        // Si los datos están disponibles en la API, intenta cargar los datos de la API.
        try {

            const response = await fetch(API_URL);
            data = await response.json();
            console.log(data);
            const new_array = convert_arrayAll(data, 'events');
            send_template_to_dom(new_array, 'containerId');
            createCategories(new_array);
            const searchInput = document.querySelector('#searchText');
            searchInput.addEventListener('input', () => {
                const searchValue = searchInput.value.trim(); // obtener el valor actual del campo de búsqueda
                searchEvents(new_array);
            });
            const categoryInput = document.querySelectorAll('input[type="checkbox"]');
            categoryInput.forEach(categoryId => {
                categoryId.addEventListener('change', function (event) {
                    searchEvents(new_array);
                });
            });      
        }
        catch (err) {
            console.error(`Error al obtener los datos de la API: ${err.message}`);
        }

        // Sobrescribe el archivo data.js con los nuevos datos
        // const blob = new blob([data], 'data.js', { type: 'text/javascript' });
        // saveAs(blob, 'data.js');
    }

    if (!data) {
        try {
            // Si no están disponibles desde la API, intenta obtener los datos desde data.js
            const response = await fetch(DATA_FILE_PATH);
            data = await response.json();
            console.log(data);
            const new_array = await convert_arrayAll(data, 'events');
            send_template_to_dom(new_array, 'containerId');
            createCategories(new_array);
            const searchInput = document.querySelector('#searchText');
            searchInput.addEventListener('input', () => {
                const searchValue = searchInput.value.trim(); // obtener el valor actual del campo de búsqueda
                searchEvents(new_array);
            });
            const categoryInput = document.querySelectorAll('input[type="checkbox"]');
            categoryInput.forEach(categoryId => {
                categoryId.addEventListener('change', function (event) {
                    searchEvents(new_array);
                });
            });      
        }
        catch (err) {
            console.error(`Error al cargar los datos del archivo js ${DATA_FILE_PATH}: ${err.message}`);
            throw err;
        }
    }

    if (!data) {
        throw new Error('No se pudieron obtener los datos de ningún origen');
    }
    console.log(data);
    return data;
};

const data = obtenerDatosDeEventos();