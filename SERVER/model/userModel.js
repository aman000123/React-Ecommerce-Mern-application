
import mongoose from "mongoose";


const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true//white space ignored
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: {},
        required: true
    },

    role: {
        type: Number,
        default: 0

    }
}, {
    //create time will add
    timestamps: true
})

export default mongoose.model('users', userSchema)