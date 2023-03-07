// Construimos una función para convertir el array data  en un array solo con los eventos futuros

function convert_array(array, property) {
  const currentDate = new Date(array.currentDate);
  const upcomingArray = [];

  for (let i = 0; i < array[property].length; i++) {
    const eventDate = new Date(array[property][i]['date']);

    if (eventDate > currentDate) {
      upcomingArray.push(array[property][i]);
    }
  }

  return upcomingArray;
}

const upcomingArray = convert_array(data, "events");
console.log(upcomingArray);

// Invocamos la función para enviar el template String al DOM

send_template_to_dom(upcomingArray, "containerId");

// Invocamos la funcion que crea las categorias a partir del array, envia los checkboxes y el search input al DOM

createCategories(upcomingArray);

// Invocamos la función searchEvents para que se ejecute al hacer click en el boton Search
// para esto se crea un evento de escucha para el boton Search y se le asigna la función searchEvents
// con una funcion callback anonima en base a  evento que llame a searchEvents y utilice nuestro array convertido.

const searchButton = document.querySelector('#searchButton');
searchButton.addEventListener('click', function (event) {
  searchEvents(upcomingArray);
});