import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import SignIn from './user/SignIn';
import SignUp from './user/SignUp';
import Home from './core/Home';
import AppMenu from './core/Menu';
import PrivateRoute from "./auth/privateRoute";
import UserDashboard from "./user/UserDashboard";
import AdminRoute from "./auth/adminRoute";
import AdminDashboard from "./user/AdminDashboard";


const AppRoutes = () => {
    return (<div>
        <BrowserRouter>
            <AppMenu/>
            <Switch>
                <Route path='/' exact component={Home}/>
                <Route path='/signin' exact component={SignIn}/>
                <Route path='/signup' exact component={SignUp}/>
                <PrivateRoute path='/user/dashboard' exact component={UserDashboard}/>
                <AdminRoute path='/admin/dashboard' exact component={AdminDashboard}/>
            </Switch>
        </BrowserRouter>
    </div>);

};
export default AppRoutes;

