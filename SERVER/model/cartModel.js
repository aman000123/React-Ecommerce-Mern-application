


import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true },
            quantity: { type: Number, default: 1 },
        },
    ],
});

export default mongoose.model('Cart', cartSchema);
