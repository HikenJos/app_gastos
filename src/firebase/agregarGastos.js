import { db } from "./firebaseConfig";

//RECIBIR OBJETO DE FORMULARIO
const agregarGasto = ({categoria, descripcion, cantidad, fecha, usuario}) => {
    return db.collection('gastos').add({
        categoria: categoria,
        descripcion: descripcion,
        cantidad: Number(cantidad),
        fecha: fecha,
        usuario: usuario
    });
}

export default agregarGasto;