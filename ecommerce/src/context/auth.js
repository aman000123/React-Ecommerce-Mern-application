
import axios from "axios";
import { useState, useEffect, useContext, createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({

        user: null, token: ""
    })

    //set token in headers
    axios.defaults.headers.common['Authorization'] = auth?.token

    useEffect(() => {
        const data = localStorage.getItem('auth')
        if (data) {
            const parseData = JSON.parse(data);
            setAuth({
                ...auth,
                user: parseData.user,
                token: parseData.token
            })
        }
    }, [])


    return <AuthContext.Provider value={[auth, setAuth]}>
        {/* //now we can use auth and set auth anywhere */}
        {children}
    </AuthContext.Provider>

}

//create custom hooks
const useAuth = () => useContext(AuthContext)

export { useAuth, AuthProvider }