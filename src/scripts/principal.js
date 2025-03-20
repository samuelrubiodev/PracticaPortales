import { getFechaAleatoria, getColor, cambiarNota, getColores } from './util.js';

let botonPortal = document.querySelector("#boton-portal");
let mensaje = document.querySelector("#mensaje-energia");
let mensajeAnomalias = document.querySelector("#mensaje-anomalias");
let panelViajes = document.querySelector(".viajes");
let areaPortales = document.querySelector(".area-portales");
let fecha = document.querySelector("#fecha-actual");

let seHaViajado = false;
let inversionTemporal = false;
let portalInestable = false;
let paradojaVisual = false;
let colapsoTemporal = false;

let id = 0;

areaPortales.setAttribute("inversionTemporal", "false");
areaPortales.setAttribute("portalInestable","false");
areaPortales.setAttribute("paradojaVisual","false");

botonPortal.addEventListener("click",generarPortal);

function actualizar() {
    colapsoTemporal = areaPortales.getAttribute("colapsoTemporal") === "true";
    
    const date = new Date();
    
    if (!seHaViajado && !colapsoTemporal) {
        fecha.textContent = date.toLocaleString();
    }

    if (areaPortales.childNodes.length - 1 >= 5) {
        mensaje.textContent = "¡Límite de energía temporal alcanzado!";
    } else {
        mensaje.textContent = "";
    }
}

setInterval(actualizar, 1000);
actualizar();

function generarPortal() {
    if (areaPortales.childNodes.length - 1 >= 5) {
        return;
    }

    let nombreInicial = "Cronosfera Alpha";
    id++;

    let nombreCompleto = nombreInicial + "-" + id;

    let fechaInicio = new Date(Date.UTC(-2999, 0, 1));
    let fechaFin = new Date(Date.UTC(3000, 11, 31));

    const fechaAleatoria = getFechaAleatoria(fechaInicio,fechaFin);

    let div = document.createElement("div");
    div.setAttribute("idportal",id);
    div.setAttribute("nombre", nombreCompleto);
    div.setAttribute("fechaDestino",fechaAleatoria);
    div.setAttribute("nota","");
    div.setAttribute("class","portal");

    div.style.background = getColor(getColores());

    areaPortales.appendChild(div);
    mensaje.textContent = "";

    console.log("Se ha creado el portal: " + nombreCompleto);
    let audio = new Audio("./src/audio/bloop.mp3");
    audio.play();

    div.addEventListener("click",()=>{
        let panelActual = panelViajes.querySelector("#portal-viaje");
        if (panelActual) {
            panelActual.remove(); 
        }

        inversionTemporal = areaPortales.getAttribute("inversionTemporal") === "true";
        portalInestable = areaPortales.getAttribute("portalInestable") === "true";
        paradojaVisual = areaPortales.getAttribute("paradojaVisual") === "true";

        if (inversionTemporal || portalInestable || paradojaVisual) {
            inversionTemporal = false;
            portalInestable = false;
            paradojaVisual = false;
            mensajeAnomalias.textContent = "";
            areaPortales.setAttribute("inversionTemporal", "false");
            areaPortales.setAttribute("portalInestable","false");
            areaPortales.setAttribute("paradojaVisual","false");
            console.log("Se ha estabilizado el sistema");
        }

        seleccionarPortalPanelViajes(nombreCompleto,fechaAleatoria, div.getAttribute("idportal"), div);
    });
}

