import { useEffect, useState } from "react"
import Adminmenu from "../../components/Layout/AdminMenu"
import Layout from "../../components/Layout/Layout"
import moment from "moment"
import axios from "axios"
import { useAuth } from "../../context/auth"
import { Select } from "antd"
import { API } from "../../API/endpoint"


const { Option } = Select
const AdminOrder = () => {


    const [status, setStatus] = useState(["Not Process", "Processing", "Shipped", "deliverd", "cancel"])
    //enum: ["Not Process", "Processing", "Shipped", "deliverd", "cancel"],  order model me pass kiya tha

    const [changeStatus, setChangeStatus] = useState("")


    const [auth, setAuth] = useAuth()

    const [orders, setOrders] = useState([])


    const getOrders = async () => {
        try {

            const { data } = await axios.get(`${API}/Allorders`)
            //   console.log("data in admin orders", data)
            setOrders(data)

        } catch (error) {
            console.log("error on geting order")
        }
    }

    useEffect(() => {
        if (auth?.token) getOrders()
    }, [auth?.token])

    const handleOnChange = async (orderId, value) => {
        ///order-status/:orderId
        try {

            const { data } = await axios.put(`${API}/order-status/${orderId}`, {
                status: value
            })
            getOrders()

        } catch (error) {
            console.log("error in updation product status", error)
        }

    }
    return (
        <Layout title={"All orders"}>
            <div className="row mt-5">
                <div className="col-md-3">
                    <Adminmenu />
                </div>
                <div className="col-md-9">
                    <h1 className="text-center">All orders</h1>
                    {orders?.map((o, index) => {
                        return (
                            <div className="border shadow">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Number</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Buyer</th>
                                            <th scope="col"> date</th>
                                            <th scope="col">Payment</th>
                                            <th scope="col">Quantity</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>
                                                <Select bordered={false}
                                                    onChange={(value) => handleOnChange(o?._id, value)} defaultValue={o?.status}>
                                                    {status.map((s, i) => (
                                                        <Option key={i} value={s}>{s}</Option>
                                                    ))}
                                                </Select>



                                            </td>
                                            <td>{o?.buyer?.name}</td>
                                            <td>{moment(o?.createdAt).fromNow()}</td>
                                            <td>{o?.payment.success ? "Success" : "Failed"}</td>
                                            <td>{o?.products?.length}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="container">
                                    {o?.products?.map((p, i) => (
                                        <div className="row mb-2 p-3 card flex-row" key={p._id}>
                                            <div className="col-md-4 allproducts">
                                                <img
                                                    src={`${API}/product/product-photo/${p._id}`}
                                                    className="card-img-top"
                                                    alt={p.name}
                                                    style={{
                                                        objectFit: 'cover', width: '130px', height: '100px', display: "block", margin: "auto"
                                                    }}
                                                />
                                            </div>
                                            <div className="col-md-8">
                                                <p>{p.name}</p>
                                                <p>{p.description.substring(0, 30)}</p>
                                                <p>Price : {p.price}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Layout>

    )
}

export default AdminOrder