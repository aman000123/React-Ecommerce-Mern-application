
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import About from "./pages/about";
import Contact from "./pages/contact";
import PageNotFound from "./pages/Pagenotfound";
import Policy from "./pages/policy";
import Register from "./pages/Auth/register";
import Login from "./pages/Auth/Login";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Dashboard from "./pages/user/Dahboard";
import PrivateRoutes from "./components/Routes/privaterotes";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminRoutes from "./components/Routes/AdminRoutes";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/createproduct";
import AllUsers from "./pages/Admin/Users";
import UserOrder from "./pages/user/order";
import Profile from "./pages/user/profile";
import ProductPage from "./pages/Admin/Product";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import SearchInput from "./components/Form/SearchInput";
import SearchPage from "./components/SearchPage";
import ProductDetailes from "./pages/ProductDetails";
import AllCategoryPage from "./pages/categories";
import SingleCategoryProduct from "./pages/SinglecategoryProduct";
import Cart from "./pages/cartPage";
import AdminOrder from "./pages/Admin/AdminOrders";
import EnterOtp from "./pages/Auth/enterOtp";
import CreateNewPassword from "./pages/Auth/createNewPassword";



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:slug" element={<ProductDetailes />} />
        <Route path="/categories" element={<AllCategoryPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/category/:slug" element={<SingleCategoryProduct />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/about" element={<About />}></Route>
        <Route path="/dashboard" element={<PrivateRoutes />}>
          <Route path="user" element={<Dashboard />}></Route>
          <Route path="user/orders" element={<UserOrder />}></Route>
          <Route path="user/profile" element={<Profile />}></Route>
        </Route>

        <Route path="/dashboard" element={<AdminRoutes />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/products" element={<ProductPage />} />
          <Route path="admin/users" element={<AllUsers />} />
          <Route path="admin/orders" element={<AdminOrder />} />
        </Route>

        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/policy" element={<Policy />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/reset-password" element={<CreateNewPassword />}></Route>
        <Route path="/enter-otp" element={<EnterOtp />}></Route>


        <Route path="/forgetpassword" element={<ForgotPassword />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </>
  );
}
export default App;
