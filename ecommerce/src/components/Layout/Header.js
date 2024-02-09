
import { NavLink, Link, useNavigate } from "react-router-dom"
import { CgShoppingBag } from "react-icons/cg";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import { useCart } from "../../context/cart";
import useCategory from "../../hooks/useCategory";


import { Badge } from 'antd'
//if user name exist then register should hide

const Header = () => {
    //kewal cart get karna h set nhi so cart hi lete ha usecart se
    const [cart, setCart] = useCart()

    const [auth, setAuth] = useAuth()
    const navigat = useNavigate()

    const categories = useCategory()
    const handleLogout = () => {
        setAuth({ ...auth, user: null, token: '' })
        //user me aur bhi things hai 
        setCart([])
        localStorage.removeItem('auth');
        toast.success('Logout Success')
        navigat('/login')
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary  w-100">
                <div className="container-fluid navBars">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <Link to="/" className="navbar-brand brandsName" ><CgShoppingBag />Ecommerce app</Link>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <Link to="/" className="navbar-brand responsive-brand" ><CgShoppingBag />Ecommerce app</Link>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <SearchInput />
                            {/* <li className="nav-item">
                                <NavLink to="/" className="nav-link" aria-current="page" >Home</NavLink>
                            </li> */}
                            <li className="nav-item dropdown">
                                <Link
                                    className="nav-link dropdown-toggle"
                                    to={"/categories"}
                                    data-bs-toggle="dropdown" >
                                    Categories
                                </Link>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link className="dropdown-item" to={"/categories"}>
                                            All Categories
                                        </Link>
                                    </li>
                                    {categories?.map((c) => (
                                        <li key={c._id}>
                                            <Link
                                                className="dropdown-item"
                                                to={`/category/${c.slug}`}
                                            >
                                                {c.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                            {!auth.user ? (<>
                                <li className="nav-item">
                                    <NavLink to="/register" className="nav-link" >Register</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/login" className="nav-link" >Log in</NavLink>
                                </li>
                            </>) : (<>
                                <>
                                    <li className="nav-item dropdown">
                                        <NavLink
                                            className="nav-link dropdown-toggle"
                                            href="#"
                                            role="button"
                                            data-bs-toggle="dropdown"
                                            style={{ border: "none" }}
                                        >
                                            {auth?.user?.name}
                                        </NavLink>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <NavLink
                                                    //user admin role basis pr dashbord
                                                    to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"
                                                        }`}
                                                    className="dropdown-item"
                                                >
                                                    Dashboard
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink
                                                    onClick={handleLogout}
                                                    to="/login"
                                                    className="dropdown-item"
                                                >
                                                    Logout
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </li>
                                </>
                            </>
                            )}
                            <li className="nav-item">
                                <Badge count={cart?.length} showZero offset={[0, 0]}>
                                    <NavLink to="/cart" className="nav-link" >Cart</NavLink>
                                </Badge>
                            </li>

                        </ul>

                    </div>
                </div>
            </nav>

        </>
    )
}


export default Header