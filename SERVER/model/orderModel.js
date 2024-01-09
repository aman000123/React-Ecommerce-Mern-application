import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {

        // sare products aaray me honge
        products: [
            {
                type: mongoose.ObjectId,
                ref: "products",
            },
        ],
        payment: {},
        buyer: {
            type: mongoose.ObjectId,
            ref: "users",
        },
        status: {
            type: String,
            default: "Not Process",
            enum: ["Not Process", "Processing", "Shipped", "deliverd", "cancel"],

            //enum means select box me pass multi values
        },
    },
    { timestamps: true }
);

export default mongoose.model("Order", orderSchema);