import Layout from "../components/Layout/Layout"
import { useCart } from "../context/cart"

import DropIn from "braintree-web-drop-in-react"

import { useAuth } from "../context/auth"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"

const Cart = () => {

    const [cart, setCart, removeFromCart, fetchCart] = useCart()

    const [auth, setAuth] = useAuth()

    const navigate = useNavigate()

    //payment token
    //this token approx  10000 letters

    const [clientToken, setClienToken] = useState("")
    //brainteree ke sath hi instance bhi milta ha

    const [instance, setInstance] = useState(null)

    const [loading, setLoading] = useState("")

    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map(item => {
                // Assuming each item contains a 'productId' object with a 'price' property
                total = total + item.productId?.price;
            });
            return total.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR"
            });

        } catch (error) {
            console.log("error in payment", error)
        }
    }


    //without token receive no paymnt this token comes from braintree
    const getToken = async () => {

        try {
            const { data } = await axios.get('http://localhost:4004/api/product/braintree/token');
            //console.log("data?.clientToken", data?.clientToken)
            setClienToken(data?.clientToken)
        } catch (error) {
            console.log("errro in geting braintree token", error)
        }
    }

    useEffect(() => {
        fetchCart()
        getToken()
    }, [auth?.token])


    //handlePayment

    const handlePayment = async () => {
        try {
            setLoading(true);
            if (!instance) {
                throw new Error("Braintree instance not available");
            }

            const { nonce } = await instance.requestPaymentMethod();
            const { data } = await axios.post("http://localhost:4004/api/product/braintree/payment", {
                nonce,
                cart: cart.map(item => item.productId._id), // Send only product IDs
            });
            console.log("data in payment", data)
            setLoading(false);
            if (data.ok) {
                // Check for success status or handle other payment response
                if (data.payment.success) {
                    // Payment successful
                    setCart([]); // Empty the cart
                    navigate("/dashboard/user/orders");
                    toast.success("Payment Completed Successfully");
                }
            } else {
                // Payment failed
                console.log("payment failed")
                toast.error("Payment Failed");

            }


        } catch (error) {
            console.log("Error in payment", error);
            setLoading(false);
        }
    };


    const removeCartItem = (productId) => {
        try {
            removeFromCart(productId);
        } catch (error) {
            console.log("error in remove", error);
        }
    };

    return (
        <Layout>
            <div className="container">
                <div className="row">

                    <div className="col-md-12">
                        <h1 className="text-center bg-light p-2 mb-1">

                            {`Hello ${auth?.token && auth?.user?.name}`}


                        </h1>
                        <h4 className="text-center bg-light p-2">
                            {cart?.length
                                ? `You Have ${cart.length} items in your cart ${auth?.token ? "" : "please login to checkout !"
                                }`
                                : " Your Cart Is Empty"}
                        </h4>
                    </div>
                </div>


                <div className="row">
                    <div className="col md-8">
                        {cart?.map(cartItem => (
                            <div className="row mb-2 card flex-row p-3 " key={cartItem?.productId?._id}>
                                {/* Check if productId exists */}
                                {cartItem.productId && (
                                    <div className="col md-4 p-3 allproducts" key={cartItem?.productId?._id}>
                                        <img
                                            src={`http://localhost:4004/api/product/product-photo/${cartItem.productId._id}`}
                                            className="card-img-top"
                                            alt={cartItem.productId.name}

                                            style={{
                                                objectFit: 'cover', width: '130px', height: '100px', display: "block", margin: "auto"
                                            }} />
                                    </div>
                                )}
                                <div className="col md-8">
                                    {/* Check if productId exists */}
                                    {cartItem.productId && (
                                        <>
                                            <p>{cartItem.productId.description}</p>
                                            <p>Price: {cartItem.productId.price} Rs.</p>
                                            {/* Assuming removeCartItem function works correctly */}
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => removeCartItem(cartItem.productId._id)}
                                            >
                                                Remove Item
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>


                    <div className="col md-4 text-center">

                        <h4>Cart Summary</h4>
                        <p> Total | Checkout |Payment</p>
                        <h3>Total: {totalPrice()}</h3>

                        {auth?.user?.address ? (
                            <>
                                <div className="mb-3">
                                    <h5>Current Adress-{auth?.user?.address}</h5>
                                    <button className="btn btn-outline-warning" onClick={() => navigate('/dashboard/user/profile')}>Update Address</button>
                                </div>
                            </>
                        ) : (

                            <div className="mb-3">
                                {auth?.token ? (
                                    <button className="btn btn-outline-warning"
                                        onClick={() => navigate('/dashboard/user/profile', {
                                            state: '/cart'
                                        })}>Update Address</button>
                                ) : (
                                    <button className="btn btn-outline-warning"
                                        onClick={() => navigate('/login', {
                                            state: '/cart'
                                        })}
                                    >Please login to Checkout</button>
                                )}



                            </div>
                        )}


                        <div className="mt-2">
                            {!clientToken || !auth?.token || !cart?.length ? (
                                ""
                            ) : (
                                <>
                                    <DropIn
                                        options={{
                                            authorization: clientToken,
                                            paypal: {
                                                flow: "vault",
                                            },
                                        }}
                                        onInstance={(instance) => setInstance(instance)}
                                    />

                                    <button
                                        className="btn btn-primary"
                                        onClick={handlePayment}
                                        disabled={loading || !instance || !auth?.user?.address}
                                    >
                                        {loading ? "Processing ...." : "Make Payment"}
                                    </button>
                                </>
                            )}
                        </div>


                    </div>

                </div>
            </div>
        </Layout>
    )
}

export default Cart