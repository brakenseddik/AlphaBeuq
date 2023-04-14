import React, {useEffect, useState} from 'react';
import Layout from "../core/Layout";
import {isAuthenticated} from "../auth";
import {createProduct, getCategories} from "./apiAdmin";

const AddProduct = () => {
    const {user, token} = isAuthenticated();
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        shipping: '',
        quantity: '',
        image: '',
        loading: false,
        error: '',
        createdProduct: '',
        formData: '',
        redirectToProfile: false,
    });
    const {
        name,
        description,
        price,
        categories,
        category,
        shipping,
        quantity,
        image,
        loading,
        error,
        createdProduct,
        formData,
        redirectToProfile
    } = values;

    const init = () => {

        getCategories()
            .then(data => {
                if (data.error) {
                    setValues({...values, error: data.error});
                } else {
                    setValues({...values, categories: data, formData: new FormData()});
                }
            });

    }

    useEffect(() => {
        init();
    }, []);
    const handleChange = field => event => {
        const value = field === 'image' ? event.target.files[0] : event.target.value;
        formData.set(field, value);
        setValues({...values, [field]: value});
    }


    const submitForm = event => {
        event.preventDefault();
        setValues({error: '', loading: true});
        createProduct(user._id, token, formData)
            .then(data => {
                if (data.error) {
                    setValues({...values, error: data.error});
                } else {
                    setValues({
                        ...values,
                        name: '',
                        description: '',
                        price: '',
                        shipping: '',
                        loading: false,
                        image: '',
                        quantity: '',
                        createdProduct: data.name
                    })
                }
            })
    }

    const productForm = () => {
        return <form className='mb-3' onSubmit={submitForm}>
            <h4>Post photo</h4>
            <div className='form-group'>
                <label className='btn btn-outline-info'>
                    <input type='file' name='image' accept='image/*' onChange={handleChange('image')}/>
                </label>
            </div>
            <div className='form-group'>
                <label className='text-muted'>Title</label>
                <input type='text' value={name} onChange={handleChange('name')} className='form-control'/>
            </div>
            <div className='form-group'>
                <label className='text-muted'>Description</label>
                <textarea value={description} onChange={handleChange('description')} className='form-control'>

                </textarea>
            </div>
            <div className='form-group'>
                <label className='text-muted'>Price</label>
                <input type='number' value={price} onChange={handleChange('price')} className='form-control'/>
            </div>
            <div className='form-group'>
                <label className='text-muted'>Category</label>
                <select
                    value={category}
                    onChange={handleChange('category')}
                    className='form-control'>
                    <option value=''>Select category</option>
                    {categories && categories.map((cat, index) => (
                        <option value={cat._id} key={index}>{cat.name}</option>
                    ))}

                </select>
            </div>
            <div className='form-group'>
                <label className='text-muted'>
                    Quantity
                </label>
                <input
                    type='number'
                    className='form-control'
                    onChange={handleChange('quantity')}
                    value={quantity}>
                </input>
            </div>
            <div className='form-group'>
                <label className='text-muted'>Shipping</label>
                <select
                    value={shipping}
                    onChange={handleChange('shipping')}
                    className='form-control'>
                    <option value=''>Select shipping option</option>
                    <option value='0'>No</option>
                    <option value='1'>Yes</option>
                </select>
            </div>
            <button className='btn btn-outline-primary'>
                Create
            </button>
        </form>
    }

    const showError = () => {
        return <div className='alert alert-danger' style={{display: error ? '' : 'none'}}>
            {error}
        </div>

    }
    const showSuccess = () => {
        return <div className='alert alert-success' style={{display: createdProduct ? '' : 'none'}}>
            <h2>{createdProduct} is created successfully</h2>
        </div>
    }
    const showLoading = () => {
        if (loading) {
            return (
                <div className='alert alert-info'>
                    <h2>
                        Loading...
                    </h2>
                </div>
            );
        }
    }
    return (
        <Layout
            title='Add a new product'
            description={`Hello, ${user.name}! Ready to add a new product?`}>
            <div className='row'>
                <div className='col-md-8 offset-md-2'>
                    {showError()}
                    {showSuccess()}
                    {showLoading()}
                    {productForm()}

                </div>
            </div>
        </Layout>
    );
}

export default AddProduct;