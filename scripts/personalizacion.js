let botonPersonalizacion = document.querySelector("#boton-confgurar-portal");
let botonGuardar = document.querySelector("#boton-guardar-personalizacion");
let menuPersonalizacion = document.querySelector(".menu-personalizacion");
let areaPortales = document.querySelector(".area-portales");
let tamano = document.querySelector("#tamano");
let efectoVisual = document.querySelector("#efecto-visual");

botonPersonalizacion.addEventListener("click",()=>{
    if (localStorage.getItem("tamano") && localStorage.getItem("efectoVisual")) {
        tamano.value = localStorage.getItem("tamano");
        efectoVisual.value = localStorage.getItem("efectoVisual");
    }
 
    if (menuPersonalizacion.style.display === "flex") {
        menuPersonalizacion.style.display = "none";
    } else {
        menuPersonalizacion.style.display = "flex";
    }
});

botonGuardar.addEventListener("click",()=>{
    let tamano = document.querySelector("#tamano").value;
    let efectoVisual = document.querySelector("#efecto-visual").value;

    localStorage.setItem("tamano", tamano);
    localStorage.setItem("efectoVisual",efectoVisual);

    menuPersonalizacion.style.display = "none"; 
});

function personalizacion() {
    let tamano = localStorage.getItem("tamano");
    let efectoVisual = localStorage.getItem("efectoVisual");

    let hojaEstilos = document.styleSheets[0];

    for (let regla of hojaEstilos.cssRules) {
        if (regla.selectorText === ".portal") {
            regla.style.height = tamano + "px";
            regla.style.width = tamano + "px";
            if (efectoVisual === "rotacion") {
                regla.style.animation = "portal 1s ease 0s 1 normal none";
            } else if (efectoVisual == "pulsacion") {
                regla.style.animation = "portal-pulsacion 1s ease 0s 1 normal none";
            } else if (efectoVisual == "rebote") {
                regla.style.animation = "portal-rebote 1s ease 0s 1 normal none";
            }
            break;
        }
    }
}

setInterval(personalizacion,100);
personalizacion();