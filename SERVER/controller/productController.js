import slugify from "slugify";
import productModel from "../model/productModel.js";
import categoryModel from "../model/categoryModel.js";
import orderModel from "../model/orderModel.js";
import fs from 'fs'
import exp from "constants";
import dotenv from "dotenv";

dotenv.config();

import braintree from "braintree";

const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

export const createProduct = async (req, res) => {

    try {
        //photo direct access nhi kar sakte
        //npm i express-formidable

        //ab data ko field  se get

        const { name, description, price, category, quantity, shipping } =
            req.fields;
        const { photo } = req.files;
        //alidation
        switch (true) {
            case !name:
                return res.status(400).send({ error: "Name is Required" });
            case !description:
                return res.status(400).send({ error: "Description is Required" });
            case !price:
                return res.status(400).send({ error: "Price is Required" });
            case !category:
                return res.status(400).send({ error: "Category is Required" });
            case !quantity:
                return res.status(400).send({ error: "Quantity is Required" });
            case photo && photo.size > 1000000:
                return res
                    .status(500)
                    .send({ error: "photo is Required and should be less then 1mb" });
        }

        const products = new productModel({ ...req.fields, slug: slugify(name) });
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: "Product Created Successfully",
            products,
        });
    } catch (error) {
        console.log("error in creating produt", error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in crearing product",
        });
    }

}


export const getAllProductController = async (req, res) => {
    try {

        const products = await productModel.find({}).populate('category').select("-photo").sort({ createdAt: -1 })

        //populate('category')  puri category ki detail bhi mil jati ha product ke andar hi
        //photo ke liye alag api bcz data bhut jyada ho jayega
        res.status(200).send({
            success: true,
            message: "All product geting",
            totalCount: products.length,
            products,

        })
    }
    catch (error) {
        console.log("error in getting all produt", error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in getting All product",
        });
    }
}


export const getSingleProductController = async (req, res) => {

    try {

        const product = await productModel.findOne({ slug: req.params.slug }).select("-photo").populate('category')
        res.status(200).send({
            success: true,
            message: "Single product fetch",
            product,
        })

    }
    catch (error) {
        console.log("error in get single produt", error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in getting single product",
        });
    }
}



export const getproductPhotoController = async (req, res) => {

    try {

        const product = await productModel.findById(req.params.pid).select("photo")
        //select("photo") only photo
        if (product.photo.data) {

            res.set('Content-type', product.photo.contentType)
            return res.status(200).send(product.photo.data)
        }

    } catch (error) {
        console.log("error in getting product photo", error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in getting  product image",
        });
    }


}



export const deleteProductController = async (req, res) => {

    try {
        await productModel.findByIdAndDelete(req.params.pid).select("-photo")
        res.status(200).send({
            success: true,
            message: "Product deleted successfully"
        })

    }
    catch (error) {
        console.log("error in delete product ", error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in delete product",
        });
    }

}



export const updateProductController = async (req, res) => {

    try {
        //photo direct access nhi kar sakte
        //npm i express-formidable

        //ab data ko field  se get

        const { name, description, price, category, quantity, shipping } =
            req.fields;
        const { photo } = req.files;
        //alidation
        switch (true) {
            case !name:
                return res.status(400).send({ error: "Name is Required" });
            case !description:
                return res.status(400).send({ error: "Description is Required" });
            case !price:
                return res.status(400).send({ error: "Price is Required" });
            case !category:
                return res.status(400).send({ error: "Category is Required" });
            case !quantity:
                return res.status(400).send({ error: "Quantity is Required" });
            case photo && photo.size > 1000000:
                return res
                    .status(500)
                    .send({ error: "photo is Required and should be less then 1mb" });
        }


        const products = await productModel.findByIdAndUpdate(
            req.params.pid,
            { ...req.fields, slug: slugify(name) },
            { new: true }
        );


        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: "Product Updated Successfully",
            products,
        });
    } catch (error) {
        console.log("error in updating produt", error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in updating product",
        });
    }

}


