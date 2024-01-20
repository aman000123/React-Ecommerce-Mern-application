import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { useAuth } from '../context/auth'
import toast from 'react-hot-toast'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { Prices } from '../components/Prices'
import { Checkbox, Radio } from 'antd'
import { useCart } from '../context/cart'
import '../style/home.css'
import LockResetIcon from '@mui/icons-material/LockReset';


const HomePage = () => {
    const navigate = useNavigate()
    const [cart, addToCart] = useCart();
    const [auth, setAuth] = useAuth()
    // console.log("auth?.user?.userid", auth?.user?.userid)
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [checked, setChecked] = useState([])
    const [radio, setRadio] = useState([])
    const [loading, setLoading] = useState(false)
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    //get total product count
    const getTotal = async () => {
        try {
            const { data } = await axios.get('http://localhost:4004/api/product/product-count');
            setTotal(data?.total)
        }
        catch (error) {
            console.log("error in geting total count", error)
        }
    }
    const getAllCategory = async () => {
        try {
            //res ke andar data hota ha destructure
            const { data } = await axios.get('http://localhost:4004/api/category/get-categories');
            if (data?.success) {
                setCategories(data?.category);
            }
        }
        catch (error) {
            console.log("error in fething categories", error)
            toast.error("Some things went wrong for getting category")
        }
    }
    //for loadmore
    useEffect(() => {
        if (page === 1) return
        loadMore()
    }, [page])

    const loadMore = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`http://localhost:4004/api/product/product-list/${page}`);
            setLoading(false)
            setProducts([...products, ...data?.products])
        } catch (error) {
            console.log("error in load more", error)
            setLoading(false)
        }
    }
    //filter category
    const handleFilter = (value, id) => {
        let all = [...checked];
        if (value) {
            all.push(id);
        } else {
            all = all.filter(c => c !== id); // Update the 'all' array
        }
        setChecked(all);
    };
    useEffect(() => {
        getAllCategory()
        getTotal()
    }, [])
    const getAllProduct = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`http://localhost:4004/api/product/product-list/${page}`)
            setLoading(false)
            setProducts(data?.products)
            console.log("data in home page", data.products)

        } catch (error) {
            console.log("error in getall prduct", error)
            setLoading(false)
            toast.error(error.message)
        }
    }
    //if category and price not selected
    useEffect(() => {
        if (!checked.length || !radio.length) {
            getAllProduct()
        }
        //eslint-disable-next-line
    }, [checked.length, radio.length])


    //if select price and category
    useEffect(() => {
        if (checked.length || radio.length) filterProduct()

    }, [checked, radio])


    //get filter products 
    const filterProduct = async () => {
        ///product-filter data
        try {
            const { data } = await axios.post('http://localhost:4004/api/product/product-filter', {
                checked, radio
            })

            setProducts(data?.filterProduct)

        } catch (error) {
            console.log("error in filter product")

        }
    }


    const handleAddToCart = (productId) => {
        // console.log("id products in home page", productId)
        addToCart(productId);
    };

    return (
        <Layout title={"All Products- Best Offers"}>
            <div className='container'>
                <div className='row mt-4'>
                    <div className='col-md-2'>
                        <h6 className=''>Filter Product by Category</h6>
                        <div className='d-flex  flex-column cat'>
                            {categories?.map((c) => (
                                <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                                    {c.name}
                                </Checkbox>
                            ))}
                        </div>
                        <h6 className=' mt-4'>Filter Product by Price</h6>
                        <div className='d-flex  flex-column'>
                            <Radio.Group onChange={e => setRadio(e.target.value)}>
                                {Prices.map(p => (
                                    <div key={p._id}>
                                        <Radio value={p.array} >{p.name}</Radio>
                                    </div>
                                ))}
                            </Radio.Group>
                        </div>

                        <LockResetIcon style={{ cursor: "pointer", fontSize: "37px" }} onClick={() => window.location.reload()}
                            className='mt-3'
                        >

                        </LockResetIcon>

                    </div>
                    <div className='col-md-10'>
                        {/* <h1 className='text-center'>All Products</h1> */}
                        {/* {JSON.stringify(checked, null, 4)}
                    {JSON.stringify(radio, null, 4)} */}
                        <div className='d-flex flex-wrap justify-content-evenly cartProducts'>
                            {products?.map(item =>
                                <div className="card m-2 allproducts" style={{ width: '16rem', height: '19rem' }}
                                    key={item?._id} >
                                    <img src={`http://localhost:4004/api/product/product-photo/${item._id}`} className="card-img-top" alt={item.name}
                                        style={{
                                            objectFit: 'cover', width: '100%', height: '50%', display: "block", margin: "auto"
                                        }} />
                                    <div className="card-body" style={{ padding: "14px 10px" }}>
                                        <h5 className="card-title">{item.name.substring(0, 24)}..</h5>
                                        <p className="card-text">{item.description.substring(0, 30)}</p>
                                        <p className="card-text">Price-{item.price}Rs</p>
                                        <div className='details'>
                                            <button className="btn btn-primary ms-1"
                                                onClick={() => navigate(`/product/${item.slug}`)}
                                            >See Details</button>
                                            {auth?.token ? (
                                                <AddShoppingCartIcon onClick={() => handleAddToCart(item._id)} style={{ cursor: "pointer" }}>

                                                </AddShoppingCartIcon>

                                            ) : (

                                                <AddShoppingCartIcon onClick={() => navigate('/login', {
                                                    state: '/'
                                                })} style={{ cursor: "pointer" }}>

                                                </AddShoppingCartIcon>

                                            )}
                                        </div>
                                    </div>
                                </div>
                            )
                            }
                        </div>
                        <div className='m-2 p-3 text-center'>
                            {products && products.length < total && (
                                <button className='btn btn-warning'
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setPage(page + 1)
                                    }}>
                                    {loading ? "Loading ...." : "Loadmore"}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
export default HomePage