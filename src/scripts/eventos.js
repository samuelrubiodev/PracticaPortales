import { getFechaAleatoria, getNumeroAleatorio, cambiarFecha, getColores, getColor } from './util.js';

let botonOculto = document.querySelector("#boton-oculto");
let fecha = document.querySelector("#fecha-actual");
let areaPortales = document.querySelector(".area-portales");
let mensajeAnomalias = document.querySelector("#mensaje-anomalias");

let inversionTemporal = false;
let portalInestable = false;
let paradojaVisual = false;
let seHaGeneradoTiempoRestante = false;
let tiempoRestante = null;

botonOculto.addEventListener("click", ()=>{
    eventoColapsoTemporal();
    setInterval(eventoColapsoTemporal, 100);
});

function eventoColapsoTemporal () {
    let fechaInicio = new Date(Date.UTC(-2999, 0, 1));
    let fechaFin = new Date(Date.UTC(3000, 11, 31));

    fecha.textContent = getFechaAleatoria(fechaInicio, fechaFin);

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

let segundosAnomalias = getNumeroAleatorio(30000,60000);

function generarAnomalia() {   
    if (areaPortales.childNodes.length -1 > 0) {
        segundosAnomalias = getNumeroAleatorio(30000,60000);
        let numeroAleatorio = getNumeroAleatorio(1,3);

        switch (numeroAleatorio) {
            case 1:
                inversionTemporal = true;
                areaPortales.setAttribute("inversionTemporal","true");
                break;
            case 2:
                portalInestable = true;
                areaPortales.setAttribute("portalInestable","true");
                break;
            case 3:
                paradojaVisual = true;
                areaPortales.setAttribute("paradojaVisual","true");
                break;
        }
    
        mensajeAnomalias.textContent = "¡Anomalía detectada! Estabiliza el sistema";
    
        console.log("Se ha generado la anomalía: " + numeroAleatorio);
    }
}

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

let segundos = 0;

function anomaliaParadojaVisual() {
    if (paradojaVisual && areaPortales.childNodes.length - 1> 0 && segundos <= 10) {
        segundos++;
        let childNodes = areaPortales.childNodes;

        for (let childNode of childNodes) {
            if (childNode.nodeType == 1) {
                childNode.style.background = getColor(getColores());
                let tamano = getNumeroAleatorio(1,8) + "em";
                childNode.style.height = tamano;
                childNode.style.width = tamano;
            }
        }
    }
}

function actualizar() {
    inversionTemporal = areaPortales.getAttribute("inversionTemporal") === "true";
    portalInestable = areaPortales.getAttribute("portalInestable") === "true";
    paradojaVisual = areaPortales.getAttribute("paradojaVisual") === "true";

    if (inversionTemporal && areaPortales.childNodes.length -1 > 0) {
        if (!seHaGeneradoTiempoRestante) {
            tiempoRestante = new Date();
            seHaGeneradoTiempoRestante = true;
        }

        tiempoRestante.setSeconds(tiempoRestante.getSeconds() - 1);
        fecha.textContent = tiempoRestante.toISOString();
    }
}

setInterval(actualizar,1000);
actualizar();

setInterval(generarAnomalia,segundosAnomalias);
generarAnomalia();

setInterval(anomaliaPortalInestable,5000);
anomaliaPortalInestable();

setInterval(anomaliaParadojaVisual,1000);
anomaliaParadojaVisual();