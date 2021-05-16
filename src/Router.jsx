import React, { Component } from 'react';
import {
    BrowserRouter as BRouter,
    Route,
    Switch
} from 'react-router-dom';
// Customer
import Home from './Components/Home/_Home';
import Login from './Components/Login/Login';
import About from './Components/About/About';

// Admin
import AdLogin from './Admin/Components/Login/Login';
import AdHome from './Admin/Components/Home/Home';
import AdAbout from './Admin/Components/About/About';
import AdSlider from './Admin/Components/Slider/Slider'
import { ProtectedRoute } from './Admin/protected.route'; 

export default class Router extends Component {
    render() {
        return (
            <BRouter>
                <>
                    <Switch>
                        {/* Customer */}
                        <Route exact path='/' component={ Home } />
                        <Route exact path='/login' component={ Login } />
                        <Route exact path='/about' component={ About } />

                        {/* Admin */}
                        <Route exact path='/admin/' component={ AdLogin } />
                        <ProtectedRoute exact path="/admin/home/" component={ AdHome } />
                        <ProtectedRoute exact path='/admin/about/' component={ AdAbout } />
                        <ProtectedRoute exact path='/admin/slider/' component={ AdSlider } />

                        {/* Not Found */}
                        <Route path='*' component={ ()=>'404' } />   
                    </Switch>
                </>
            </BRouter>
        )
    }
}


