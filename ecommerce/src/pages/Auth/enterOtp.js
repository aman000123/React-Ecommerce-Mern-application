import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import OtpInput from 'react-otp-input';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API } from "../../API/endpoint";
import { useAuth } from "../../context/auth";

const EnterOtp = () => {
    const [timerCount, setTimer] = useState(60);
    const [disable, setDisable] = useState(true);
    const navigate = useNavigate();
    const [auth, setAuth, otp, setOtp, OTPinput, setOTPinput, email, setEmail] = useAuth();
    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prevCount) => {
                if (prevCount === 0) {
                    setDisable(false);
                    clearInterval(interval);
                    return 60;
                } else {
                    return prevCount - 1;
                }
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [disable]);

    function resendOTP() {
        console.log("email", email)
        if (disable) return;
        axios.post(`${API}/sent-otp`, {
            OTP: otp,
            recipient_email: email,
        })
            .then(() => setDisable(true))
            .then(() => alert("A new OTP has successfully been sent to your email."))
            .then(() => setTimer(60))
            .catch(console.log);
    }

    const verifyOTP = () => {
        const enteredOTP = OTPinput.join(""); // Join OTPinput array to form a string
        const receivedOTPString = otp.toString(); // Convert received OTP to string
        if (enteredOTP === receivedOTPString) {
            console.log("writeOtp");
            navigate('/reset-password');
        } else {
            alert("The code you have entered is not correct, try again or re-send the link");
        }
    }

    const handleChange = (otpValue) => {
        const updatedOTPinput = Array.isArray(otpValue) ? otpValue : [otpValue];
        setOTPinput(updatedOTPinput);
    };


    return (
        <Layout title={"Enter OTP"}>
            <div className="form-container">
                <div className="otpInput">
                    <h6 className="">We have sent a code to your email</h6>
                    <OtpInput
                        value={OTPinput}
                        onChange={handleChange}
                        numInputs={4}
                        separator={<span>-</span>}
                        renderInput={(props) => <input {...props} />}
                        containerStyle={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '20px',
                        }}
                        inputStyle={{
                            width: '50px',
                            height: '50px',
                            fontSize: '24px',
                            textAlign: 'center',
                            margin: '0 10px',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                            outline: 'none',
                        }}
                    />
                    <button onClick={verifyOTP}>Verify Account</button>
                    <div className="resend mt-3">
                        <p>Didn't receive the code?</p>{" "}
                        <p
                            style={{
                                color: disable ? "gray" : "#0d6efd",
                                cursor: disable ? "default" : "pointer",
                                textDecorationLine: disable ? "none" : "underline",
                            }}
                            onClick={resendOTP}
                        >
                            {disable ? `Resend OTP in ${timerCount}s` : "Resend OTP"}
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default EnterOtp;
