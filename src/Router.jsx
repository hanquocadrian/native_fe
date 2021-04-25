import React, { Component } from 'react';
import {
    BrowserRouter as BRouter,
    Route,
    Switch
} from 'react-router-dom';
// Customer
import Home from './Components/Home/Home';
import About from './Components/About/About';

// Admin
import AdLogin from './Admin/Components/Login/Login';
import AdHome from './Admin/Components/Home/Home';
import AdAbout from './Admin/Components/About/About';
import { ProtectedRoute } from './Admin/protected.route';

export default class Router extends Component {
    render() {
        return (
            <BRouter>
                <>
                    <Switch>
                        {/* Customer */}
                        <Route exact path='/' component={ Home } />
                        <Route exact path='/about' component={ About } />

                        {/* Admin */}
                        <Route exact path='/admin/' component={ AdLogin } />
                        <ProtectedRoute exact path="/admin/home/" component={ AdHome } />
                        <ProtectedRoute exact path='/admin/about/' component={ AdAbout } />

                        {/* Not Found */}
                        <Route path='*' component={ ()=>'404' } />   
                    </Switch>
                </>
            </BRouter>
        )
    }
}


