
import mongoose from "mongoose";
import cartModel from "../model/cartModel.js";

export const cartController = async (req, res) => {
    try {
        const { userId } = req.params;
        const { productId } = req.body;


        let cart = await cartModel.findOne({ userId });

        if (!cart) {
            cart = new cartModel({ userId, items: [] });
        }

        const existingItem = cart.items.find(item => item.productId.toString() === productId);
        if (existingItem) {
            // If the product already exists, send an error message
            return res.status(400).json({
                success: false,
                message: "Product already exists in the cart",
            });
        }
        // If the product does not exist, add it to the cart
        cart.items.push({ productId, quantity: 1 });

        await cart.save();
        res.status(201).send({
            success: true,
            message: "Product added to cart successfully",
            cart
        });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ success: false, message: 'Failed to add item to cart' });
    }
};




export const getCartController = async (req, res) => {
    const userId = req.params.userId.trim();

    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid userId format' });
        }

        const userCart = await cartModel.findOne({ userId }).populate('items.productId');

        if (!userCart) {
            return res.status(404).json({ message: 'Cart not found for this user.' });
        }

        const cartLength = userCart.items.length;

        res.json({ cartLength, cart: userCart });

    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



export const deleteCartController = async (req, res) => {
    try {
        const { userId, productId } = req.params;

        const updatedCart = await cartModel.findOneAndUpdate(
            { userId },
            { $pull: { items: { productId } } },
            { new: true } // To return the updated cart after deletion
        );
        // { $pull: { items: { productId } } }: The $pull operator is used to remove elements from an array that match certain criteria. In this case, it removes an item from the items array where the productId matches the given productId.

        if (!updatedCart) {
            return res.status(404).json({ success: false, message: 'Cart not found for this user' });
        }

        res.status(200).json({ success: true, message: 'Cart item deleted successfully', cart: updatedCart });
    } catch (error) {
        console.error('Error deleting cart item:', error);
        res.status(500).json({ success: false, message: 'Failed to delete cart item' });
    }
}
