const API_URL = 'https://mindhub-xj03.onrender.com/api/amazing';
const DATA_FILE_PATH = './assets/js/data.js';

async function fetchData(forceUpdate = false) {
    let data = null;

    if (!forceUpdate) {
        // Si los datos están disponibles en la API, intenta cargar los datos de la API.
        try {
            const response = await fetch(API_URL);
            data = await response.json();
            console.log(data);
            pastArray = convert_arrayPast(data, 'events');
            console.log(pastArray);
            upcomingArray = convert_arrayUpcoming(data, 'events');
            console.log(upcomingArray);
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
            pastArray = convert_arrayPast(data, 'events');
            console.log(pastArray);
            upcomingArray = convert_arrayUpcoming(data, 'events');
            console.log(upcomingArray);
        }
        catch (err) {
            console.error(`Error al cargar los datos del archivo js ${DATA_FILE_PATH}: ${err.message}`);
        
        }
    }

    if (!data) {
        throw new Error('No se pudieron obtener los datos de ningún origen');
    }


    // Obtener los elementos de la tabla correspondientes

    const highestAttendanceEvent = document.querySelector('table tr:nth-child(2) td:nth-child(1)');
    const lowestAttendanceEvent = document.querySelector('table tr:nth-child(2) td:nth-child(2)');
    const largestCapacityEvent = document.querySelector('table tr:nth-child(2) td:nth-child(3)');

    // Buscar el evento con el mayor porcentaje de asistencia y actualizar su información
    const highestAttendance = pastArray.reduce((highest, event) => {
        const attendancePercentage = event.assistance / event.capacity;
        if (attendancePercentage > highest.attendancePercentage) {
            return { name: event.name, attendancePercentage };
        }
        return highest;
    }, { attendancePercentage: 0 });

    highestAttendanceEvent.textContent = `${highestAttendance.name} (${(highestAttendance.attendancePercentage * 100).toFixed(2)}%)`;

    // Buscar el evento con el menor porcentaje de asistencia y actualizar su información
    const lowestAttendance = pastArray.reduce((lowest, event) => {
        const attendancePercentage = event.assistance / event.capacity;
        if (attendancePercentage < lowest.attendancePercentage) {
            return { name: event.name, attendancePercentage };
        }
        return lowest;
    }, { attendancePercentage: 1 });

    lowestAttendanceEvent.textContent = `${lowestAttendance.name} (${(lowestAttendance.attendancePercentage * 100).toFixed(2)}%)`;

    // Buscar el evento con la mayor capacidad y actualizar su información
    const largestCapacity = pastArray.reduce((largest, event) => {
        if (event.capacity > largest.capacity) {
            return { name: event.name, capacity: event.capacity };
        }
        return largest;
    }, { capacity: 0 });

    largestCapacityEvent.textContent = `${largestCapacity.name} (${largestCapacity.capacity})`;


    // Escribimos el segundo y tercer encabezado de la tabla con los datos de pastArray y upcomingArray events
    updateTable(upcomingArray, 5);
    updateTable(pastArray, 13);


};
fetchData();

