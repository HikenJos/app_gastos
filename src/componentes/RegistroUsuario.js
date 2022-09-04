import React, {useState} from 'react';
import {Helmet} from 'react-helmet';
import Boton from '../elementos/Boton';
import {Header, Titulo, ContenedorHeader} from '../elementos/Header';
import {Formulario, Input, ContenedorBoton} from '../elementos/ElementosDeFormulario';
import {ReactComponent as SvgLogin} from '../imagenes/registro.svg'
import styled from 'styled-components';
import {auth} from '../firebase/firebaseConfig';
import {useHistory} from 'react-router-dom';
import Alerta from '../elementos/Alerta';

const Svg = styled(SvgLogin)`
    width: 100%;
    max-height: 6.25rem;
    margin-bottom: 1.25rem;
`;

const RegistroUsuario = () => {
    const history = useHistory();
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [estadoAlerta, setEstadoAlerta] = useState(false);
    const [alerta, setAlerta] = useState({});
    const expresionRegular = /[a-zA-Z0-9-.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;

    const handleChange = (e) =>{
        switch (e.target.name) {
            case 'email':
                setCorreo(e.target.value);
                break;
            case 'password':
                setPassword(e.target.value);
                break;
            case 'password2':
                setPassword2(e.target.value);
                break;
        
            default:
                break;
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
            
        }else if (correo === '' || password === '' || password2 === ''){
            setEstadoAlerta(true);
            setAlerta({
                tipo: 'error', mensaje: 'No pueden existir campos en blanco'
            });
            
        }else if(password !== password2){
            setEstadoAlerta(true);
            setAlerta({
                tipo: 'error', mensaje: 'Las contraseñas no coinciden'
            });
        
        }else {
            try{
                await auth.createUserWithEmailAndPassword(correo, password);
                console.log('Usuario exito')
                history.push('/')
            }catch(e){
                setEstadoAlerta(true);
                let mensaje;
                switch (e.code) {
                    case 'auth/invalid-password' :
                        mensaje = 'Debe colocar 6 caracteres como minimo';
                        break;
                    case 'auth/email-already-in-use':
                        mensaje = 'Ya existe una cuenta con el correo electrónico proporcionado.'
                        break;
                    case 'auth/invalid-email':
                        mensaje = 'El correo electrónico no es válido.'
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
                <title>Crear Cuenta</title>
            </Helmet>

            <Header>
                <ContenedorHeader>
                    <Titulo>Crear Cuenta</Titulo>
                    <div>
                        <Boton to="/iniciar-sesion">Iniciar Sesion</Boton>
                    </div>
                </ContenedorHeader>
            </Header>

            <Formulario onSubmit={handleSubmit}>
                <Svg />
                <Input type="email" name="email" placeholder="Correo Electronico" value={correo} onChange={handleChange}></Input>
                <Input type="password" name="password" placeholder="Contraseña" value={password} onChange={handleChange}></Input>
                <Input type="password" name="password2" placeholder="Confirmar Contraseña" value={password2} onChange={handleChange}></Input>
                <ContenedorBoton><Boton as="button" primario>Registrarse</Boton></ContenedorBoton>
            </Formulario>

            <Alerta tipo={alerta.tipo} mensaje={alerta.mensaje} estadoAlerta={estadoAlerta} setEstadoAlerta={setEstadoAlerta}/>
        </>
     );
}
 
export default RegistroUsuario;