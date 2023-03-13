import React from "react";
import Layout from "../core/Layout";
import {isAuthenticated} from "../auth";
import {Link} from "react-router-dom";

const AdminDashboard = () => {
    const {user} = isAuthenticated();
    const adminLinks = () => {
        return (
            <div className='card mb-5'>
                <h3 className='card-header'>Admin Links</h3>
                <ul className='list-group'>
                    <li className='list-group-item'><Link to='/categories/create'>Create category</Link></li>
                    <li className='list-group-item'><Link to='/products/create'>Create product </Link></li>
                </ul>
            </div>
        );
    }
    const userInfos = () => {
        return (
            <div className='card mb-5'>
                <h3 className='card-header'>User information</h3>
                <ul className='list-group'>
                    <li className='list-group-item'>{user.name}</li>
                    <li className='list-group-item'>{user.email}</li>
                </ul>
            </div>
        );
    }


    return (<Layout title='Dashboard' description='Admin dashboard' className='container'>
        <div className='row'>
            <div className='col-3'>
                {adminLinks()}
            </div>
            <div className='col-9'>
                {userInfos()}
            </div>
        </div>

    </Layout>);
}


export default AdminDashboard;