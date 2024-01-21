import Layout from "./Layout/Layout"
import { useSearch } from "../context/search"
import { useNavigate } from "react-router-dom"
import { useCart } from "../context/cart"
import { useAuth } from "../context/auth"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


const SearchPage = () => {

    const [values, setValues] = useSearch()

    const [cart, addToCart] = useCart();
    const [auth] = useAuth()
    const navigate = useNavigate()


    const handleAddToCart = (productId) => {
        // console.log(" id in searching", productId)
        addToCart(productId);
    };



    return (
        <Layout title={"Search-Product"}>
            <div className="container">
                <div className="text-center">
                    <h6>{values?.results.length < 1 ? 'No Product' : `Found ${values?.results.length} Products`}</h6>
                    <div className='d-flex flex-wrap justify-content-center'>
                        {values?.results.map(item =>
                            <div className="card m-4 allproducts" style={{ width: '18rem', height: '22rem' }} key={item?._id} >
                                <img src={`http://localhost:4004/api/product/product-photo/${item._id}`} className="card-img-top" alt={item.name}
                                    style={{
                                        objectFit: 'cover', width: '100%', height: '50%', display: "block", margin: "auto"
                                    }} />
                                <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                    <p className="card-text">{item.description.substring(0, 25)}...</p>
                                    <p className="card-text">Price-{item.price}Rs</p>
                                    <div className="details">

                                        <button class="btn btn-primary ms-1"
                                            onClick={() => navigate(`/product/${item.slug}`)}
                                        >See Details</button>
                                        {auth?.token && (
                                            <AddShoppingCartIcon onClick={() => handleAddToCart(item._id)} style={{ cursor: "pointer" }}>
                                            </AddShoppingCartIcon>)}
                                    </div>
                                </div>
                            </div>)}
                    </div>
                </div>
            </div>

        </Layout>
    )
}


export default SearchPage