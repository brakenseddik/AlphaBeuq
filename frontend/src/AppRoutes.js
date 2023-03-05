import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import SignIn from './user/SignIn';
import SignUp from './user/SignUp';
import Home from './core/Home';
import AppMenu from './core/Menu';


const AppRoutes = () => {
    return (<div>
        <BrowserRouter>
            <AppMenu/>
            <Switch>
                <Route path='/' exact component={Home}/>
                <Route path='/signin' exact component={SignIn}/>
                <Route path='/signup' exact component={SignUp}/>
            </Switch>
        </BrowserRouter>
    </div>);

};
export default AppRoutes;

