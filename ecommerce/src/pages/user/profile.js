import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout"
import UserMenu from "../../components/Layout/UserMenu"
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import { API } from "../../API/endpoint";



const Profile = () => {

    //context
    const [auth, setAuth] = useAuth()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const navigate = useNavigate();
    const location = useLocation();

    //get user data

    useEffect(() => {
        const { email, name, phone, address } = auth?.user;
        setName(name)
        setEmail(email)
        setPhone(phone)
        setAddress(address)
    }, [auth?.user])

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        ///update

        try {
            const { data } = await axios.put(`${API}/update`, {

                name, email, password, phone, address,
            });

            if (data?.error) {
                toast.error(data?.error)
            }
            else {
                setAuth({ ...auth, user: data?.updateUser })

                let locals = localStorage.getItem('auth')
                locals = JSON.parse(locals);
                locals.user = data?.updateUser;
                localStorage.setItem('auth', JSON.stringify(locals))
                toast.success('Profile Update Succesfully')
                navigate(location.state || "/cart");
            }

        } catch (error) {
            console.log("error in profile", error);
            toast.error("Something went wrong");
        }


    }

    return (
        <>
            <Layout title={"Your Profile"}>
                <div className="container-fluid mt-5 p-3 dashboard ">
                    <div className="row justify-content-center">
                        <div className="col-md-3">
                            <UserMenu />
                        </div>
                        <div className="col-md-8">
                            <div className="form-container" >
                                <form onSubmit={handleFormSubmit}>
                                    <h4 className="title">USER PROFILE</h4>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="form-control"
                                            id="exampleInputEmail1"
                                            placeholder="Enter Your Name"
                                            autoFocus
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="form-control"
                                            id="exampleInputEmail1"
                                            placeholder="Enter Your Email "
                                            disabled
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="form-control"
                                            id="exampleInputPassword1"
                                            placeholder="Enter Your Password"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="form-control"
                                            id="exampleInputEmail1"
                                            placeholder="Enter Your Phone"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            className="form-control"
                                            id="exampleInputEmail1"
                                            placeholder="Enter Your Address"
                                        />
                                    </div>

                                    <button type="submit" className="btn btn-primary">
                                        UPDATE
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>

        </>
    )
}




export default Profile