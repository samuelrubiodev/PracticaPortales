import { getFechaAleatoria, getNumeroAleatorio, getColor } from './util.js';

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
let seHaGeneradoTiempoRestante = false;
let tiempoRestante = null;

function actualizar() {
    const date = new Date();

    if (inversionTemporal && areaPortales.childNodes.length -1 > 0) {
        if (!seHaGeneradoTiempoRestante) {
            tiempoRestante = new Date();
            seHaGeneradoTiempoRestante = true;
        }

        tiempoRestante.setSeconds(tiempoRestante.getSeconds() - 1);
        fecha.textContent = tiempoRestante.toISOString();
    } else if (!seHaViajado) {
        fecha.textContent = date.toISOString();
    }

    if (areaPortales.childNodes.length - 1 >= 5) {
        mensaje.textContent = "¡Límite de energía temporal alcanzado!";
    } else {
        mensaje.textContent = "";
    }
}

setInterval(actualizar, 1000);
actualizar();

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
    'rgba(255, 255, 255, 1)', 
    'rgba(75, 0, 130, 1)',      
    'rgba(255, 99, 71, 1)',   
    'rgba(34, 139, 34, 1)',     
    'rgba(255, 192, 203, 1)', 
    'rgba(147, 112, 219, 1)', 
    'rgba(0, 128, 128, 1)',    
    'rgba(210, 105, 30, 1)',   
    'rgba(255, 69, 0, 1)',     
    'rgba(70, 130, 180, 1)',    
    'rgba(255, 215, 0, 1)'
];


function generarPortal() {
    if (areaPortales.childNodes.length - 1 >= 5) {
        return;
    }

    let nombreInicial = "Cronosfera Alpha";
    numero++;

    let nombreCompleto = nombreInicial + "-" + numero;

    let fechaInicio = new Date(Date.UTC(-2999, 0, 1));
    let fechaFin = new Date(Date.UTC(3000, 11, 31));

    const fechaAleatoria = getFechaAleatoria(fechaInicio,fechaFin);

    let div = document.createElement("div");
    div.setAttribute("idportal",numero);
    div.setAttribute("nombre", nombreCompleto);
    div.setAttribute("fechaDestino",fechaAleatoria);
    div.setAttribute("nota","");
    div.setAttribute("class","portal");

    div.style.background = getColor(colores);

    areaPortales.appendChild(div);
    mensaje.textContent = "";

    console.log("Se ha creado el portal: " + nombreCompleto);
    let audio = new Audio("./audio/bloop.mp3");
    audio.play();

    div.addEventListener("click",()=>{
        let panelActual = panelViajes.querySelector("#portal-viaje");
        if (panelActual) {
            panelActual.remove(); 
        }

        if (inversionTemporal || portalInestable || paradojaVisual) {
            inversionTemporal = false;
            portalInestable = false;
            paradojaVisual = false;
            seHaGeneradoTiempoRestante = false;
            mensajeAnomalias.textContent = "";
            console.log("Se ha estabilizado el sistema");
        }

        seleccionarPortalPanelViajes(nombreCompleto,fechaAleatoria, div.getAttribute("idportal"), div);
    });
}

function seleccionarPortalPanelViajes(nombreCompleto, fechaAleatoria, idportal, elementoPadre) {
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

    if (elementoPadre.getAttribute("nota") != null) {
        textarea.value = elementoPadre.getAttribute("nota");
    }

    textarea.setAttribute("name","nota");
    textarea.setAttribute("id","nota");
    textarea.setAttribute("cols","50");
    textarea.setAttribute("rows","10");

    let br = document.createElement("br");

    let botonEliminar = document.createElement("button");
    botonEliminar.setAttribute("type","button");
    botonEliminar.setAttribute("id","boton-cerrar-portal");
    botonEliminar.setAttribute("class","boton");
    botonEliminar.textContent = "Cerrar portal";

    let botonViajar = document.createElement("button");
    botonViajar.setAttribute("type","button");
    botonViajar.setAttribute("id","boton-viajar-portal");
    botonViajar.setAttribute("class","boton");
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
        let audio = new Audio("./audio/drop-sound.mp3");
        audio.play();
        eliminarPortal(idportal);
        div.remove();
        panelViajes.removeAttribute("class");
    });

    botonViajar.addEventListener("click",()=> {
        viajar(fechaAleatoria);
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

function cambiarFecha(portal, nuevaFecha) {
    portal.setAttribute("fechadestino",nuevaFecha);
}

function cambiarNota(portal, nuevaNota) {
    portal.setAttribute("nota", nuevaNota);
}

let segundosAnomalias = getNumeroAleatorio(30000,60000);

function generarAnomalia() {   
    if (areaPortales.childNodes.length -1 > 0) {
        segundosAnomalias = getNumeroAleatorio(30000,60000);
        let numeroAleatorio = getNumeroAleatorio(1,3);

        switch (numeroAleatorio) {
            case 1:
                inversionTemporal = true;
                break;
            case 2:
                portalInestable = true;
                break;
            case 3:
                paradojaVisual = true;
                break;
        }
    
        mensajeAnomalias.textContent = "¡Anomalía detectada! Estabiliza el sistema";
    
        console.log("Se ha generado la anomalía: " + numeroAleatorio);
    }
}

setInterval(generarAnomalia,segundosAnomalias);
generarAnomalia();

function anomaliaPortalInestable() {
    if (portalInestable && areaPortales.childNodes.length -1 > 0) {
        let portalAleatorio = getNumeroAleatorio(1,areaPortales.childNodes.length - 1);

        let childNodes = areaPortales.childNodes;

        for (let portal of childNodes) {
            if (portal.nodeType == 1) {
                if (portal.getAttribute("idportal") == portalAleatorio) {
                    let fechaInicio = new Date(Date.UTC(-2999, 0, 1));
                    let fechaFin = new Date(Date.UTC(3000, 11, 31));

                    const fechaAleatoria = getFechaAleatoria(fechaInicio,fechaFin);

                    cambiarFecha(portal, fechaAleatoria);
                }
            } 
        }
    }
};

setInterval(anomaliaPortalInestable,5000);
anomaliaPortalInestable();

let segundos = 0;

function anomaliaParadojaVisual() {
    if (paradojaVisual && areaPortales.childNodes.length - 1> 0 && segundos <= 10) {
        segundos++;
        let childNodes = areaPortales.childNodes;

        for (let childNode of childNodes) {
            if (childNode.nodeType == 1) {
                childNode.style.background = getColor(colores);
                let tamano = getNumeroAleatorio(1,8) + "em";
                childNode.style.height = tamano;
                childNode.style.width = tamano;
            }
        }
    }
}

setInterval(anomaliaParadojaVisual,1000);
anomaliaParadojaVisual();