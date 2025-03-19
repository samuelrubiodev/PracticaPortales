let botonPersonalizacion = document.querySelector("#boton-confgurar-portal");
let botonGuardar = document.querySelector("#boton-guardar-personalizacion");
let menuPersonalizacion = document.querySelector(".menu-personalizacion");
let areaPortales = document.querySelector(".area-portales");
let tamano = document.querySelector("#tamano");
let efectoVisual = document.querySelector("#efecto-visual");

tamano.addEventListener("input", (event)=>{
    if (event.target.value < 10 || event.target.value > 300) {
        event.target.setCustomValidity("El tamaño en px tiene que estar comprendido entre 10-300");
        event.target.reportValidity();
    } else {
        event.target.setCustomValidity("");
    }
});


botonPersonalizacion.addEventListener("click",(event)=>{
    event.preventDefault();

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
    if (tamano.value >= 10 && tamano.value <= 300) {

        localStorage.setItem("tamano", tamano.value);
        localStorage.setItem("efectoVisual",efectoVisual.value);

        menuPersonalizacion.style.display = "none"; 
    } else {
        tamano.setCustomValidity("El tamaño en px tiene que estar comprendido entre 10-300");
        tamano.reportValidity();
    }
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