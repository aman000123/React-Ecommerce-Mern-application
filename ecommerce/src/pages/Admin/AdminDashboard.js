import Adminmenu from "../../components/Layout/AdminMenu"
import Layout from "../../components/Layout/Layout"
import { useAuth } from "../../context/auth"

const AdminDashboard = () => {

    const [auth] = useAuth()
    return (
        <>
            <Layout title={"Admin Dashboard"}>
                <div className="container-fluid mt-3 p-3 adminDashboard">
                    <div className="row">
                        <div className="col-md-3">
                            <Adminmenu />
                        </div>
                        <div className="col-md-9 adm">
                            <div className="card w-75 p-3 m-auto">
                                <h5> Admin Name : {auth?.user?.name}</h5>
                                <h5> Admin Email : {auth?.user?.email}</h5>
                                <h5> Admin Contact : {auth?.user?.phone}</h5>
                            </div>
                        </div>
                    </div>
                </div>


            </Layout></>
    )
}

export default AdminDashboard
