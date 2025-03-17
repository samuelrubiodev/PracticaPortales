import Portal from './portal.js'; 
let botonPortal = document.querySelector("#boton-portal");
let mensaje = document.querySelector("#mensaje");
let panelViajes = document.querySelector(".viajes");
let areaPortales = document.querySelector(".area-portales");
let fecha = document.querySelector("#fecha-actual");
let seHaViajado = false;

function actualizarFecha() {
    const date = new Date();
    if (!seHaViajado) {
        fecha.textContent = date.toISOString();
    }

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

let portales = []

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
    div.setAttribute("nombre", nombreCompleto);
    div.setAttribute("fechaDestino",fechaAleatoria);
    div.setAttribute("class","portal");

    div.style.background = "linear-gradient(90deg, " + colores[color1] + " 10%, " + colores[color2] + " 59%, " + colores[color3] + " 96%)";

    areaPortales.appendChild(div);
    mensaje.textContent = "";

    console.log("Se ha creado el portal: " + nombreCompleto);

    let portal = new Portal(nombreCompleto,fechaAleatoria, numero);
    portales.push(portal);

    div.addEventListener("click",()=>{
        let panelActual = panelViajes.querySelector("#portal-viaje");
        if (panelActual) {
            panelActual.remove(); 
        }

        seleccionarPortalPanelViajes(nombreCompleto,fechaAleatoria, div.getAttribute("idportal"));
    });
}

function seleccionarPortalPanelViajes(nombreCompleto, fechaAleatoria, idportal) {
    console.log("Seleccionado el portal: " + nombreCompleto + " con ID " + idportal + " y con  fecha de destino: " + fechaAleatoria);
    panelViajes.setAttribute("class","panel-viajes");

    let div = document.createElement("div");
    div.setAttribute("id","portal-viaje")

    let titulo = document.createElement("h1");

    titulo.textContent = nombreCompleto;
    titulo.setAttribute("id","titulo-portal");

    let fechaDestino = document.createElement("h4");

    fechaDestino.textContent = fechaAleatoria;
    fechaDestino.setAttribute("id","fecha-portal");

    let textarea = document.createElement("textarea");

    textarea.setAttribute("name","nota");
    textarea.setAttribute("id","nota");
    textarea.setAttribute("cols","50");
    textarea.setAttribute("rows","10");

    let br = document.createElement("br");

    let botonEliminar = document.createElement("button");
    botonEliminar.setAttribute("type","button");
    botonEliminar.setAttribute("id","boton-cerrar-portal");
    botonEliminar.textContent = "Cerrar portal";

    let botonViajar = document.createElement("button");
    botonViajar.setAttribute("type","button");
    botonViajar.setAttribute("id","boton-viajar-portal");
    botonViajar.textContent = "Viajar";

    div.appendChild(titulo);
    div.appendChild(fechaDestino);
    div.appendChild(textarea);
    div.appendChild(br);
    div.appendChild(botonViajar);
    div.appendChild(botonEliminar);

    panelViajes.appendChild(div);
    textarea.addEventListener("change", ()=>{
        guardarNota(idportal, textarea.value);
    });

    botonEliminar.addEventListener("click",()=> {
        console.log("Se va ha eliminar el portal: " + nombreCompleto)
        eliminarPortal(idportal);
        div.remove();
    });

    botonViajar.addEventListener("click",()=> {
        viajar(fechaAleatoria);
    });
}

function guardarNota(idPortal, nuevaNota) {
    for (let portal of portales) {
        if (portal.getIdPortal() == idPortal) {
            portal.setNota(nuevaNota);
            console.log(portal.getNota());
        }
    }
}


function eliminarPortal(idportal) {
    for (let childNode of areaPortales.childNodes) {
        if (childNode.nodeType == 1) {
            if (childNode.getAttribute("idportal") == idportal) {
                areaPortales.removeChild(childNode);
                seHaViajado = false;
                console.log("Se ha eliminado el portal: " + idportal)
                break;
            }
        } 
    }
}

function viajar(fechaPortal) {
    const date = fechaPortal;
    fecha.textContent = date
    seHaViajado = true;
}

function anomalias() {

}

setInterval(anomalias,30000);


function getNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

