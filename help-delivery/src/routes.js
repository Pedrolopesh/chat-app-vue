import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Preview from './pages/Preview';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={ Preview }/>
                <Route path="/Login" component={ Login }/>
                <Route path="/Signup" component={ Signup }/>
                <Route path="/Dashboard" component={ Dashboard }/>
            </Switch>
        </BrowserRouter>
    )
}