function seleccionarPortalPanelViajes(nombreCompleto, fechaAleatoria, idportal, elementoPadre) {
    console.log("Seleccionado el portal: " + nombreCompleto + " con ID " + idportal + " y con  fecha de destino: " + fechaAleatoria);
    panelViajes.setAttribute("class","panel-viajes");
    
    let div = document.createElement("div");
    let titulo = document.createElement("h1");
    let fechaDestino = document.createElement("h4");
    let textarea = document.createElement("textarea");
    let br = document.createElement("br");
    let botonEliminar = document.createElement("button");
    let imgEliminar = document.createElement("img");
    let botonViajar = document.createElement("button");
    let botonUp = document.createElement("button");
    let imgViajar = document.createElement("img");
    let imgUp = document.createElement("img");
    
    div.setAttribute("id","portal-viaje")
    
    titulo.textContent = nombreCompleto;
    titulo.setAttribute("id","titulo-portal");

    fechaDestino.textContent = fechaAleatoria;
    fechaDestino.setAttribute("id","fecha-portal");

    if (elementoPadre.getAttribute("nota") != null) {
        textarea.value = elementoPadre.getAttribute("nota");
    }

    textarea.setAttribute("name","nota");
    textarea.setAttribute("id","nota");
    textarea.setAttribute("cols","50");
    textarea.setAttribute("rows","10");
    textarea.setAttribute("placeholder","Ingrese aquí una nota.");
    
    botonEliminar.setAttribute("type","button");
    botonEliminar.setAttribute("id","boton-cerrar-portal");
    botonEliminar.setAttribute("class","boton-image")

    botonViajar.setAttribute("type","button");
    botonViajar.setAttribute("id","boton-viajar-portal");
    botonViajar.setAttribute("class","boton-image");

    botonUp.setAttribute("type","button");
    botonUp.setAttribute("id","boton-up-portal");
    botonUp.setAttribute("class","boton-image");
    
    imgViajar.setAttribute("src","./src/img/travel.svg");
    imgViajar.setAttribute("alt","Una imagen de un reloj con una flecha hacia atras");
    
    imgEliminar.setAttribute("src","./src/img/trash.svg")
    imgEliminar.setAttribute("alt","Una imagen de una papelera");
    
    imgUp.setAttribute("src","./src/img/arrow_up.svg");
    imgUp.setAttribute("alt","Una imagen de una flecha hacia arriba");
    
    botonUp.appendChild(imgUp);
    botonViajar.appendChild(imgViajar);
    botonEliminar.appendChild(imgEliminar);

    div.appendChild(titulo);
    div.appendChild(fechaDestino);
    div.appendChild(textarea);
    div.appendChild(br);
    div.appendChild(botonUp);
    div.appendChild(botonViajar);
    div.appendChild(botonEliminar);

    panelViajes.appendChild(div);

    scrollView(botonViajar);

    textarea.addEventListener("change", ()=>{
        guardarNota(idportal, textarea.value);
    });

    botonUp.addEventListener("click",()=>{
        scrollView(document.querySelector(".menu-panel"));
    });

    botonEliminar.addEventListener("click",()=> {
        scrollView(document.querySelector(".menu-panel"));
        let audio = new Audio("./src/audio/drop-sound.mp3");
        audio.play();
        eliminarPortal(idportal);
        div.remove();
        panelViajes.removeAttribute("class");
        
    });

    botonViajar.addEventListener("click",()=> {
        viajar(fechaAleatoria);
        scrollView(document.querySelector(".menu-panel"));
    });
}

function guardarNota(idPortal, nuevaNota) {
    let childNodes = areaPortales.childNodes;

    for (let portal of childNodes) {
        if (portal.nodeType == 1) {
            if (portal.getAttribute("idportal") == idPortal) {
                cambiarNota(portal,nuevaNota);
            }
        } 
    }
}

function eliminarPortal(idportal) {
    for (let childNode of areaPortales.childNodes) {
        if (childNode.nodeType == 1) {
            if (childNode.getAttribute("idportal") == idportal) {
                childNode.style.animation = "portal-fade 1s ease 0s 1 normal none";
                childNode.addEventListener("animationend", () =>{
                    childNode.remove()
                });
                seHaViajado = false;
                console.log("Se ha eliminado el portal: " + idportal);
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

function scrollView(elemento) {
    elemento.scrollIntoView({
        behavior: "smooth",
        block: "center"
    })
}