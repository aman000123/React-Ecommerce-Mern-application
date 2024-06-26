import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useAuth } from '../context/auth'
import toast from 'react-hot-toast'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { Prices } from '../components/Prices'
import { Checkbox, Radio, Select } from 'antd'
import { useCart } from '../context/cart'
import '../style/home.css'
import LockResetIcon from '@mui/icons-material/LockReset';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import WomanIcon from '@mui/icons-material/Woman';
import DvrIcon from '@mui/icons-material/Dvr';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import ManIcon from '@mui/icons-material/Man';
import Face4Icon from '@mui/icons-material/Face4';
import Backgrounds from '../components/Layout/Background';
import { API } from '../API/endpoint';


const categoryIcons = {
    Kids: <ChildCareIcon style={{ fontSize: '2.5rem' }} />,
    Mail: <ManIcon style={{ fontSize: '2.5rem' }} />,
    Female: <WomanIcon style={{ fontSize: '2.5rem' }} />,
    'Electronics gadgets': <DvrIcon style={{ fontSize: '2.5rem' }} />,
    'Electrical gadgets': <ElectricalServicesIcon style={{ fontSize: '2.5rem' }} />,
    Grocerry: <LocalGroceryStoreIcon style={{ fontSize: '2.5rem' }} />,
    Dressings: <Face4Icon style={{ fontSize: '2.5rem' }} />,
}

const HomePage = () => {
    const navigate = useNavigate()
    const [cart, addToCart] = useCart();
    const [auth, setAuth] = useAuth()
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [checked, setChecked] = useState([])
    const [radio, setRadio] = useState([])
    const [loading, setLoading] = useState(false)
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)

    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 769);

    const handleResize = () => {
        setIsSmallScreen(window.innerWidth < 769);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    //get total product count
    const getTotal = async () => {
        try {
            const { data } = await axios.get(`${API}/product/product-count`);
            setTotal(data?.total)
        }
        catch (error) {
            console.log("error in geting total count", error)
        }
    }
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${API}/category/get-categories`);
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
            const { data } = await axios.get(`${API}/product/product-list/${page}`);
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
            const { data } = await axios.get(`${API}/product/product-list/${page}`);
            setLoading(false)
            setProducts(data?.products)
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
            const { data } = await axios.post(`${API}/product/product-filter`, {
                checked, radio
            })
            setProducts(data?.filterProduct)
        } catch (error) {
            console.log("error in filter product", error)

        }
    }
    const handleAddToCart = (productId) => {
        // console.log("id products in home page", productId)
        addToCart(productId);
    };

    const handlePriceChange = (selectedIndex) => {
        if (selectedIndex !== undefined && selectedIndex !== null) {
            const selectedPrice = Prices[selectedIndex];
            setRadio(selectedPrice.array);
        } else {
            console.log("No value selected");
        }
    }
    return (
        <Layout title={"All Products- Best Offers"}>
            <Backgrounds />
            <div className='container'>
                <div className='row mt-4'>
                    <div className='col-md-12'>
                        {/* <h6 className=''>Filter Product by Category</h6> */}
                        <div className='d-flex  flex-row cat   justify-content-end selectPrice'>
                            {categories?.map((c) => (
                                <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                                    <span className='catIcon'>{categoryIcons[c.name]}</span> <span className='catName'>{c.name}</span>
                                </Checkbox>
                            ))}
                        </div>
                        {/* <h6 className='mt-4'>Filter Product by Price</h6> */}
                        <div className='col-md-12 d-flex flex-row align-items-center justify-content-end mt-3 selectPrice'>
                            {isSmallScreen ? (
                                <select defaultValue="Select Price Range" style={{ width: 200, padding: "4px" }} onChange={(e) => handlePriceChange(e.target.value)}>
                                    <option disabled>Select Price Range</option>
                                    {Prices.map((p, index) => (
                                        <option key={p._id} value={index}>{p.name}</option>
                                    ))}
                                </select>
                            ) : (
                                <Radio.Group className='d-flex' onChange={e => setRadio(e.target.value)}>
                                    {Prices.map(p => (
                                        <div key={p._id} className="ms-3 Price">
                                            <Radio value={p.array}><span className='catPrice'>{p.name}</span></Radio>
                                        </div>
                                    ))}
                                </Radio.Group>
                            )}

                            <LockResetIcon style={{ cursor: "pointer", fontSize: "37px" }} onClick={() => window.location.reload()}
                                className='reset'>
                            </LockResetIcon>
                        </div>



                    </div>
                    <div className='col-md-12 mt-3'>
                        {/* <h1 className='text-center'>All Products</h1> */}
                        {/* {JSON.stringify(checked, null, 4)}
                    {JSON.stringify(radio, null, 4)} */}
                        <div className='d-flex flex-wrap justify-content-evenly cartProducts'>
                            {products?.map(item =>
                                <div className="card m-2 allproducts" style={{ width: '16rem', height: '17rem' }}
                                    key={item?._id} >
                                    <img src={`${API}/product/product-photo/${item._id}`} className="card-img-top" alt={item.name}
                                        style={{
                                            objectFit: 'cover', width: '100%', height: '50%', display: "block", margin: "auto"
                                        }} />
                                    <div className="card-body" style={{ padding: "14px 10px" }}>
                                        <div className='d-flex justify-content-around'>
                                            <div>
                                                <h5 className="card-title">{item.name.substring(0, 24)}..</h5>
                                                <p className="card-text">{item.description.substring(0, 25)}...</p></div>
                                            <p className="card-text card-price">{item.price}Rs</p>
                                        </div>
                                        <div className='details'>
                                            <button className="btn btn-primary ms-1"
                                                onClick={() => navigate(`/product/${item.slug}`)}
                                            >More Info</button>
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