let botonPortal = document.querySelector("#boton-portal");
let mensaje = document.querySelector("#mensaje");
let panelViajes = document.querySelector(".viajes");
let areaPortales = document.querySelector(".area-portales");

function actualizarFecha() {
    let fecha = document.querySelector("#fecha-actual");

    const date = new Date();

    fecha.textContent = date.toISOString();

    if (areaPortales.childNodes.length - 1 >= 5) {
        mensaje.textContent = "¡Límite de energía temporal alcanzado!";
    } else {
        mensaje.textContent = "";
    }
}

setInterval(actualizarFecha, 1000);
actualizarFecha();

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
    if (areaPortales.childNodes.length - 1 >= 5) {
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
    div.setAttribute("idportal",numero);
    div.setAttribute("class","portal");

    div.style.background = "linear-gradient(90deg, " + colores[color1] + " 10%, " + colores[color2] + " 59%, " + colores[color3] + " 96%)";

    areaPortales.appendChild(div);
    mensaje.textContent = "";

    div.addEventListener("click",()=>{
        if (panelViajes.childNodes.length > 0) {
            panelViajes.removeChild(panelViajes.childNodes[0]);
        }

        seleccionarPortalPanelViajes(nombreCompleto,fechaAleatoria, numero);
    });
}

function seleccionarPortalPanelViajes(nombreCompleto, fechaAleatoria, idportal) {
    console.log("Nombre: " + nombreCompleto);
    console.log("Fecha destino: " + fechaAleatoria);

    panelViajes.setAttribute("class","panel-viajes");

    let div = document.createElement("div");
    div.setAttribute("id","portal-viaje")

    let titulo = document.createElement("h1");

    titulo.textContent = nombreCompleto;

    let fechaDestino = document.createElement("h4");

    fechaDestino.textContent = fechaAleatoria;

    let textarea = document.createElement("textarea");

    textarea.setAttribute("name","nota");
    textarea.setAttribute("id","nota");
    textarea.setAttribute("cols","50");
    textarea.setAttribute("rows","10");

    let br = document.createElement("br");

    let boton = document.createElement("button");
    boton.setAttribute("type","button");
    boton.setAttribute("id","boton-cerrar-portal");
    boton.textContent = "Cerrar portal";

    div.appendChild(titulo);
    div.appendChild(fechaDestino);
    div.appendChild(textarea);
    div.appendChild(br);
    div.appendChild(boton);

    panelViajes.appendChild(div);

    boton.addEventListener("click",()=> {
        eliminarPortal(idportal)
        panelViajes.removeChild(panelViajes.childNodes[0]);
    });
}

function eliminarPortal(idportal) {
    for (let childNode of areaPortales.childNodes) {
        if (childNode.nodeType == 1) {
            if (childNode.getAttribute("idportal") == idportal) {
                areaPortales.removeChild(childNode);
            }
        } 
    }
}


function getNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }