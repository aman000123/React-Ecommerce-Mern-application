import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import '../../style/Authstyle.css';
import { API } from "../../API/endpoint";
import { useAuth } from "../../context/auth";

function ForgotPassword() {
    const navigate = useNavigate();
    const [, , , setOtp, , , email, setEmail] = useAuth();
    const [userEnteredEmail, setUserEnteredEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const OTP = Math.floor(Math.random() * 9000 + 1000);
        console.log("otp", OTP);
        setOtp(OTP);
        try {
            const response = await axios.post(`${API}/sent-otp`, {
                OTP,
                recipient_email: userEnteredEmail
            });
            if (response.status === 200) {
                console.log("Email id is valid");
                toast.success("Your Email id is valid");
                setEmail(userEnteredEmail);
                navigate('/enter-otp');
            }
        } catch (error) {
            console.error("Error occurred:", error);
            toast.error("Please enter a valid email id");
        }
    };



    return (
        <Layout title={"Forgot Password - Ecommerce APP"}>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <h4 className="title">Sent Otp To Emailid</h4>
                    <div className="mb-3">
                        <input
                            type="email"
                            value={userEnteredEmail}
                            onChange={(e) => setUserEnteredEmail(e.target.value)}
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder="Enter Your Email"
                            required />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        SENT
                    </button>
                </form>
            </div>
        </Layout>
    );
}

export default ForgotPassword;