export const productFilterController = async (req, res) => {

    try {
        const { checked, radio } = req.body;
        let args = {};
        if (checked.length > 0) args.category = checked
        //radio me to ek hi select
        //$gte==greate than are equal
        //in price data are in array
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] }

        const filterProduct = await productModel.find(args);
        res.status(200).send({
            success: true,
            filterProduct
        })

    } catch (error) {
        console.log("error in filter product", error);
        res.status(400).send({
            success: false,
            error,
            message: "Error in filtering Product",
        });

    }
}


export const loadMoreProductCountController = async (req, res) => {
    //pagination functions
    try {
        const total = await productModel.find({}).estimatedDocumentCount();
        res.status(200).send({
            success: true,
            total
        })

    }
    catch (error) {
        console.log("error in load more product", error);
        res.status(400).send({
            success: false,
            error,
            message: "Error in loadmore Product",
        });

    }
}

//get product per pages
export const productListPerPage = async (req, res) => {
    try {
        //initial 6 product dikhe
        const perPage = 12;
        const page = req.params.page ? req.params.page : 1;
        const products = await productModel
            .find({})
            .select("-photo")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            products,
        });



    } catch (error) {
        console.log("error in load product per page", error);
        res.status(400).send({
            success: false,
            error,
            message: "Error in  Product per page",
        });

    }
}



export const searchProductController = async (req, res) => {
    try {


        ///name aur description le key wise get
        //i==> non sensitive
        const { keyword } = req.params;
        const resutls = await productModel
            .find({
                $or: [
                    { name: { $regex: keyword, $options: "i" } },
                    { description: { $regex: keyword, $options: "i" } },
                ],
            })
            .select("-photo");
        res.json(resutls);

    } catch (error) {
        console.log("error in searching the products", error);
        res.status(400).send({
            success: false,
            error,
            message: "Error in  searching products",
        });

    }



}



export const relatedProductController = async (req, res) => {


    try {
        //product id and category id ke base 
        const { pid, cid } = req.params
        //similer product dikhe niche but jis 4 similer product show karna ho to 1 pr click 3 dikhe niche
        //1 ki id ke base pr htate hain

        //$ne==>not encluded

        const products = await productModel
            .find({
                category: cid,
                _id: { $ne: pid },
            })
            .select("-photo")
            .limit(3)
            .populate("category");

        res.status(200).send({
            success: true,
            products
        })

    } catch (error) {
        console.log("error in similer products", error);
        res.status(400).send({
            success: false,
            error,
            message: "Error in  similer products",
        });

    }
}


export const categoryWiseProductsController = async (req, res) => {

    try {
        const category = await categoryModel.findOne({ slug: req.params.slug });
        const products = await productModel.find({ category }).populate("category");
        res.status(200).send({
            success: true,
            category,
            products,
        });

    }
    catch (error) {
        console.log("Error in  category wise products", error);
        res.status(400).send({
            success: false,
            error,
            message: "Error in  category wise products",
        });
    }
}




export const braintreeTokenController = async (req, res) => {

    try {
        gateway.clientToken.generate({}, function (err, response) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(response);
            }
        });
    } catch (error) {
        console.log("error in braintree payment token", error);
    }



}


export const brainTreePaymentController = async (req, res) => {
    try {
        const { nonce, cart } = req.body;
        let total = 0;

        // Calculate the total amount from products fetched using their IDs
        for (const productId of cart) {
            const product = await productModel.findById(productId);
            if (product) {
                total += product.price;
            }
        }

        // Create a transaction with Braintree
        gateway.transaction.sale(
            {
                amount: total,
                paymentMethodNonce: nonce,
                options: {
                    submitForSettlement: true,
                },
            },
            async function (error, result) {
                if (result && result.success) {
                    // Save order details to your database
                    const order = new orderModel({
                        products: cart, // Save the list of product IDs
                        payment: result,
                        buyer: req.user._id,
                        // Other order details...
                    });

                    // Save the order
                    await order.save();


                    // Send a success response with payment status as true
                    res.json({ ok: true, payment: { ...result, success: true } });
                } else {
                    console.log("Error in Braintree transaction:", error);
                    res.status(500).send(error);
                }
            }
        );
    } catch (error) {
        console.log("Error in payment", error);
        res.status(500).send({ error: "Payment failed" });
    }
};
