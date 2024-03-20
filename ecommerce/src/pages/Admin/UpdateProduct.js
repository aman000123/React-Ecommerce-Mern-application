import { useNavigate, useParams } from "react-router-dom";
import Adminmenu from "../../components/Layout/AdminMenu"
import Layout from "../../components/Layout/Layout"
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import { API } from "../../API/endpoint";


const { Option } = Select;

const UpdateProduct = () => {

    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [photo, setPhoto] = useState("");
    //category show id based  so create state another
    const [id, setId] = useState("")
    const navigate = useNavigate();
    const params = useParams();


    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(`${API}/product/get-product/${params.slug}`)
            setName(data?.product.name)
            setId(data?.product?._id)
            setDescription(data?.product.description)
            setCategory(data?.product.category?._id);
            setPrice(data?.product.price)
            setQuantity(data?.product.quantity)
        }
        catch (error) {
            console.log("error in geting single product", error)
            toast.error(error.message)
        }
    }
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

    const handleUpdateProduct = async (e) => {
        e.preventDefault()

        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("quantity", quantity);
            // photo && productData.append("photo", photo);
            productData.append("category", category);
            // Check if a new photo is being uploaded
            if (photo) {
                const allowedImageTypes = ["image/jpeg", "image/png", "image/gif"];
                if (!allowedImageTypes.includes(photo.type)) {
                    toast.error("Only image files (JPEG, PNG, GIF) are allowed for Product image");
                    return;
                }
                const maxSize = 1000000; // 1 MB in bytes
                if (photo.size > maxSize) {
                    toast.error("Product image should be less than 1 MB");
                    return;
                }
                // Add the new photo to FormData
                productData.append("photo", photo);
            }
            const { data } = axios.put(`${API}/product/update-product/${id}`, productData);
            if (data?.success) {
                toast.error(data?.error);
            } else {
                toast.success("Product Updated Successfully");
                navigate("/dashboard/admin/products");
            }
        } catch (error) {
            console.log("error in create product", error)
            toast.error(error.data.message)
        }
    }
    useEffect(() => {
        getSingleProduct();
    }, [])

    const handleDeleteProduct = async () => {
        try {
            //alert for delete
            let answer = window.prompt('Are you want to delete product?')
            if (answer === 'no' || answer === "") return;
            const { data } = await axios.delete(`${API}/product/delete-product/${id}`)
            toast.success('Product deleted success Fully')
            navigate("/dashboard/admin/products");
        } catch (error) {
            console.log("error in deleting product")
            toast.error(error.data.message)
        }
    }
    return (
        <>
            <Layout title={" Dashboard Create-product"}>
                <div className="container-fluid mt-3 p-3">
                    <div className="row">
                        <div className="col-md-3">
                            <Adminmenu />
                        </div>
                        <div className="col-md-9">
                            <div className="m-1 w-75 updateProducts">
                                <Select
                                    bordered={false}
                                    placeholder="Select a category"
                                    size="large"
                                    showSearch
                                    className="form-select mb-3"
                                    onChange={(value) => {
                                        setCategory(value);
                                    }}
                                    value={category}
                                >
                                    {categories?.map((c) => (
                                        <Option key={c._id} value={c._id}>
                                            {c.name}
                                        </Option>
                                    ))}
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
                                    <div className="text-center">
                                        {/* Display uploaded image if 'photo' exists, otherwise fetch from URL */}
                                        <img
                                            src={photo ? URL.createObjectURL(photo) : `${API}/product/product-photo/${id}?${new Date().getTime()}`}
                                            alt="Product"
                                            height={'200px'}
                                            className="imb img-responsive"
                                        />
                                    </div>
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
                                        value={shipping ? "Yes" : "No"}
                                    >
                                        <Option value="0">No</Option>
                                        <Option value="1">Yes</Option>
                                    </Select>
                                </div>
                                <div className="mb-3 updateBtn">
                                    <button className="btn btn-secondary" onClick={handleUpdateProduct}> Update Product</button>
                                    <button className="btn btn-danger" onClick={handleDeleteProduct}> Delete Product</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>

        </>
    )
}

export default UpdateProduct