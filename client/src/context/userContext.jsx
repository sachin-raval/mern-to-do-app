import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';

const context = createContext();

export const ContextProvider = ({children})=>{

    const [login, setLogin] = useState(false);
    let checkIt = async ()=>{
        let res = await axios.get('http://localhost:8000/api/user/check' , { withCredentials: true })
        await res.data.success ? setLogin(true) : ''
        console.log(res.data)
    }

    useEffect(()=>{ checkIt() } , []);
    return(
        <context.Provider value={{login , setLogin}}>
            {children}
        </context.Provider>
    )
}

export const AuthContext = ()=> useContext(context);