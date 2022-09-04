import React from 'react';
import { auth } from '../firebase/firebaseConfig';
import {ReactComponent as IconoCerrarSesion} from '../imagenes/logout.svg';
import Boton from './Boton';
import { useHistory } from 'react-router';

const BotonCerrarSesion = () => {
    const history =useHistory();
    const cerrarSesion = async () => {
        try {
            await auth.signOut();
            history.push('/iniciar-sesion');
        } catch (e) {
            console.log(e);
        }
    }
    return ( 
        <Boton iconoGrande as = "button" onClick={cerrarSesion}>
            <IconoCerrarSesion />
        </Boton>
     );
}
 
export default BotonCerrarSesion;