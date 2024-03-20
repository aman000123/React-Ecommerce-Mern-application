import Footer from "./Footer"
import Header from "./Header"
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";


const Layout = ({ children, title, description, keywords, author }) => {
    //for seo  react-helmet
    //title me wahi show ho jis page me ja rahe h
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />
                <title>{title}</title>
            </Helmet>

            <Header />
            {/* <Backgrounds /> */}
            <main style={{ minHeight: '100vh' }}
                className="container-fluid main">
                <Toaster />
                {children}
            </main>
            <Footer />
        </>
    )
}

Layout.defaultProps = {
    title: "Ecommerce app - shop now",
    description: "mern stack project",
    keywords: "mern,react,node,mongodb",
    author: "Aman",
};

export default Layout
