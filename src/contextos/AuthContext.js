import React, {useState, useContext, useEffect} from 'react';
import { auth } from '../firebase/firebaseConfig';

const AuthContext = React.createContext();

const useAuth = () => {
    return useContext(AuthContext);
}

const AuthProvider = ({children}) => {
    const [usuario, setUsuario] = useState();
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const cancelarSuscripcion = auth.onAuthStateChanged((usuario) => {
            setUsuario(usuario);
            setCargando(false);
        });
        return cancelarSuscripcion;
    }, []);
    return ( 
        <AuthContext.Provider value={{usuario: usuario}}>
            {!cargando && children}
        </AuthContext.Provider>
    );
}

export {AuthProvider, AuthContext, useAuth};