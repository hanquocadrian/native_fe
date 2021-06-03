import React, { Component } from 'react';
import {
    BrowserRouter as BRouter,
    Route,
    Switch
} from 'react-router-dom';
// Customer
import Home from './Components/Pages/Home/Home';
import Login from './Components/Pages/Login/Login';
import About from './Components/Pages/About/About';
import Service from './Components/Pages/HotelService/HotelService';
import Room from './Components/Pages/Room/Room';

// Admin
import AdLogin from './Components/Admin/Pages/Login/Login';
import AdHome from './Components/Admin/Pages/Home/Home';
import AdAbout from './Components/Admin/Pages/About/About';
import AdSlider from './Components/Admin/Pages/Slider/Slider'
import AdRoomType from './Components/Admin/Pages/RoomType/RoomType';
import AdRoomTypeDetail from './Components/Admin/Pages/RoomType/Detail/PageRoomTypeDetail';
import AdRoomTypeAdd from 'Components/Admin/Pages/RoomType/Add/PageRoomTypeAdd';
import AdError from './Components/Admin/Pages/Error/Error';
import AdService from './Components/Admin/Pages/Service/Service';
import AdServiceImage from './Components/Admin/Pages/ServiceImage/ServiceImage';
import { ProtectedRoute } from './Auth/protected.route'; 

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
                        <Route exact path='/service' component={ Service } />
                        <Route exact path='/roomtype/:id' component={ Room } />

                        {/* Admin */}
                        <Route exact path='/admin/' component={ AdLogin } />
                        <ProtectedRoute exact path="/admin/home/" component={ AdHome } />
                        <ProtectedRoute exact path='/admin/about/' component={ AdAbout } />
                        <ProtectedRoute exact path='/admin/slider/' component={ AdSlider } />
                        <Route exact path='/admin/roomtype/' component={ AdRoomType } />
                        <Route exact path='/admin/roomtype-detail/:id' component={ AdRoomTypeDetail } />
                        <Route exact path='/admin/roomtype-add' component={ AdRoomTypeAdd } />
                        <Route exact path='/admin/service/' component={ AdService } />
                        <Route exact path='/admin/image-service/' component={ AdServiceImage } />
                        
                        {/* Not Found */}
                        <Route path='*' component={ AdError } />   
                    </Switch>
                </>
            </BRouter>
        )
    }
}


