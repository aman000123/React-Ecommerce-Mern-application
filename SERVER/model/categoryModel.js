
import mongoose from "mongoose";

const categoryScheema = new mongoose.Schema({
    name: {
        type: String,
        // require: true,
        // unique: true
    },
    slug: {
        type: String,
        lowerCase: true
    }
})


export default mongoose.model('Category', categoryScheema)