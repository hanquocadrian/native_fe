import React, { Component } from 'react';
import {
    BrowserRouter as BRouter,
    Route,
    Switch
} from 'react-router-dom';
// Customer
import { ProtectedCusRoute } from 'Auth/protectedCus.route';
import Home from './Components/Pages/Home/Home';
import Login from './Components/Pages/Login/Login';
import About from './Components/Pages/About/About';
import Service from './Components/Pages/HotelService/HotelService';
import Room from './Components/Pages/Room/Room';
import Basket from './Components/Pages/Basket/Basket';
import PageProfile from './Components/Pages/Profile/PageProfile';

// Admin
import { ProtectedRoute } from './Auth/protected.route'; 
import AdLogin from './Components/Admin/Pages/Login/Login';
import AdHome from './Components/Admin/Pages/Home/Home';
import AdAbout from './Components/Admin/Pages/About/About';
import AdSlider from './Components/Admin/Pages/Slider/Slider';

import AdPageAdmin from './Components/Admin/Pages/AdminAccount/PageAdmin';
import AdPageAdminAdd from './Components/Admin/Pages/AdminAccount/Add/PageAdminAdd';
import AdPageAdminUpd from './Components/Admin/Pages/AdminAccount/Update/PageAdminUpd';

import AdPageRoomType from './Components/Admin/Pages/RoomType/PageRoomType';
import AdPageRoomTypeDetail from './Components/Admin/Pages/RoomType/Detail/PageRoomTypeDetail';
import AdPageRoomTypeAdd from 'Components/Admin/Pages/RoomType/Add/PageRoomTypeAdd';
import AdPageRoomTypeUpd from './Components/Admin/Pages/RoomType/Update/PageRoomTypeUpd';

import AdPageRoomTypeImage from 'Components/Admin/Pages/RoomTypeImage/PageRoomTypeImage';
import AdPageRoomTypeImageAdd from 'Components/Admin/Pages/RoomTypeImage/Add/PageRoomTypeImageAdd';
import AdPageRoomTypeImageUpd from 'Components/Admin/Pages/RoomTypeImage/Update/PageRoomTypeImageUpd';

import AdService from './Components/Admin/Pages/Service/PageService';
import AdPageServiceAdd from 'Components/Admin/Pages/Service/Add/PageServiceAdd';
import AdPageServiceDetail from 'Components/Admin/Pages/Service/Detail/PageServiceDetail';
import AdPageServiceUpd from 'Components/Admin/Pages/Service/Update/PageServiceUpd';

import AdPageServiceImage from './Components/Admin/Pages/ServiceImage/PageServiceImage';
import AdPageServiceImageAdd from './Components/Admin/Pages/ServiceImage/Add/PageServiceImageAdd';
import AdPageServiceImageUpd from './Components/Admin/Pages/ServiceImage/Update/PageServiceImageUpd';

import AdPageDailyRate from 'Components/Admin/Pages/DailyRate/PageDailyRate';
import AdPageDailyRateAdd from 'Components/Admin/Pages/DailyRate/Add/PageDailyRateAdd';
import AdPageDailyRateUpd from 'Components/Admin/Pages/DailyRate/Update/PageDailyRateUpd';

import AdPageSpecialRate from 'Components/Admin/Pages/SpecialRate/PageSpecialRate';
import AdPageSpecialRateAdd from 'Components/Admin/Pages/SpecialRate/Add/PageSpecialRateAdd';
import AdPageSpecialRateUpd from 'Components/Admin/Pages/SpecialRate/Update/PageSpecialRateUpd';

import AdPageRoom from 'Components/Admin/Pages/Room/PageRoom';
import AdPageRoomAdd from 'Components/Admin/Pages/Room/Add/PageRoomAdd';
import AdPageRoomUpd from 'Components/Admin/Pages/Room/Update/PageRoomUpd';

import AdPageCustomerStay from 'Components/Admin/Pages/CustomerStay/PageCustomerStay';
import AdPageCustomerStayAdd from 'Components/Admin/Pages/CustomerStay/CustomerStayAdd/PageCustomerStayAdd';

