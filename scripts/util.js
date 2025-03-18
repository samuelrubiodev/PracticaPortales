function getFechaAleatoria(start, end) { 
    let startMillis = start.getTime(); 
    let endMillis = end.getTime(); 
    let randomMillis = startMillis + Math.random() * (endMillis - startMillis); 
    return new Date(randomMillis); 
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

export { getFechaAleatoria, getNumeroAleatorio, getColor };