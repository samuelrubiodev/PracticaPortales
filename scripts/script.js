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

function actualizarFecha() {
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

    let fechaInicio = new Date(Date.UTC(-2999, 0, 1));
    let fechaFin = new Date(Date.UTC(3000, 11, 31));

    const fechaAleatoria = getFechaAleatoria(fechaInicio,fechaFin);

    let div = document.createElement("div");
    div.setAttribute("idportal",numero);
    div.setAttribute("nombre", nombreCompleto);
    div.setAttribute("fechaDestino",fechaAleatoria);
    div.setAttribute("nota","");
    div.setAttribute("class","portal");

    div.style.background = getColor();

    areaPortales.appendChild(div);
    mensaje.textContent = "";

    console.log("Se ha creado el portal: " + nombreCompleto);

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

function getColor() {
    const color1 = getNumeroAleatorio(1,colores.length - 1);
    const color2 = getNumeroAleatorio(1,colores.length - 1);
    const color3 = getNumeroAleatorio(1,colores.length - 1);

    return "linear-gradient(90deg, " + colores[color1] + " 10%, " + colores[color2] + " 59%, " + colores[color3] + " 96%)";
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
                childNode.setAttribute("class","portal-animacion-fade");
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

function getFechaAleatoria(start, end) { 
    let startMillis = start.getTime(); 
    let endMillis = end.getTime(); 
    let randomMillis = startMillis + Math.random() * (endMillis - startMillis); 
    return new Date(randomMillis); 
}

function getNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function cambiarFecha(portal, nuevaFecha) {
    portal.setAttribute("fechadestino",nuevaFecha);
}

function cambiarNota(portal, nuevaNota) {
    portal.setAttribute("nota", nuevaNota);
}

function generarAnomalia() {    
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

setInterval(generarAnomalia,30000);
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


function anomaliaParadojaVisual() {
    if (paradojaVisual && areaPortales.childNodes.length - 1> 0) {
        let childNodes = areaPortales.childNodes;

        for (let childNode of childNodes) {
            if (childNode.nodeType == 1) {
                childNode.style.background = getColor();
            }
        }
    }
}

setInterval(anomaliaParadojaVisual,10000);
anomaliaParadojaVisual();