import React from 'react';
import {Header, Titulo} from '../elementos/Header';
import {Helmet} from 'react-helmet';
import BtnRegresar from '../elementos/BtnRegresar';
import BarraTotalGastado from './BarraTotalGastado';
import useObtenerGastosDelMesPorCategoria from '../hooks/useObtenerGasstosDelMesPorCategorias';
import {ListaDeCategorias, ElementoListaCategorias, Categoria, Valor} from '../elementos/ElementosDeLista';
import IconoCategoria from '../elementos/IconoCategoria';
import ConvertirAMoneda from '../funciones/ConvertirAMoneda';


const GastoPorCategorioa = () => {

    const gastosPorCategoria = useObtenerGastosDelMesPorCategoria();    
    return ( 
        <>
            <Helmet>
                <title>Gastos Por Categoria</title>
            </Helmet>

            <Header>
                <BtnRegresar />
                <Titulo>Gastos Por Categoria</Titulo>
            </Header>

            <ListaDeCategorias>
                {gastosPorCategoria.map((elemento, index) => {
                    return (
                        <ElementoListaCategorias key={index}> 
                            <Categoria><IconoCategoria id={elemento.categoria} />{elemento.categoria}</Categoria>
                            <Valor>{ConvertirAMoneda(elemento.cantidad)}</Valor>
                        </ElementoListaCategorias>
                    );
                })}
            </ListaDeCategorias>

            <BarraTotalGastado />
        </>
     );
}
 
export default GastoPorCategorioa;