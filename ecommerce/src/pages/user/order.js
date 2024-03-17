import { useEffect, useState } from "react"
import Layout from "../../components/Layout/Layout"
import UserMenu from "../../components/Layout/UserMenu"
import axios from "axios"
import { useAuth } from "../../context/auth"
import moment from "moment"
import { API } from "../../API/endpoint"

const UserOrder = () => {

    const [auth, setAuth] = useAuth()

    const [orders, setOrders] = useState([])


    const getOrders = async () => {
        try {

            const { data } = await axios.get(`${API}/orders`)
            // console.log("data in orders data", data)
            // console.log("data in orders", data?.orders)
            setOrders(data)


        } catch (error) {
            console.log("error on geting order")
        }
    }

    useEffect(() => {
        if (auth?.token) getOrders()
    }, [auth?.token])
    return (
        <>

            <Layout title={"User Order"}>
                <div className="container fluid p-3 mt-5 dashboard ">
                    <div className="row ">
                        <div className="col-md-3">
                            <UserMenu />
                        </div>
                        <div className="col-md-8 tabelDetails">
                            {/* <h3 className="text-center "> Orders</h3> */}
                            {orders?.map((o, index) => {
                                return (
                                    <div className="border shadow" key={index}>
                                        <table className="table usertables">
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
                                                    <td>{o?.status}</td>
                                                    <td>{o?.buyer?.name}</td>
                                                    <td>{moment(o?.createdAt).fromNow()}</td>
                                                    <td>{o?.payment.success ? "Success" : "Failed"}</td>
                                                    <td>{o?.products?.length}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className="container  userorders">
                                            {o?.products?.map((p, i) => (
                                                <div className="row mb-2 p-3 card flex-row" key={i}>
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
                                                    <div className="col-md-8 description">
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


                </div>


            </Layout></>
    )
}

export default UserOrder