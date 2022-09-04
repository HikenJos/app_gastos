import React, {useState, useEffect} from 'react';
import Boton from '../elementos/Boton';
import {ContenedorFiltros, Formulario, Input, InputGrande, ContenedorBoton} from '../elementos/ElementosDeFormulario'
import {ReactComponent as IconoPlus} from '../imagenes/plus.svg'
import SelectCategorias from './SelectCategorias';
import DatePicker from './DatePicker';
import getUnixTime from 'date-fns/getUnixTime';
import fromUnixTime from 'date-fns/fromUnixTime';
import agregarGasto from '../firebase/agregarGastos';
import {useAuth} from '../contextos/AuthContext';
import Alerta from '../elementos/Alerta';
import {useHistory} from 'react-router-dom';
import editarGasto from '../firebase/editarGasto';

const FormularioGasto = ({gasto}) => {
    const [inputDescripcion, setInputDescripcion] = useState('');
    const [inputCantidad, setInputCantidad] = useState('');
    const [categoria, setCategoria] = useState('hogar');
    const [fecha, setFecha] = useState(new Date());
    const [estadoAlerta, setEstadoAlerta] = useState(false);
    const [alerta, setAlerta] = useState({});
    const {usuario} = useAuth();
    const history = useHistory();

    useEffect(() => {
        if (gasto) {
            if (gasto.data().usuario === usuario.uid) {
                //console.log(gasto.data().cantidad);
                setCategoria(gasto.data().categoria);
                setFecha(fromUnixTime(gasto.data().fecha));
                setInputCantidad(gasto.data().cantidad);
                setInputDescripcion(gasto.data().descripcion);
            }else {
                history.push('/lista')
            }
        } 
    }, [gasto, usuario, history]);

    const handleChange = (e) =>{
        if(e.target.name === 'descripcion'){
            setInputDescripcion(e.target.value);
        }else if (e.target.name === 'cantidad'){
            setInputCantidad(e.target.value.replace(/[^0-9.]/g, ''));
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setEstadoAlerta(false);
        setAlerta({});
        let cantidad = parseFloat(inputCantidad).toFixed(2);

        //Validaciones
        if (inputDescripcion !== '' && inputCantidad !== '' ) {
            if (cantidad) {
                if(gasto){
                    editarGasto({
                        id: gasto.id,
                        categoria: categoria,
                        descripcion: inputDescripcion,
                        cantidad: cantidad,
                        fecha: getUnixTime(fecha)
                    }).then(() => {
                        history.push('/lista');
                    }).catch((e) => {
                        console.log(e);
                    })
                }else{
                    agregarGasto({
                        categoria: categoria,
                        descripcion: inputDescripcion,
                        cantidad: cantidad,
                        fecha: getUnixTime(fecha),
                        usuario: usuario.uid
                    }).then(() => {
                        setInputDescripcion('');
                        setInputCantidad('');
                        console.log(fecha);
                        setFecha(new Date());
    
                        setEstadoAlerta(true);
                        setAlerta({tipo: 'exito', mensaje: 'Gasto Agregado'});
                    }).catch(e => {
                        setEstadoAlerta(true);
                        setAlerta({tipo: 'error', mensaje: 'Hubo un error al intentar agregar el gasto'});
                    }) 
                }
                
                
            }else{
                setEstadoAlerta(true);
                setAlerta({tipo: 'error', mensaje: 'Uno de los datos ingresados no son correctos'});
            }
            
        } else {
            setEstadoAlerta(true);
            setAlerta({tipo: 'error', mensaje: 'Por favor rellena todos los campos'});
        }
        
        //Pasar objeto de formulario
        
    }

    return ( 
        <Formulario onSubmit={handleSubmit}>
            <ContenedorFiltros>
                <SelectCategorias categoria={categoria} setCategoria={setCategoria} />
                <DatePicker fecha={fecha} setFecha={setFecha} />
            </ContenedorFiltros>
            <div>
                <Input type="text" name="descripcion" id="descripcion" placeholder="Descripcion del gasto" value={inputDescripcion} onChange={handleChange} />
                <InputGrande type="text" name="cantidad" id="cantidad" placeholder="$0.00" value={inputCantidad} onChange={handleChange}/>
            </div>
            <ContenedorBoton>
                <Boton as="button" primario conIcono type="submit">
                    {gasto ? 'Editar Gasto' : 'Agregar Gasto'}  <IconoPlus/>
                </Boton>
            </ContenedorBoton>
            <Alerta tipo={alerta.tipo} mensaje={alerta.mensaje} estadoAlerta={estadoAlerta} setEstadoAlerta={setEstadoAlerta} />
        </Formulario>
     );
}
 
export default FormularioGasto;