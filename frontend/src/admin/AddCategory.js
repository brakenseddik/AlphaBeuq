import React, {useState} from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import {createCategory} from "./apiAdmin";
import {Link} from "react-router-dom";

const AddCategory = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [showResultMsg, setShowResultMsg] = useState(false);

    const {user, token} = isAuthenticated();

    const handleChange = (e) => {
        setError('');
        setName(e.target.value);
    }

    const clickSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);
        // setShowResultMsg(false);
        //
        createCategory(user._id, token, {name})
            .then((data) => {
                setShowResultMsg(true);

                if (data.error) {

                    setError(data.error);
                } else {
                    setError('');
                    setSuccess(true);
                }
            });
    }

    const newCategoryForm = () => {
        return (
            <form onSubmit={clickSubmit}>
                <div className='form-group'>
                    <label className='text-muted'>
                        Name
                    </label>
                    <input
                        type='text'
                        className='form-control'
                        onChange={handleChange}
                        value={name}
                        required
                        autoFocus>
                    </input>
                </div>
                <button className='btn btn-outline-primary'>
                    Create Category
                </button>
            </form>
        );
    }


    const showError = () => {
        if (error) {
            return <h3 className="text-danger">{error}</h3>
        }
    }
    const showSuccess = () => {
        if (success) {
            return <h3 className="text-success">Category {name} successfully created!</h3>
        }
    }
    const showResult = () => {
        let msgClass = 'text-' + (error ? 'danger' : 'success');
        let result = (error ? 'Category name already in use!' : `Category ${name} successfully created!`);

        setTimeout(() => {
            setShowResultMsg(false);
        }, 3000);

        return (
            <h3 className={msgClass}>
                {result}
            </h3>
        );
    }

    const goBack = () => {
        return (
            <div className='mt-5'>
                <Link
                    to='/admin/dashboard'
                    className='text-warning'>
                    Back to dashboard
                </Link>
            </div>
        );
    }

    return (
        <Layout
            title='Add a new category'
            description={`Hello, ${user.name}! Ready to add a new category?`}>
            <div className='row'>
                <div className='col-md-8 offset-md-2'>
                    {/*{showResultMsg ? showResult() : ''}*/}
                    {newCategoryForm()}
                    {showError()}
                    {showSuccess()}
                    {goBack()}
                </div>
            </div>
        </Layout>
    );
}

export default AddCategory;