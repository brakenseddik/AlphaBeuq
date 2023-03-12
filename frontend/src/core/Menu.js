import React, {Fragment} from "react";
import {Link, withRouter} from "react-router-dom";
import {isAuthenticated, signOut} from "../auth";

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return {color: '#ff9900'};
    } else {
        return {color: '#ffffff'}
    }
};

const AppMenu = ({history}) => {
    return (

        <div>
            <ul className='nav nav-tabs bg-primary'>
                <li className='nav-item'>
                    <Link
                        className='nav-link'
                        style={isActive(history, '/')}
                        to='/'>Home
                    </Link>
                </li>

                {!isAuthenticated() && (
                    <Fragment>
                        <li className='nav-item'>
                            <Link
                                className='nav-link'
                                style={isActive(history, '/signin')}
                                to='/signin'>Login
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link
                                className='nav-link'
                                style={isActive(history, '/signup')}
                                to='/signup'>Register
                            </Link>
                        </li>
                    </Fragment>
                )}
                {isAuthenticated() && (
                    <Fragment>
                        <li className='nav-item'>
                            <Link
                                className='nav-link'
                                style={isActive(history, '/user/dashboard')}
                                to='/user/dashboard'>Dashboard
                            </Link>
                        </li>
                        <li>
                        <span
                            className='nav-link'
                            style={{cursor: 'pointer', color: '#ffffff'}}
                            onClick={() => signOut(() => {
                                history.push('/');
                            })}>Logout
                        </span>
                        </li>
                    </Fragment>
                )}

            </ul>
        </div>)
};


export default withRouter(AppMenu);