
import axios from "axios";
import { useState, useEffect, useContext, createContext } from "react";


const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({

        user: null, token: "",

    })
    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState(null);
    const [OTPinput, setOTPinput] = useState([" "]);

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

    return (
        <AuthContext.Provider value={[auth, setAuth, otp, setOtp, OTPinput, setOTPinput, email, setEmail]}>
            {children}
        </AuthContext.Provider>
    );


}

//create custom hooks
const useAuth = () => useContext(AuthContext)

export { useAuth, AuthProvider }