
import { NavLink } from "react-router-dom"
const Adminmenu = () => {
    return (
        <>
            <div className="text-center">
                <div className="list-group dashboard-menu mt-3">
                    {/* <h4>Admin Panel</h4> */}
                    <NavLink
                        to="/dashboard/admin/create-category"
                        className="list-group-item list-group-item-action"
                    >
                        Create Category
                    </NavLink>
                    <NavLink
                        to="/dashboard/admin/create-product"
                        className="list-group-item list-group-item-action"
                    >
                        Create Product
                    </NavLink>
                    <NavLink
                        to="/dashboard/admin/products"
                        className="list-group-item list-group-item-action"
                    >
                        All Products
                    </NavLink>
                    <NavLink
                        to="/dashboard/admin/orders"
                        className="list-group-item list-group-item-action"
                    >
                        Orders
                    </NavLink>

                </div>
            </div>
        </>
    )

}

export default Adminmenu