// Error 404
import Error from './Components/Admin/Pages/Error/Error';

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
                        <Route exact path='/your-basket' component={ Basket } />

                        {/* Customer Auth */}
                        <ProtectedCusRoute exact path='/profile/:id' component={ PageProfile } />


                        {/* Admin */}
                        <Route exact path='/admin/' component={ AdLogin } />
                        <ProtectedRoute exact path="/admin/home/" component={ AdHome } />
                        <ProtectedRoute exact path='/admin/about/' component={ AdAbout } />
                        <ProtectedRoute exact path='/admin/slider/' component={ AdSlider } />

                        <ProtectedRoute exact path='/admin/adminacc/' component={ AdPageAdmin } />
                        <ProtectedRoute exact path='/admin/adminacc-add/' component={ AdPageAdminAdd } />
                        <ProtectedRoute exact path='/admin/adminacc-update/:id' component={ AdPageAdminUpd } />

                        <ProtectedRoute exact path='/admin/roomtype/' component={ AdPageRoomType } />
                        <ProtectedRoute exact path='/admin/roomtype-detail/:id' component={ AdPageRoomTypeDetail } />
                        <ProtectedRoute exact path='/admin/roomtype-add/' component={ AdPageRoomTypeAdd } />
                        <ProtectedRoute exact path='/admin/roomtype-upd/:id' component={ AdPageRoomTypeUpd } />

                        <ProtectedRoute exact path='/admin/roomtype-image/' component={ AdPageRoomTypeImage } />
                        <ProtectedRoute exact path='/admin/roomtype-image-add/' component={ AdPageRoomTypeImageAdd } />
                        <ProtectedRoute exact path='/admin/roomtype-image-upd/:id' component={ AdPageRoomTypeImageUpd } />

                        <ProtectedRoute exact path='/admin/service/' component={ AdService } />
                        <ProtectedRoute exact path='/admin/service-add/' component={ AdPageServiceAdd } />
                        <ProtectedRoute exact path='/admin/service-detail/:id' component={ AdPageServiceDetail } />
                        <ProtectedRoute exact path='/admin/service-upd/:id' component={ AdPageServiceUpd } />

                        <ProtectedRoute exact path='/admin/service-image/' component={ AdPageServiceImage } />
                        <ProtectedRoute exact path='/admin/service-image-add/' component={ AdPageServiceImageAdd } />
                        <ProtectedRoute exact path='/admin/service-image-upd/:id' component={ AdPageServiceImageUpd } />

                        <ProtectedRoute exact path='/admin/daily-rate/' component={ AdPageDailyRate } />
                        <ProtectedRoute exact path='/admin/daily-rate-add/' component={ AdPageDailyRateAdd } />
                        <ProtectedRoute exact path='/admin/daily-rate-upd/:id' component={ AdPageDailyRateUpd } />

                        <ProtectedRoute exact path='/admin/special-rate/' component={ AdPageSpecialRate } />
                        <ProtectedRoute exact path='/admin/special-rate-add/' component={ AdPageSpecialRateAdd } />
                        <ProtectedRoute exact path='/admin/special-rate-upd/:id' component={ AdPageSpecialRateUpd } />

                        <ProtectedRoute exact path='/admin/room/' component={ AdPageRoom } />
                        <ProtectedRoute exact path='/admin/room-add/' component={ AdPageRoomAdd } />
                        <ProtectedRoute exact path='/admin/room-upd/:id' component={ AdPageRoomUpd } />
                        
                        <ProtectedRoute exact path='/admin/customer-stay/' component={ AdPageCustomerStay } />
                        <ProtectedRoute exact path='/admin/customer-stay-add/' component={ AdPageCustomerStayAdd } />
                        <ProtectedRoute exact path='/admin/customer-stay-upd/:id' component={ AdPageRoomUpd } />

                        {/* 404 Not Found */}
                        <Route path='*' component={ Error } />   
                    </Switch>
                </>
            </BRouter>
        )
    }
}


