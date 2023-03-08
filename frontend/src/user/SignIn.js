import React, {useState} from "react";
import Layout from "../core/Layout";
import {signIn} from "../auth";

const SignIn = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        redirectToReference: false
    });

    const {email, password, error, loading, redirectToReference} = values;

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value})
    }


    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error: false, loading: true});
        signIn({email, password})
            .then(data => {
                console.log(data);
                if (data.error) {
                    setValues({
                        ...values,
                        error: data.error,
                        loading: false
                    });
                } else {
                    setValues({
                        ...values,
                        email: '',
                        password: '',
                        error: '',
                        loading: false
                    });
                }
            });
    }

    const signInForm = () => {
        return (
            <form>
                <div className='form-group'>
                    <label
                        className='text-muted'>E-mail
                    </label>
                    <input
                        type='email'
                        className='form-control'
                        onChange={handleChange('email')}
                        value={email}>
                    </input>
                </div>
                <div className='form-group'>
                    <label
                        className='text-muted'>Password
                    </label>
                    <input
                        type='password'
                        className='form-control'
                        onChange={handleChange('password')}
                        value={password}>
                    </input>
                </div>
                <button
                    onClick={clickSubmit}
                    className='btn btn-primary'>Submit
                </button>
            </form>
        );
    }

    const showError = () => {
        return (
            <div
                className='alert alert-danger'
                style={{display: error ? '' : 'none'}}>
                {error}
            </div>
        );
    }

    const showSuccess = () => {
        return (
            <div
                className='alert alert-success'
                style={{display: success ? '' : 'none'}}>
                Logged in successfully.
            </div>
        );
    }

    return (
        <Layout
            title='Signup'
            description='Signup to Node React E-commerce App'
            className='container col-md-8 offset-mde-2'>
            {showSuccess()}
            {showError()}
            {signInForm()}
        </Layout>
    );
}
export default SignUp;