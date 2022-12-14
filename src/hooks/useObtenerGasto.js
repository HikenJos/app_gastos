import { useEffect, useState } from "react";
import {db} from '../firebase/firebaseConfig';
import {useHistory} from "react-router";

const useObtenerGasto = (id) => {
    const [gasto, setGasto] = useState('');
    const history = useHistory();

    useEffect(() => {
        db.collection('gastos')
        .doc(id)
        .get()
        .then((doc) => {
            if(doc.exists){
                setGasto(doc);
            }else{
                history.push('/lista')
            }
        })
    }, [history, id]);

    return [gasto];
}
 
export default useObtenerGasto;