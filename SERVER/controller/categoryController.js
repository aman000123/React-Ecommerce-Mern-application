import categoryModel from "../model/categoryModel.js"
import slugify from "slugify"

export const createCategoryColler = async (req, res) => {

    try {

        const { name } = req.body
        if (!name) {
            return res.status(401).send({ message: "Category Name is required" });
        }

        const existCategory = await categoryModel.findOne({ name })

        if (existCategory) {
            return res.status(200).send({
                success: true,
                message: "Category already exist"
            })

        }

        const category = await new categoryModel({ name, slug: slugify(name) }).save()
        return res.status(201).send({
            success: true,
            message: "New Category created",
            category
        })

    } catch (error) {
        console.log("error in create category")
        return res.status(500).send({
            success: false,
            error,
            message: "Error While getting Single Category",
        });
    }


}


export const updateCategoryColler = async (req, res) => {

    try {

        const { name } = req.body
        const { id } = req.params

        const category = await categoryModel.findByIdAndUpdate(id, { name: name, slug: slugify(name) }, { new: true })
        //{new:true} third parameter update karane kre liye use hota hai
        res.status(200).send({
            success: true,
            message: "category Updated successfully",
            category
        });


    } catch (error) {
        console.log("error in update category")
        return res.status(500).send({
            success: false,
            error,
            message: "Error while updating category",
        });
    }

}


export const getAllCategoriesColler = async (req, res) => {

    try {

        const category = await categoryModel.find({})
        return res.status(200).send({
            success: true,
            message: "All categories getting",
            category
        });

    } catch (error) {
        console.log("error in getting all category")
        return res.status(400).send({
            success: false,
            error,
            message: "Error while getting all category",
        });

    }

}


export const getASingleCategoriesColler = async (req, res) => {


    try {


        const category = await categoryModel.findOne({ slug: req.params.slug })
        return res.status(200).send({
            success: true,
            message: "Get single category successfully",
            category
        });


    } catch (error) {
        console.log("error in getting single category")
        return res.status(500).send({
            success: false,
            error,
            message: "Error while getting single category",
        });
    }

}


export const deleteCategoriesColler = async (req, res) => {

    try {

        const { id } = req.params;
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "Categry Deleted Successfully",
        });

    } catch (error) {
        console.log("error in delete category")
        res.status(500).send({
            success: false,
            error,
            message: "Error while deleting category",
        });
    }

}