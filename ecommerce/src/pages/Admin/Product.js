import Adminmenu from "../../components/Layout/AdminMenu"
import Layout from "../../components/Layout/Layout"
import axios from "axios";

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { API } from "../../API/endpoint";
const ProductPage = () => {

    const [products, setProducts] = useState([])
    const getAllProduct = async () => {
        try {
            const { data } = await axios.get(`${API}/product/get-product`);
            setProducts(data?.products)
            toast.success(data?.message)
            console.log("proudct laredy addes", data?.message)
        }
        catch (error) {
            console.log("error in get all product", error)
            toast.error(error?.message)
        }
    }
    useEffect(() => {
        getAllProduct()
    }, []); // Fetch data when the route changes

    return (
        <>
            <Layout title={"Product -Ecommerce"}>
                <div className="row mt-5">
                    <div className="col-md-3">
                        <Adminmenu />
                    </div>
                    <div className="col-md-9 mt-3">
                        {/* <h1 className="text-center">All Products List</h1> */}
                        <div className="d-flex flex-wrap allPro" >
                            {products?.map(item =>
                                <Link to={`/dashboard/admin/product/${item?.slug}`} key={item?._id} className="product-link">
                                    <div className="card m-2 allproducts" style={{ width: '18rem', height: '19rem' }} key={item._id} >
                                        <img src={`${API}/product/product-photo/${item._id}?${new Date().getTime()}`} className="card-img-top" alt={item.name} style={{
                                            objectFit: 'cover', width: '100%', height: '50%', display: "block", margin: "auto"
                                        }} />
                                        <div className="card-body">
                                            <h5 className="card-title">{item.name}</h5>
                                            <p className="card-text">{item.description.substring(0, 30)}</p>
                                            <p className="card-text">Price-{item.price}Rs</p>
                                        </div>
                                    </div>
                                </Link>
                            )
                            }</div>
                    </div>
                </div>
            </Layout></>
    )
}

export default ProductPage