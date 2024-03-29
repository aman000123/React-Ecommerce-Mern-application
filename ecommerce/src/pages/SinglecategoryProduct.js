import { useEffect, useState } from "react"
import Layout from "../components/Layout/Layout"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { useCart } from "../context/cart"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useAuth } from "../context/auth"
import { API } from "../API/endpoint"

const SingleCategoryProduct = () => {
    //'/product-category/:slug'
    const [product, setProduct] = useState([])
    const [category, setCategory] = useState([])
    const params = useParams()
    const [cart, addToCart] = useCart();
    const [auth] = useAuth()
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const getProduct = async () => {

        try {
            const { data } =
                await axios.get(`${API}/product/product-category/${params.slug}`)
            setProduct(data?.products)
            setCategory(data?.category)
        } catch (error) {
            console.log("error in category wise product", error)
        }
    }

    useEffect(() => {
        if (params?.slug) {
            getProduct()
        }
    },

        [params?.slug])

    const handleAddToCart = (productId) => {
        addToCart(productId);
    };

    return (
        <Layout>
            <div className="container">

                <h6 className="text-center">{product?.length}Result found</h6>
                <div className="row">
                    <div className='d-flex flex-wrap cartProducts'>
                        {product?.map(item =>
                            // <Link to={`/dashboard/admin/product/${item?.slug}`} key={item?._id} className="product-link">
                            <div className="card m-2 allproducts" style={{ width: '16rem', height: "16rem" }} key={item._id} >
                                <img src={`${API}/product/product-photo/${item._id}`} className="card-img-top" alt={item.name}
                                    style={{
                                        objectFit: 'cover', width: '100%', height: '50%', display: "block", margin: "auto"
                                    }} />
                                <div className="card-body">
                                    <div className='d-flex justify-content-around'>
                                        <div>
                                            <h5 className="card-title">{item.name}</h5>
                                            <p className="card-text">{item.description.substring(0, 25)}...</p>
                                        </div>
                                        <p className="card-text card-price">{item.price}Rs</p>
                                    </div>
                                    <div className='details'>
                                        <button className="btn btn-primary ms-1"
                                            onClick={() => navigate(`/product/${item.slug}`)}
                                        >See Details</button>
                                        {auth?.token && (
                                            <AddShoppingCartIcon onClick={() => handleAddToCart(item._id)} style={{ cursor: "pointer" }}>

                                            </AddShoppingCartIcon>

                                        )}
                                    </div>
                                </div>
                            </div>
                            // </Link>

                        )

                        }
                    </div>
                    {/* <div className='m-2 p-3'>
                        {product && product.length < total && (
                            <button className='btn btn-warning'
                                onClick={(e) => {
                                    e.preventDefault();
                                    setPage(page + 1)
                                }}>

                                {loading ? "Loading ...." : "Loadmore"}
                            </button>

                        )
                        }
                    </div> */}

                </div>
            </div>

        </Layout>
    )
}

export default SingleCategoryProduct