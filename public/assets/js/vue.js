const { createApp } = Vue

const app = createApp({

    data() {
        return{

        }
},
created(){
this.manguearDatos()

},
mounted(){

},
methods:{
    // Method
    manguearDatos(){
        fetch(this.urlApi)
        .then(response => response.json())
    .then(datosApi =>{
        console.log(datosApi)
        this.personajes = datosApi
    })
    .catch(error => console.log(error))}
},
computed:{
    // Computed
},
}).mount('#app')