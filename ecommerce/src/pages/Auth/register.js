import { useState } from "react"
import Layout from "../../components/Layout/Layout"
import axios from "axios"
import '../../style/Authstyle.css'
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
const Register = () => {


    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();


    // console.log(process.env.API)

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`http://localhost:4004/api/register`, {

                name, email, password, phone, address, answer,
            });
            if (res && res.data.success) {
                toast.success(res.data && res.data.message);
                navigate("/login");
            } else {
                toast.error(res.data.message);
            }

        } catch (error) {
            console.log("error in register", error);
            toast.error("Something went wrong");
        }


    }

    return (
        <>
            <Layout title={"Register -Ecommerce app"}>

                <div className="form-container" style={{ minHeight: "80vh" }}>
                    <form onSubmit={handleFormSubmit} >
                        <h4 className="title">REGISTER FORM</h4>
                        <div className="mb-3">

                            <input type="text"

                                value={name}
                                required
                                onChange={(e) => setName(e.target.value)}
                                className="form-control"
                                aria-describedby="emailHelp" placeholder="Enter your name" />

                        </div>


                        <div className="mb-3">

                            <input type="Email"
                                value={email}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-control" placeholder="Enter your Email id" />
                        </div>


                        <div className="mb-3">

                            <input type="password"
                                value={password}
                                required
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control" aria-describedby="emailHelp" placeholder="Create Password" />

                        </div>

                        <div className="mb-3">

                            <input type="text" className="form-control"
                                value={phone}
                                required
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Enter Your phone number" />
                        </div>

                        <div className="mb-3">

                            <input type="text" className="form-control"
                                value={address}
                                required
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Enter your address" />
                        </div>

                        <div className="mb-3">

                            <input type="text" className="form-control"
                                value={answer}
                                required
                                onChange={(e) => setAnswer(e.target.value)}
                                placeholder="What is your faviorate sports" />
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>

                </div>

            </Layout>
        </>
    )
}


export default Register