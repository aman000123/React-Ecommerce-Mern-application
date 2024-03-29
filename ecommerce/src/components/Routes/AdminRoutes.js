
import { useEffect, useState } from "react";

import { useAuth } from "../../context/auth";

import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";
import { API } from "../../API/endpoint";

export default function AdminRoutes() {
    const [ok, setOk] = useState(false)
    const [auth, setAuth] = useAuth()

    useEffect(() => {
        const authCheck = async () => {
            try {
                const res = await axios.get(`${API}/admin-auth`)
                if (res.data.ok) {
                    setOk(true)
                } else {
                    setOk(false)
                }
            }

            catch (error) {
                console.log("error in admin routed")
            }
        }
        if (auth?.token) authCheck()

    }, [auth?.token])
    return ok ? <Outlet /> : <Spinner path="" />

}