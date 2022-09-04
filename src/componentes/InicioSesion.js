import React, {useState} from 'react';
import {Helmet} from 'react-helmet';
import Boton from '../elementos/Boton';
import {Header, Titulo, ContenedorHeader} from '../elementos/Header';
import {Formulario, Input, ContenedorBoton} from '../elementos/ElementosDeFormulario';
import {ReactComponent as SvgLogin} from '../imagenes/login.svg';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig';
import Alerta from '../elementos/Alerta';

const Svg = styled(SvgLogin)`
    width: 100%;
    max-height: 16.5rem;
    margin-bottom: 1.25rem;
`;

const InicioSesion = () => {
    const history = useHistory();
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [estadoAlerta, setEstadoAlerta] = useState(false);
    const [alerta, setAlerta] = useState({});
    const expresionRegular = /[a-zA-Z0-9-.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;

    const handleChange = (e) => {
        if (e.target.name === 'email') {
            setCorreo(e.target.value);
        }else if(e.target.name === 'password'){
            setPassword(e.target.value);
        }
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setEstadoAlerta(false);
        setAlerta({});

        if (!expresionRegular.test(correo)){
            setEstadoAlerta(true);
            setAlerta({
                tipo: 'error', mensaje: 'Ingresa un correo valido por favor'
            });
            
        }else {
            try{
                await auth.signInWithEmailAndPassword(correo, password);
                console.log('Usuario exito')
                history.push('/')
            }catch(e){
                setEstadoAlerta(true);
                let mensaje;
                switch (e.code) {
                    case 'auth/wrong-password' :
                        mensaje = 'Contraseña o Email incorrecto';
                        break;
                    case 'auth/user-not-found':
                        mensaje = 'No existe ese usuario'
                        break;
                        default:
                        mensaje = 'Hubo un error al intentar crear la cuenta';
                        break;
                }
                setAlerta({tipo: 'error', mensaje: mensaje});
            } 
        }
    }

    return ( 
        <>
            <Helmet>
                <title>Iniciar Sesion</title>
            </Helmet>

            <Header>
                <ContenedorHeader>
                    <Titulo>Iniciar Sesión</Titulo>
                    <div>
                        <Boton to="/crear-cuenta">Registrarse</Boton>
                    </div>
                </ContenedorHeader>
            </Header>

            <Formulario onSubmit={handleSubmit}>
                <Svg />
                <Input type="email" name="email" placeholder="Correo Electronico" value={correo} onChange={handleChange}></Input>
                <Input type="password" name="password" placeholder="Contraseña" value={password} onChange={handleChange}></Input>
                <ContenedorBoton><Boton as="button" primario>Ingresar</Boton></ContenedorBoton>
                
            </Formulario>

            <Alerta tipo={alerta.tipo} mensaje={alerta.mensaje} estadoAlerta={estadoAlerta} setEstadoAlerta={setEstadoAlerta} />
        </>
     );
}
 
export default InicioSesion;