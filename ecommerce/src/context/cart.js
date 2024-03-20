
import axios from "axios";
import { useState, useEffect, useContext, createContext } from "react";
import { useAuth } from "./auth";
import toast from "react-hot-toast";
import { API } from "../API/endpoint";

const CartContext = createContext();

const CartProvider = ({ children }) => {

    const [cart, setCart] = useState([])

    const [auth] = useAuth()

    const userId = auth?.user?.userid

    const addToCart = async (productId) => {
        try {

            const response = await axios.post(`${API}/cart/cartAdd/${userId}`, {
                productId,
                quantity: 1, // Assuming you're adding one quantity at a time
            });

            if (response.data.success) {
                const updatedCart = [...cart, response.data?.cart];
                toast.success("Product add into your cart")

                setCart(updatedCart);
            }
        } catch (error) {
            // Handle error response from the server
            if (error.response && error.response.status === 400) {
                toast.error("Product hasbeen added already")
            } else {
                console.log("Error adding to cart:", error);
                // Handle other errors, display an error message, etc.
            }
        }
    };

    const fetchCart = async () => {
        try {
            const response = await axios.get(`${API}/cart/getCart/${userId}`);
            if (response.data?.cart) {
                setCart(response.data?.cart?.items);
                // Assuming cart.items contains the items array
            }
        } catch (error) {
            console.error('Error fetching cart:', error);

        }
    };


    useEffect(() => {
        if (auth?.user) {
            fetchCart();
        }
    }, [auth?.user])



    const removeFromCart = async (productId) => {
        try {
            const response = await axios.delete(`${API}/cart/cartDelete/${userId}/${productId}`);
            if (response.data.success) {
                const updatedCart = cart.filter(item => item.productId !== productId);
                setCart(updatedCart);
                fetchCart();
            }
        } catch (error) {
            console.log("Error removing item from cart", error);
            // Handle error, display error message, etc.
        }
    };


    return <CartContext.Provider value={[cart, addToCart, removeFromCart, fetchCart]}>
        {/* //now we can use auth and set auth anywhere */}
        {children}
    </CartContext.Provider>

}

//create custom hooks
const useCart = () => useContext(CartContext)

export { useCart, CartProvider }