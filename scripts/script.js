function actualizarFecha() {
    let fecha = document.querySelector("#fecha-actual");

    const date = new Date();

    fecha.textContent = date.toISOString();
}

setInterval(actualizarFecha, 1000);
actualizarFecha();

let botonPortal = document.querySelector("#boton-portal");

botonPortal.addEventListener("click",generarPortal);

let numero = 0;

const colores = [
    'rgba(255, 0, 0, 1)',   
    'rgba(0, 255, 0, 1)',   
    'rgba(0, 0, 255, 1)',   
    'rgba(255, 255, 0, 1)', 
    'rgba(0, 255, 255, 1)',
    'rgba(255, 0, 255, 1)',
    'rgba(255, 165, 0, 1)', 
    'rgba(128, 0, 128, 1)', 
    'rgba(0, 0, 0, 1)',  
    'rgba(255, 255, 255, 1)'
];

function generarPortal() {
    let areaPortales = document.querySelector(".area-portales");

    if (areaPortales.childNodes.length - 1 >= 5) {
        alert("No se pueden crear mas de 5 portales");
        return;
    }

    let nombreInicial = "Cronosfera Alpha";
    numero++;

    let nombreCompleto = nombreInicial + "-" + numero;

    const anio3000AC = -3000 * 365.25 * 24 * 60 * 60 * 1000;
    const anio3000DC = 3000 * 365.25 * 24 * 60 * 60 * 1000;

    const fechaElegida = getNumeroAleatorio(anio3000AC,anio3000DC);
    let fechaAleatoria = new Date(fechaElegida);

    const color1 = getNumeroAleatorio(1,colores.length);
    const color2 = getNumeroAleatorio(1,colores.length);
    const color3 = getNumeroAleatorio(1,colores.length);

    let div = document.createElement("div");
    div.setAttribute("class","portal");

    div.style.background = "linear-gradient(90deg, " + colores[color1] + " 10%, " + colores[color2] + " 59%, " + colores[color3] + " 96%)";

    areaPortales.appendChild(div);
}


function getNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }