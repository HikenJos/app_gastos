import React from 'react';
import styled from 'styled-components';

import {ReactComponent as Puntos} from '../imagenes/puntos.svg'

const Svg = styled.svg`
    height: 50vh;
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: 0;
    path {
        fill: rgba(135,182,194, .15);
    }
`;
 
const PuntosArriba = styled(Puntos)`
    position: fixed;
    z-index: 1;
    top: 2.5rem; /* 40px */
    left: 2.5rem; /* 40px */
`;
 
const PuntosAbajo = styled(Puntos)`
    position: fixed;
    z-index: 1;
    bottom: 2.5rem; /* 40px */
    right: 2.5rem; /* 40px */
`;

const Fondo = () => {
    return ( 
        <>
            <PuntosArriba/>
            <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
                <path
                fillOpacity="1" 
                d="M0,256L34.3,240C68.6,224,137,192,206,165.3C274.3,139,343,117,411,117.3C480,117,549,139,617,160C685.7,181,754,203,823,208C891.4,213,960,203,1029,176C1097.1,149,1166,107,1234,90.7C1302.9,75,1371,85,1406,90.7L1440,96L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z">
                </path>
            </Svg>
            <PuntosAbajo/>
        </>
     );
}
 
export default Fondo;