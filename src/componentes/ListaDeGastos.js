import React from 'react';
import {Header, Titulo} from '../elementos/Header';
import {Helmet} from 'react-helmet';
import {Link} from 'react-router-dom';
import {fromUnixTime, format} from 'date-fns';
import BtnRegresar from '../elementos/BtnRegresar';
import BarraTotalGastado from './BarraTotalGastado';
import borrarGasto from '../firebase/borrarGasto';
import useObtenerGastos from '../hooks/useObtenerGastos';
import {Lista, ElementoLista, Categoria, Descripcion, Valor, Fecha, ContenedorBotones, BotonAccion, BotonCargarMas, ContenedorBotonCentral, ContenedorSubtitulo, Subtitulo} from '../elementos/ElementosDeLista';
import IconoCategoria from '../elementos/IconoCategoria';
import ConvertirAMoneda from '../funciones/ConvertirAMoneda';
import {ReactComponent as IconoEditar} from '../imagenes/editar.svg';
import {ReactComponent as IconoBorrar} from '../imagenes/borrar.svg';
import Boton from '../elementos/Boton';
import {es} from 'date-fns/locale';

const ListaDeGastos = () => {
    const [gastos, obtenerMasGastos, hayMasPorCargar] = useObtenerGastos();

    const formatearFecha = (fecha) =>{
        return format(fromUnixTime(fecha), "dd 'de' MMMM 'de' yyyy", {locale: es});
    }

    const fechaEsIgual = (gastos, index, gasto) => {
        if(index !== 0){
            const fechaActual = formatearFecha(gasto.fecha);
            const fechaGastoAnterior = formatearFecha(gastos[index -1].fecha);

            if(fechaActual === fechaGastoAnterior){
                return true;
            }else{
                return false;
            }
        }
    }

    return ( 
        <>
            <Helmet>
                <title>Lista de Gastos</title>
            </Helmet>

            <Header>
                <BtnRegresar />
                <Titulo>Lista de Gastos</Titulo>
            </Header>

            <Lista>
                {gastos.map((gasto, index) => {
                    return (
                        <div key={gasto.id}>
                            {!fechaEsIgual(gastos, index, gasto) && <Fecha>{formatearFecha(gasto.fecha)}</Fecha> }
                            
                            <ElementoLista key={gasto.id}>
                                <Categoria>
                                    <IconoCategoria id={gasto.categoria} />
                                    {gasto.categoria}
                                </Categoria>
                                <Descripcion>
                                    {gasto.descripcion}
                                </Descripcion>
                                <Valor>
                                    {ConvertirAMoneda(gasto.cantidad)}
                                </Valor>

                                <ContenedorBotones>
                                    <BotonAccion as={Link} to={`/editar/${gasto.id}`}>
                                        <IconoEditar />
                                    </BotonAccion>
                                    <BotonAccion onClick={() => borrarGasto(gasto.id)}>
                                        <IconoBorrar />
                                    </BotonAccion>
                                </ContenedorBotones>
                            </ElementoLista>
                        </div>
                    );
                })}
                {hayMasPorCargar &&
                <ContenedorBotonCentral>
                    <BotonCargarMas onClick={obtenerMasGastos} >Cargar M??s...</BotonCargarMas>
                </ContenedorBotonCentral>
                }

                {gastos.length === 0 &&
                    <ContenedorSubtitulo>
                        <Subtitulo>No hay gastos para mostrar</Subtitulo>
                        <Boton as={Link} to='/'>Agregar Gastos</Boton>
                    </ContenedorSubtitulo>
                }
            </Lista>

            <BarraTotalGastado />
        </>
     );
}
 
export default ListaDeGastos;