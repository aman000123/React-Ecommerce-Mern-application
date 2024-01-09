
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="bg-dark text-light footer container-fluid">
            <h4 className="text-center">All Right Reserved &copy; Aman</h4>
            <p className="text-center mt-3">
                <Link to="/about">About</Link>|<Link to="/contact">Contact</Link>|
                <Link to="/policy">Privacy Policy</Link>
            </p>
        </div>
    )
}
export default Footer