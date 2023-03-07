import React from "react";
import Layout from "../core/Layout";

const SignIn = () => <div>
    <Layout title='Login' description=" Login to Node.js and react course">
        {process.env.REACT_APP_API_URL}
    </Layout>

</div>;

export default SignIn;