import axios from "axios"
import Layout from "../components/Layout/Layout"
import { json, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useCart } from '../context/cart'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useAuth } from "../context/auth"
import { API } from "../API/endpoint"

///related-product/:pid/:cid'
const ProductDetailes = () => {
    const [cart, addToCart] = useCart();
    const [auth] = useAuth()
    const [relatedProducts, setRelatedProducts] = useState([])
    const navigate = useNavigate()

    const params = useParams()
    const [product, setProduct] = useState()
    useEffect(() => {
        const getProduct = async () => {
            try {
                const { data } = await
                    axios.get(`${API}/product/get-product/${params.slug}`)
                setProduct(data?.product)
                getSimilerProduct(data?.product._id, data?.product.category._id)
            } catch (error) {
                console.log("errro in geting single product details", error)
            }
        }
        if (params?.slug) { getProduct() }
    }, [params?.slug])

    const getSimilerProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(`${API}/product/related-product/${pid}/${cid}`)
            // console.log("data in similer", data?.products)
            setRelatedProducts(data?.products)
        } catch (error) {
            console.log("error in geting similer products")
        }
    }



    const handleAddToCart = (productId) => {
        // console.log("id products in details", productId)
        addToCart(productId);
    };



    return (
        <Layout title={"Product details"}>
            <div className="row container mt-4 m-auto singleProductDetails"  >
                <div className="col-md-7 allproducts unset " style={{
                    // height: '50vh'
                }}>
                    <img src={`${API}/product/product-photo/${product?._id}`} className="card-img-top" alt={product?.name}
                        style={{
                            objectFit: 'cover', width: 'min-content', height: "300px", display: "block", margin: "auto"
                        }} />
                    <div className=" mt-5 productContent"  //style={{ height: '50vh' }}
                    >
                        {/* <h4 className="text-center">Product Details</h4> */}
                        <h5>Product:{product?.name}</h5>
                        <h6>Category:{product?.category.name}</h6>
                        {/* <h4>Shipping:{product?.shipping}</h4> */}
                        <p>Description:{product?.description}</p>
                        <p className="card-price">Price:{product?.price}Rs</p>
                    </div>
                </div>

                <hr className="hr" />
                <div className=" container similerPro col-md-3 ">
                    <h5 className="text-center card-price">Similer Products</h5>
                    {relatedProducts?.length < 1 && (<p className="text-center">No Similer product found</p>)}
                    <div className='d-flex flex-wrap relatedProducts'>
                        {relatedProducts?.map(item =>
                            <div className="card m-2 allproducts " style={{ width: '18rem', height: '18rem' }} key={item._id}>
                                <img src={`${API}/product/product-photo/${item._id}`} className="card-img-top" alt={item.name}
                                    style={{
                                        objectFit: 'cover', width: '100%', height: '50%', display: "block", margin: "auto"
                                    }} />
                                <div className="card-body">
                                    <div className='d-flex justify-content-around'>
                                        <div>
                                            <h5 className="card-title">{item.name.substring(0, 25)}...</h5>
                                            <p className="card-text">{item.description.substring(0, 25)}...</p>
                                        </div>
                                        <p className="card-text card-price">{item.price}Rs</p>
                                    </div>


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
                            </div>)}
                    </div>
                </div>
            </div>
        </Layout>
    )
}
export default ProductDetailes