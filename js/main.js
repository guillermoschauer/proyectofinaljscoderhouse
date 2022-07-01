class Servicio {
    constructor(nombre, apellido, email, ubicacion, pasajeros, estadia) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.ubicacion = ubicacion;
        this.pasajeros = pasajeros;
        this.estadia = estadia;
        
    }
}

//Variables
let storageCliente;
let miformulario = document.querySelector("#formulario");

//Listeners

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem("nombre")) {
        cargarTabla();
    }
} )

miformulario.addEventListener("submit", validarFormulario,);
$('#submit').on('click', guardar);
$('#submit').on('click', historial);


function guardar() {
    let nombre = document.querySelector("#nombre").value;
    let apellido = document.querySelector("#apellido").value;
    let email = document.querySelector("#email").value;

    localStorage.setItem("nombre", nombre);
    localStorage.setItem("apellido", apellido);
    localStorage.setItem("email", email); 
}

//Solcitamos la cantidad de pasajeros
function cantidadPasajeros() {
    let pasajeros = document.querySelector("#pasajeros").value;
        switch(pasajeros){
            case "2 PAX":
                return 2000;
            case "3 PAX":
                return 4000;
            case "4 PAX O MÁS":
                return 5000;
            default : 2000; 
        }
}

//Solicitamos duracion de la estadía

function duracionEstadia() {
    let estadia = document.querySelector("#estadia").value;;
        for (let i = 1; i >=15; i++);{
            return resultado = estadia * 20;
        }
}

//Solicitamos su ubicación aproximada para determinar moneda/billete

function billeteServicio() {
    let ubicacion = document.querySelector("#ubicacion").value;
    switch(ubicacion){
        case "ARGENTINA":
            return "ARS";
        case "CHILE":
            return "USD";
    }
}

//validamos el formulario

function validarFormulario(e) {
    //cancelamos el comportamiento del evento
    e.preventDefault();
    //obtenemos el elemento desde el cual se disparo el evento
    let miformulario = e.target

    const nombre = document.querySelector("#nombre").value; 
    const apellido = document.querySelector("#apellido").value;
    const email = document.querySelector("#email").value;
    const costoDeEstadia = cantidadPasajeros() + duracionEstadia();
    const arsusd = billeteServicio();


    const servicio = new Servicio(nombre, apellido, email, costoDeEstadia, arsusd);

    localStorage.setItem('historial', JSON.stringify(servicio));

    imprimir(servicio);

    miformulario.reset();

    $('#submit').on('click', aplicarEstilo());
    
    function aplicarEstilo() {
        document.getElementById("vent").style.display="block"
        
    };


}

//imprimimos el mensaje



function imprimir() {


 
    let costoDeEstadia = cantidadPasajeros() + duracionEstadia();
    let arsusd = billeteServicio();

    const nuevoDiv = document.createElement ("div");

    nuevoDiv.classList.add("item");
    nuevoDiv.setAttribute("class", "ventana");

    const h1 = document.createElement("h1");
    h1.textContent = `Hola ${nombre.value}, el costo total de su reserva será de $${costoDeEstadia} y deberá abonarlo en ${arsusd}.`;
    nuevoDiv.setAttribute("class","text-center");
    nuevoDiv.appendChild(h1);

    const p = document.createElement("p");
    p.textContent = `En breve recibirás un email a ${email.value} en caso de querer confirmar tu reserva.`;
    nuevoDiv.appendChild(p);
    p.setAttribute("class", "text-center");

    const img = document.createElement("img");
    img.src = "imagenes/like.png";
    nuevoDiv.appendChild(img);

    let base = document.querySelector("#vent");
    
    base.innerHTML = '';
    base.appendChild(nuevoDiv);

 
    document.getElementById("vent").style.display="none";
    $("#vent").slideDown(2000).slideUp(8000);
}


//Guardamos la informacion del presupuesto en el storage
function historial() {

    var nombre = document.querySelector("#nombre").value;
    var apellido = document.querySelector("#apellido").value;
    var costoDeEstadia = cantidadPasajeros() + duracionEstadia();
    var arsusd = billeteServicio();


    localStorage.setItem("nombre", nombre);
    localStorage.setItem("apellido", apellido);
    localStorage.setItem("costoDeEstadia", costoDeEstadia);
    localStorage.setItem("arsusd", arsusd);

    cargarTabla();
    
}



//Escuchamos el evento click del boton submit para agradecer la solicitud del presupuesto


$("#submit").click(() =>
$.ajax({
    url: '../index.json',
    success: function(respuesta) {
        $("#vent").prepend(`${respuesta[0].mensaje}`);
    },
    error: function() {
        console.log("No se ha podido obtener la información");
    }
}));


//Se modifica el dom con los ultimos presupuestos
function cargarTabla() {

    //Inserto los datos en la tabla
  
    var tr1 = document.createElement("tr");
    table.appendChild(tr1);

    var th4 = document.createElement("th");
    th4.textContent = `${localStorage.getItem("nombre")}`;
    tr1.appendChild(th4);

    var td1 = document.createElement("td");
    td1.textContent = `${localStorage.getItem("apellido")}`;
    tr1.appendChild(td1);

    var td2 = document.createElement("td");
    td2.textContent = `${localStorage.getItem("costoDeEstadia")}`;
    tr1.appendChild(td2);

    var td3 = document.createElement("td");
    td3.textContent = `${localStorage.getItem("arsusd")}`;
    tr1.appendChild(td3);

    let base1 = document.querySelector("#table").style.border="none";
    $(base1).hide()

    $(base1).slideDown(1000);
}