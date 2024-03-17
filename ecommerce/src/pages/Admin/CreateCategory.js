import { useEffect, useState } from "react"
import Adminmenu from "../../components/Layout/AdminMenu"
import Layout from "../../components/Layout/Layout"
import toast from "react-hot-toast"
import axios from "axios"
import CategoryForm from "../../components/Form/categoryForm"
import { Modal } from "antd";
import { API } from "../../API/endpoint"

const CreateCategory = () => {

    const [categories, setCategories] = useState([])

    const [name, setName] = useState();
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${API}/category/create-category`, {
                name
            })
            if (!name) {
                toast.error(data.message)

            }
            // console.log("data i", data)

            if (data?.success) {
                toast.success(`${data?.category.name} is Created`)
                getAllCategory()
                setName("")
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log("error in cartegory form", error);
            toast.error(error?.response?.data.message)
        }
    }


    //get all
    const getAllCategory = async () => {

        try {
            //res ke andar data hota ha destructure
            const { data } = await axios.get(`${API}/category/get-categories`);
            if (data?.success) {
                setCategories(data?.category);
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



    const handleUpdate = async (e) => {
        e.preventDefault()

        try {


            const { data } = await axios.put(`${API}/category/update-category/${selected._id}`, { name: updatedName });

            if (!updatedName) {
                toast.error("Please enter the category name")
                return

            }
            if (data.success) {
                toast.success(`${updatedName} is updated`)
                setSelected(null)
                setUpdatedName("")
                setVisible(false)
                getAllCategory()
            }
            else {
                toast.error(data?.message)

            }

        } catch (error) {
            console.log("error in edit", error)
        }


    }



    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete(`${API}/category/delete-category/${id}`);
            if (data.success) {
                alert("Are you want to delete category?")
                toast.success(`Category is deleted`)
                getAllCategory()
            }
            else {
                toast.error(data?.message)
            }

        } catch (error) {
            console.log("error in delete", error)
        }
    }


    return (
        <> <Layout title={"Dashboard Create-category "}>
            <div className="container-fluid mt-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <Adminmenu />
                    </div>
                    <div className="col-md-9">

                        <div className="p-3 w-50" >
                            <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
                        </div>
                        <div className="w-75 catDiv">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Actions</th>

                                    </tr>
                                </thead>
                                <tbody>

                                    {categories?.map(c => (
                                        <tr key={c._id}>
                                            <>

                                                <td >{c.name}</td>
                                                <td className="catEdit"><button className="btn btn-primary ms-2"
                                                    onClick={() => {
                                                        setVisible(true);
                                                        setUpdatedName(c.name);
                                                        setSelected(c)
                                                    }}>Edit</button>
                                                    <button className="btn btn-danger ms-2 "
                                                        onClick={() => handleDelete(c._id)}>Delete</button></td>
                                            </>
                                        </tr>
                                    ))}


                                </tbody>
                            </table>


                        </div>
                        <Modal
                            onCancel={() => setVisible(false)}
                            footer={null}
                            visible={visible}
                        >
                            <CategoryForm
                                value={updatedName}
                                setValue={setUpdatedName}
                                handleSubmit={handleUpdate}
                            />
                        </Modal>


                    </div>
                </div>
            </div>
        </Layout></>
    )
}

export default CreateCategory