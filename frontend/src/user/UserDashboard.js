import React from "react";
import Layout from "../core/Layout";
import {isAuthenticated} from "../auth";
import {Link} from "react-router-dom";

const UserDashboard = () => {
    const {user} = isAuthenticated();
    const userLinks = () => {
        return (
            <div className='card mb-5'>
                <h3 className='card-header'>User Links</h3>
                <ul className='list-group'>
                    <li className='list-group-item'><Link to='/cart'>My cart</Link></li>
                    <li className='list-group-item'><Link to='/profile/update'>Update profile</Link></li>

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
                    <li className='list-group-item'>{user.role === 1 ? 'Admin' : 'User'}</li>
                </ul>
            </div>
        );
    }

    const userHistory = () => {
        return (

            <div className='card mb-5'>
                <h3 className='card-header'>Purchase history</h3>
                <ul className='list-group'>
                    <li className='list-group-item'>history</li>
                </ul>
            </div>
        );
    }
    return (<Layout title='Dashboard' description='User dashboard' className='container'>
        <div className='row'>
            <div className='col-3'>
                {userLinks()}
            </div>
            <div className='col-9'>
                {userInfos()}
                {userHistory()}
            </div>
        </div>

    </Layout>);
}


export default UserDashboard;