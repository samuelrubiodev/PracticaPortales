function getFechaAleatoria(start, end) { 
    let startMillis = start.getTime(); 
    let endMillis = end.getTime(); 
    let randomMillis = startMillis + Math.random() * (endMillis - startMillis); 
    
    let fecha = new Date(randomMillis);
    let esAC = fecha.getUTCFullYear() < 1;
    
    if (esAC) {
        let anoAC = Math.abs(fecha.getUTCFullYear()) - 1; 
        return `${anoAC} a.C.`;
    } else {
        return `${fecha.getUTCFullYear()} d.C.`;
    }
}

function getNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getColor(colores) {
    const color1 = getNumeroAleatorio(1,colores.length - 1);
    const color2 = getNumeroAleatorio(1,colores.length - 1);
    const color3 = getNumeroAleatorio(1,colores.length - 1);

    return "linear-gradient(90deg, " + colores[color1] + " 10%, " + colores[color2] + " 59%, " + colores[color3] + " 96%)";
}

function getColores() {
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
    return colores; 
}

function cambiarFecha(portal, nuevaFecha) {
    portal.setAttribute("fechadestino",nuevaFecha);
}

function cambiarNota(portal, nuevaNota) {
    portal.setAttribute("nota", nuevaNota);
}

function crearBoton(id, ruta, alt) {
    let boton = document.createElement("button");
    let img = document.createElement("img");
    
    boton.setAttribute("type","button");
    boton.setAttribute("id", id);
    boton.setAttribute("class","boton-image");

    img.setAttribute("src",ruta);
    img.setAttribute("alt",alt);

    boton.appendChild(img);
    return boton;
}

function crearElemento(id, texto, nombreElemento) {
    let elemento = document.createElement(nombreElemento);
    elemento.setAttribute("id", id);
    elemento.textContent = texto;
    return elemento;
}

export { getFechaAleatoria, getNumeroAleatorio, getColor, cambiarFecha,cambiarNota, getColores, crearBoton, crearElemento };