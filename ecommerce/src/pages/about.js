import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
    return (
        <Layout title={"About us - Ecommer app"}>
            <div className="row contactus ">
                <div className="col-md-6 ">
                    <img
                        src="/images/about.jpeg"
                        alt="contactus"
                        style={{ width: "85%" }}
                    />
                </div>
                <div className="col-md-6">
                    <p className="text-justify mt-2">
                        Welcome to AMAN Ecommerce, your go-to destination for high-quality products and exceptional customer service. Founded in 2023, we are passionate about better services provide to our customer.
                    </p>



                    <strong className="text-justify mt-2">
                        Why choose AMAN Ecommerce? Here are a few reasons:
                    </strong>

                    <ul>
                        <li>Quality Products: We source and deliver only the finest quality products.</li>
                        <li>Customer Satisfaction: Your satisfaction is our top priority. We value your feedback and continuously strive to exceed your expectations.</li>
                        <li>Exceptional Service: Our team is here to assist you every step of the way. Have a question or need support? We're just a message away!</li>
                        <li>Community Engagement: We are proud to be part of digital india and actively engage with our community.</li>
                    </ul>


                    <p className="text-justify mt-2">
                        Feel free to explore our website and discover the [unique features, products, or services] that set us apart. If you have any questions or feedback, we'd love to hear from you!
                    </p>



                </div>
            </div>
        </Layout>
    );
};

export default About;