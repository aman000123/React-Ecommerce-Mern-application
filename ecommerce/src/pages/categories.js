import { Link } from "react-router-dom"
import Layout from "../components/Layout/Layout"
import useCategory from "../hooks/useCategory"



const AllCategoryPage = () => {
    const categories = useCategory()
    return (
        <Layout title={"All Categories"}>
            <div className="row container m-3">
                {categories.map(c => (
                    <div className="col-md-6 mt-5  mb-3 gx-3 gy-5" key={c._id}>
                        {/* for gap gx-5 */}
                        <button className="btn btn-primary text-light" key={c._id}> <Link to={`/category/${c.slug}`}
                            className="text-light"
                            style={{ textDecoration: "none" }}>{c.name}</Link></button>
                    </div>
                ))}
            </div>

        </Layout>
    )
}
export default AllCategoryPage