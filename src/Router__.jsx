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
import { ProtectedRoute } from './Auth/protected.route'; 
import AdLogin from './Components/Admin/Pages/Login/Login';
import AdHome from './Components/Admin/Pages/Home/Home';
import AdAbout from './Components/Admin/Pages/About/About';
import AdSlider from './Components/Admin/Pages/Slider/Slider';
import AdError from './Components/Admin/Pages/Error/Error';
import AdPageRoomType from './Components/Admin/Pages/RoomType/PageRoomType';
import AdPageRoomTypeAdd from 'Components/Admin/Pages/RoomType/Add/PageRoomTypeAdd';
import AdPageRoomTypeDetail from './Components/Admin/Pages/RoomType/Detail/PageRoomTypeDetail';
import AdPageRoomTypeUpd from './Components/Admin/Pages/RoomType/Update/PageRoomTypeUpd';
import AdPageRoomTypeImage from 'Components/Admin/Pages/RoomTypeImage/PageRoomTypeImage';
import AdPageRoomTypeImageAdd from 'Components/Admin/Pages/RoomTypeImage/Add/PageRoomTypeImageAdd';
import AdPageRoomTypeImageUpd from 'Components/Admin/Pages/RoomTypeImage/Update/PageRoomTypeImageUpd';
import AdPageService from 'Components/Admin/Pages/Service/PageService';
import AdServiceImage from './Components/Admin/Pages/ServiceImage/ServiceImage';

export default class Router extends Component {
    render() {
        return (
            <BRouter>
                <>
                    <Switch>
                        {/* Customer */}
                        <Route exact path='/' component={ Home } />
                        <Route exact path='/login/' component={ Login } />
                        <Route exact path='/about/' component={ About } />
                        <Route exact path='/service/' component={ Service } />
                        <Route exact path='/roomtype/:id' component={ Room } />

                        {/* Admin */}
                        <Route exact path='/admin/' component={ AdLogin } />
                        <ProtectedRoute exact path="/admin/home/" component={ AdHome } />
                        <ProtectedRoute exact path='/admin/about/' component={ AdAbout } />
                        <ProtectedRoute exact path='/admin/slider/' component={ AdSlider } />
                        <ProtectedRoute exact path='/admin/roomtype/' component={ AdPageRoomType } />
                        <ProtectedRoute exact path='/admin/roomtype-add/' component={ AdPageRoomTypeAdd } />
                        <ProtectedRoute exact path='/admin/roomtype-detail/:id' component={ AdPageRoomTypeDetail } />
                        <ProtectedRoute exact path='/admin/roomtype-upd/:id' component={ AdPageRoomTypeUpd } />

                        <ProtectedRoute exact path='/admin/roomtype-image/' component={ AdPageRoomTypeImage } />
                        <ProtectedRoute exact path='/admin/roomtype-image-detail/:id' component={ AdPageRoomTypeDetail } />
                        <ProtectedRoute exact path='/admin/roomtype-image-add/' component={ AdPageRoomTypeImageAdd } />
                        <ProtectedRoute exact path='/admin/roomtype-image-upd/:id' component={ AdPageRoomTypeImageUpd } />
                        
                        <ProtectedRoute exact path='/admin/service/' component={ AdPageService } />
                        <ProtectedRoute exact path='/admin/service-image/' component={ AdServiceImage } />


                        {/* Not Found */}
                        <Route path='*' component={ AdError } />   
                    </Switch>
                </>
            </BRouter>
        )
    }
}


