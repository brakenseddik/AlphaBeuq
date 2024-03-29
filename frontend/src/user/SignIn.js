import React, {useState} from "react";
import Layout from "../core/Layout";
import {authenticate, isAuthenticated, signIn} from "../auth";
import {Redirect} from "react-router-dom";

const SignIn = () => {
    const [values, setValues] = useState({
        email: 'dzmidou95@gmail.com',
        password: 'Msdos@1998..',
        error: '',
        loading: false,
        redirectToReference: false
    });

    const {email, password, error, loading, redirectToReference} = values;
    const {user} = isAuthenticated();


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
                    authenticate(data, () => {
                        setValues({
                                ...values,
                                loading: false,
                                redirectToReference: true
                            }
                        );
                    })
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


    const showLoading = () => {
        return loading && (<div className='alert alert-info'>
            <h2>Loading...</h2>
        </div>)
    }
    const redirectUser = () => {
        if (redirectToReference) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard"/>

            } else {
                return <Redirect to="/user/dashboard"/>
            }
        }

        if (isAuthenticated()) {
            return <Redirect to="/"/>

        }
    }

    return (
        <Layout
            title='Signup'
            description='Signup to Node React E-commerce App'
            className='container col-md-8 offset-mde-2'>
            {showLoading()}
            {showError()}
            {signInForm()}
            {redirectUser()}
        </Layout>
    );
}
export default SignIn;