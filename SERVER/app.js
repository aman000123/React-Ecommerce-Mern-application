
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan'
import dotenv from 'dotenv'

import cors from 'cors'

//morgan package ke karan hi hme log me terminal ke dikhta hia jo bhi browser me access hota h
//debug me get,post,put me

import connectDb from './config/db.js'
import authRoutes from './routes/auth.js'

import categortRoutes from './routes/CategoryRoutes.js'
import productRoutes from './routes/ProductRoutes.js'

import cartRoutes from './routes/cartRoutes.js'
//config env
dotenv.config()

//database connect
connectDb()

const app = express();
const port = process.env.PORT || 4004;

app.listen(port, () => {
    console.log("Connected at  4004 ports")

})

app.get('/', (req, res) => {
    res.send("Hello node js")
})

app.use(cors())


const __dirname = path.dirname(new URL(import.meta.url).pathname);
app.use(logger('dev'));
//app.use(express.json());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

//app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// app.use('/', indexRouter);
app.use('/api', authRoutes);
app.use('/api/category', categortRoutes);
app.use('/api/product', productRoutes);
app.use('/api/cart', cartRoutes)


export default app
