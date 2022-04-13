import {useContext,useEffect} from 'react'
import { AuthContext } from '../context/AuthContextProvider'

 const useAuth= () =>{
    // const {auth} = useContext(AuthContext);
    const {setAuth}  = useContext(AuthContext);

    const storedData=JSON.parse(localStorage.getItem('userData'));
    useEffect(() => {
          storedData?
          Object.keys(storedData).length>0 ? setAuth({...storedData}) :setAuth({})
          :setAuth({})
      }, [])

    return storedData || {};

}
export default useAuth;
