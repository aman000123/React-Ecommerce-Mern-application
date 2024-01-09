import mongoose from "mongoose";

const productModel = mongoose.Schema({

    name: {
        type: String,
        require: true,

    },
    slug: {
        type: String,
        require: true,

    },
    description: {
        type: String,
        require: true,

    },
    price: {
        type: Number,
        require: true,

    },
    category: {
        type: mongoose.ObjectId,
        ref: 'Category',
        require: true,

    },
    quantity: {
        type: Number,
        require: true
    },
    photo: {
        data: Buffer, //in buffer we can save type pf any file
        contentType: String
    },
    shipping: {
        type: Boolean,

    }

}, {
    timeStamps: true
})


export default mongoose.model('products', productModel)