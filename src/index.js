import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Contenedor from './elementos/Contenedor';
import EditarGasto from './componentes/EditarGasto';
import InicioSesion from './componentes/InicioSesion';
import ListaDeGastos from './componentes/ListaDeGastos';
import RegistroUsuario from './componentes/RegistroUsuario';
import GastosPorCategoria from './componentes/GastosPorCategoria';
import WebFont from 'webfontloader';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import favicon from './imagenes/logo.png';
import Fondo from './elementos/Fondo';
import {AuthProvider} from './contextos/AuthContext';
import RutaProtegida from './componentes/RutaPrivada';
import {TotalGastadoProvider} from './contextos/TotalGastadoEnElMesContext';

WebFont.load({
  google: {
    families: ['Work Sans:400,500,700', 'sans-serif']
  }
})

const Index = () => {
  return (
    <>
      <Helmet>
        <link rel="shorcut icon" href={favicon} type="image/x-icon"></link>
      </Helmet>

      <AuthProvider>
        <TotalGastadoProvider>
          <BrowserRouter>
            <Contenedor>
              <Switch>
                <Route path="/iniciar-sesion" component={InicioSesion} />
                <Route path="/crear-cuenta" component={RegistroUsuario} />
                <RutaProtegida path="/categorias"><GastosPorCategoria /> </RutaProtegida>
                <RutaProtegida path="/lista"><ListaDeGastos /> </RutaProtegida>
                <RutaProtegida path="/editar/:id"><EditarGasto /> </RutaProtegida>
                <RutaProtegida path="/"><App /> </RutaProtegida>
              { /*<Route path="/categorias" component={GastosPorCategoria} />
                <Route path="/lista" component={ListaDeGastos} />
                <Route path="/editar/:id" component={EditarGasto} />  
                <Route path="/" component={App} />*/}
              </Switch>
            </Contenedor>
          </BrowserRouter>
        </TotalGastadoProvider>
      </AuthProvider>
      
      <Fondo/>
    </>    
   );
}
 

ReactDOM.render(<Index />, document.getElementById('root'));
