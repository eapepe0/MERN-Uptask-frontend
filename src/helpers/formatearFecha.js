const formatearFecha = (fecha) => {
    //* fecha => "2024-02-03T00:30:35.464Z"

    const nuevaFecha = new Date(fecha?.split("T")[0].split("-")) //* haciendo el split en la T [0] (extraemos 2024-02-03) y haciendo un 2do split se divide 2024 02 03 
    //* con esto el dia , nos va a dar el que corresponde

    const opciones = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    }

    return nuevaFecha.toLocaleDateString('es-ES', opciones)
}

export default formatearFecha