class Portal {
    constructor(nombre, fechaDestino, idPortal) {
        this.nombre = nombre;
        this.fechaDestino = fechaDestino;
        this.nota = "";
        this.idPortal = idPortal;
    }

    getNombre() {return this.nombre}
    getFechaDestino() {return this.fechaDestino}
    getNota() {return this.nota};
    getIdPortal() {return this.idPortal}

    setNombre(nombreNuevo) {this.nombre = nombreNuevo}
    setFechaDestino(nuevaFecha) {this.fechaDestino = nuevaFecha}
    setNota(nuevaNota) {this.nota = nuevaNota}
    setIdPortal(nuevaId) {this.idPortal = nuevaId}
}

export default Portal