import { useState } from "react";
import Layout from "../../components/Layout/Layout"
import axios from "axios";
import { API } from "../../API/endpoint";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";



const CreateNewPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [, , , setOtp, , , email, setEmail] = useAuth();
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API}/forgot-password`, {
                email,
                newPassword,
            });
            if (res && res.data.success) {
                toast.success(res.data && res.data.message);

                navigate("/login");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };
    return (
        <Layout title={"Forgot Password - Ecommerce APP"}>
            <div className="form-container ">
                <form onSubmit={handleSubmit}>
                    <h4 className="title">RESET PASSWORD</h4>
                    <div className="mb-3">
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Enter Your New Password"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        RESET
                    </button>
                </form>
            </div>
        </Layout>
    )
}

export default CreateNewPassword