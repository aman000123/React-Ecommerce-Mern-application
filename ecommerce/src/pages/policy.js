import React from "react";
import Layout from "./../components/Layout/Layout";

const Policy = () => {
    return (
        <Layout title={"Privacy Policy"}>
            <div className="row contactus " style={{ padding: "0px 25px" }}>
                <div className="col-md-6">
                    <img
                        src="/images/policy1.jpg"
                        alt="contactus"
                        style={{ width: "75%" }}
                    />
                </div>
                <div className="col-md-6">
                    <p>
                        <strong>At [AMAN Ecommerce]</strong>, we take your privacy seriously. This Privacy Policy outlines the types of personal information we collect, how it is used, and your choices regarding the information.
                    </p>

                    <p>
                        <strong>Information We Collect:</strong>
                        We may collect personal information, such as your name, email address, and other relevant details when you interact with our website or services.
                    </p>

                    <p>
                        <strong>How We Use Your Information:</strong>
                        The information we collect may be used to personalize your experience, improve our website, send periodic emails, and provide customer support. We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties.
                    </p>

                    <p>
                        <strong>Security:</strong>
                        We implement a variety of security measures to maintain the safety of your personal information. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.
                    </p>

                    <p>
                        <strong>Cookies:</strong>
                        Our website may use cookies to enhance your experience. You can choose to disable cookies through your browser settings.
                    </p>

                    <p>
                        <strong>Third-Party Links:</strong>
                        Our website may contain links to third-party websites. We have no control over the content or privacy practices of these sites and encourage you to review their privacy policies.
                    </p>



                </div>
            </div>
        </Layout>
    );
};

export default Policy;