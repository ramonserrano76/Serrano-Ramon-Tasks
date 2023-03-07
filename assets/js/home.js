// Construimos una función para convertir el array data en un array listando todos los eventos.

function convert_array(array, property) {
    let new_array = [];
    for (let i = 0; i < array[property].length; i++) {
        new_array.push(array[property][i]);
    }

    return new_array;
}

//ejecutamos la funcion para obtener  new_array

const new_array = convert_array(data, "events");
console.log(new_array);

// Invocamos la función para enviar el template String al DOM

send_template_to_dom(new_array, "containerId");

// Invocamos la funcion que crea las categorias a partir del array, envia los checkboxes y el search input al DOM

createCategories(new_array);

// Invocamos la función searchEvents para que se ejecute al hacer click en el boton Search
// para esto se crea un evento de escucha para el boton Search y se le asigna la función searchEvents
// con una funcion callback anonima en base a  evento que llame a searchEvents y utilice nuestro array convertido.

const searchButton = document.querySelector('#searchButton');
searchButton.addEventListener('click', function (event) {
    searchEvents(new_array);
});