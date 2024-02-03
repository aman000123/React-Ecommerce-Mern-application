
//file name use se start must

import { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../API/endpoint";



//create custom hooks for geting category
export default function useCategory() {

    const [categories, setCategories] = useState([])

    const getCategories = async () => {
        try {

            const { data } = await axios.get(`${API}/category/get-categories`)
            setCategories(data?.category)
        }
        catch (error) {
            console.log("erorr in usecategory hooks", error)
        }
    }

    useEffect(() => {
        getCategories()
    }, [])

    return categories

}

