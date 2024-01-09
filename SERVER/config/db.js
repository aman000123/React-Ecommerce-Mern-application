import mongoose from "mongoose";

const connectDb = async () => {

    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log("connected to database succesfullly with " + conn.connection.host)
    }
    catch (err) {
        console.log("err in connection", err)
    }

}

export default connectDb;
