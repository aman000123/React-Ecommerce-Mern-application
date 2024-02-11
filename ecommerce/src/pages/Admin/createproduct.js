import { useNavigate } from "react-router-dom";
import Adminmenu from "../../components/Layout/AdminMenu"
import Layout from "../../components/Layout/Layout"
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import { API } from "../../API/endpoint";

const { Option } = Select;

const CreateProduct = () => {

    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [photo, setPhoto] = useState("");


    const navigate = useNavigate();

    const getAllCategory = async () => {

        try {
            //res ke andar data hota ha destructure
            const { data } = await axios.get(`${API}/category/get-categories`);
            if (data?.success) {
                setCategories(data?.category);
                // toast.success(data?.message)
            }

        }
        catch (error) {


            console.log("error in fething categories", error)
            toast.error("Some things went wrong for getting category")
        }
    }

    useEffect(() => {
        getAllCategory()
    }, [])


    const handleCreateProduct = async (e) => {
        e.preventDefault()
        // Client-side validation

        // Additional check for photo presence if it exists
        if (!category) {
            toast.error("Category is required");
            return; // Prevent further execution
        }


        if (!photo) {
            toast.error("Photo is required");
            return; // Prevent further execution
        }
        // Client-side validation...


        // Check if the file is an image
        const allowedImageTypes = ["image/jpeg", "image/png", "image/gif"];
        if (!allowedImageTypes.includes(photo.type)) {
            toast.error("Only image files (JPEG, PNG, GIF) are allowed for Product image");
            return; // Prevent further execution
        }


        // Check if photo exists and its size
        if (photo) {
            const maxSize = 1000000; // 1 MB in bytes
            if (photo.size > maxSize) {
                toast.error("Product image should be less than 1 MB");
                return; // Prevent further execution
            }
        } else {
            toast.error("Photo is required");
            return; // Prevent further execution
        }

        const requiredFields = { name, description, price, category, quantity, photo };
        const emptyField = Object.entries(requiredFields)
            .filter(([key, value]) => !value)
            .map(([key]) => key);

        if (emptyField.length > 0) {
            toast.error(`${emptyField[0]} is required`);
            return; // Prevent further execution
        }

        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("quantity", quantity);
            productData.append("photo", photo);
            productData.append("category", category);


            const { data } = axios.post(`${API}/product/create-product`, productData);


            if (data?.success) {
                console.log("data in upload produdt", data)
                toast.error(data?.error);
            } else {
                toast.success("Product Created Successfully");
                navigate("/dashboard/admin/products");
            }
        } catch (error) {
            console.log("error in create product", error)
            toast.error(error.data.message)
        }
    }

    return (
        <>
            <Layout title={" Dashboard Create-product"}>
                <div className="container-fluid m-3 p-3">
                    <div className="row">
                        <div className="col-md-3">
                            <Adminmenu />
                        </div>
                        <div className="col-md-9 mt-3">
                            <h1>Create Product</h1>
                            <div className="m-1 w-75 creatrProAll">
                                <Select bordered={false} placeholder="Select A category" size="large" showSearch
                                    className="form-select mb-3" onChange={(value) => { setCategory(value) }}>{
                                        categories?.map(c => (
                                            <option key={c._id} value={c._id}>
                                                {c.name}
                                            </option>
                                        ))
                                    }

                                </Select>
                                <div className="mb-3">
                                    <label className="btn btn-outline-secondary">
                                        {photo ? photo.name : "Upload Photo"}
                                        <input type="file" name="photo" accept="images/*"
                                            onChange={(e) => setPhoto(e.target.files[0])} hidden

                                        /></label>
                                    {/* //img koi type ho */}
                                </div>
                                <div className="mb-3">
                                    {photo && (<div className="text-center">
                                        {/* browser ki url property se image ko fetch */}
                                        <img src={URL.createObjectURL(photo)}
                                            alt="Product photo"
                                            height={'200px'}
                                            className="imb img-responsive" />
                                    </div>)}

                                </div>
                                <div className="mb-3">
                                    <input type="text" value={name} className="form-control"
                                        placeholder="Write product name" onChange={(e) => setName(e.target.value)} />
                                </div>

                                <div className="mb-3">
                                    <textarea type="text" value={description} className="form-control"
                                        placeholder="Write product description" onChange={(e) => setDescription(e.target.value)} />
                                </div>

                                <div className="mb-3">
                                    <input type="number" value={price} className="form-control"
                                        placeholder="Write product price" onChange={(e) => setPrice(e.target.value)} />
                                </div>

                                <div className="mb-3">
                                    <input type="text" value={quantity} className="form-control"
                                        placeholder="Write product Quantity" onChange={(e) => setQuantity(e.target.value)} />
                                </div>

                                <div className="mb-3">
                                    <Select
                                        bordered={false}
                                        placeholder="Select Shipping "
                                        size="large"
                                        showSearch
                                        className="form-select mb-3"
                                        onChange={(value) => {
                                            setShipping(value);
                                        }}
                                    >
                                        <Option value="0">No</Option>
                                        <Option value="1">Yes</Option>
                                    </Select>
                                </div>
                                <div className="mb-3">
                                    <button className="btn btn-primary" onClick={handleCreateProduct}> Create Product</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </Layout>














        </>
    )
}

export default CreateProduct