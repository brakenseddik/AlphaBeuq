import React, {Component} from 'react';
import {Redirect, Route} from 'react-router-dom';
import {isAuthenticated} from './index';

const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={(props) => {
                if (isAuthenticated()) {
                    return (
                        <Component {...props}/>
                    )
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: '/signin',
                                state: {from: props.location}
                            }}/>
                    )
                }
            }}>

        </Route>
    );
}

export default PrivateRoute;