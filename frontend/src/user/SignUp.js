import React, {useState} from "react";
import Layout from "../core/Layout";
import {API} from "../config";

const SignUp = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    });

    const {name, email, password, error, success} = values;
    const handleFieldChange = field => event => {
        setValues({...values, error: false, [field]: event.target.value})
    }
    const signup = (user) => {
        return fetch(`${API}/auth/signup`, {
            method: 'POST',
            headers: {
                Accept: 'application/json', "Content-Type": 'application/json'
            },
            body: JSON.stringify(user)
        }).then((res) => res.json())
            .catch(error => console.log(error))

    };
    const clickSubmit = (event) => {
        event.preventDefault();
        signup({name, email, password});
    };
    const SignUpForm = () => (<form>
        <div className="form-group">
            <label className="text-muted">Name</label>
            <input onChange={handleFieldChange('name')} type="text" className="form-control"/>
        </div>
        <div className="form-group">
            <label className="text-muted">Email</label>
            <input onChange={handleFieldChange('email')} type="email" className="form-control"/>
        </div>
        <div className="form-group">
            <label className="text-muted">Password</label>
            <input onChange={handleFieldChange('password')} type="password" className="form-control"/>
        </div>
        <div className="d-grid gap-2">
            <button onClick={clickSubmit} className="btn btn-primary btn-group">Submit</button>
        </div>
    </form>);
    return <div>
        <Layout title='Register' description=" Create an account for Node.js and react course"
                className='container-fluid col-md-8 offset-2'>
            {SignUpForm()}
            {JSON.stringify(values)}
        </Layout>
    </div>;
}

export default SignUp;