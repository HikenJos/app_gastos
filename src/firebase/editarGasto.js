import { db } from "./firebaseConfig";

//RECIBIR OBJETO DE FORMULARIO
const editarGasto = ({id, categoria, descripcion, cantidad, fecha}) => {
    return db.collection('gastos').doc(id).update({
        categoria: categoria,
        descripcion: descripcion,
        cantidad: Number(cantidad),
        fecha: fecha
    });
}

export default editarGasto;