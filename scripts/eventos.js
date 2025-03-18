import { getFechaAleatoria, getNumeroAleatorio } from './util.js';

let botonOculto = document.querySelector("#boton-oculto");
let fecha = document.querySelector("#fecha-actual");
let areaPortales = document.querySelector(".area-portales");

botonOculto.addEventListener("click", ()=>{
    eventoColapsoTemporal();
    setInterval(eventoColapsoTemporal, 100);
});

function eventoColapsoTemporal () {
    let fechaInicio = new Date(Date.UTC(-2999, 0, 1));
    let fechaFin = new Date(Date.UTC(3000, 11, 31));

    let fechaAleatoria = getFechaAleatoria(fechaInicio, fechaFin);

    let fechaFormateada = fechaAleatoria.toISOString().split("T")[0];

    fecha.textContent = fechaFormateada;

    for (let childNode of areaPortales.childNodes) {
        if (childNode.nodeType == 1) {
            let posicionTop = getNumeroAleatorio(1,5);
            let posicionLeft = getNumeroAleatorio(1,90);
            let posicionRight = getNumeroAleatorio(1,90);
            
            childNode.style.position = "absolute";
            childNode.style.top = posicionTop + "em";
            childNode.style.left = posicionLeft + "em";
            childNode.style.right = posicionRight + "em";
        }
    }
}