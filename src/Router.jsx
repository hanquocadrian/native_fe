import React, { Component } from 'react';
import { BrowserRouter as BRouter, Route, Switch } from 'react-router-dom';
import * as Components from "./router.import";

export default class Router extends Component {
    render() {
        return (
            <BRouter>
                <>
                    <Switch>
                        {/* Customer */}
                        <Route exact path='/' component={ Components.Home } />
                        <Route exact path='/login/' component={ Components.Login } />
                        <Route exact path='/forgot-password/' component={ Components.ForgotPassword } />
                         <Route exact path='/reset-password/:id' component={ Components.ResetPassword } />
                        <Route exact path='/about/' component={ Components.About } />
                        <Route exact path='/rates/' component={ Components.PageRates } />
                        <Route exact path='/service/' component={ Components.Service } />
                        <Route exact path='/roomtype/:id' component={ Components.Room } />
                        <Route exact path='/your-basket' component={ Components.Basket } />

                        {/* Customer Auth */}
                        <Components.ProtectedCusRoute exact path='/user/profile/:id' component={ Components.PageProfile } />

                        <Components.ProtectedCusRoute exact path='/user/your-booking' component={ Components.PageBooking } />
                        <Components.ProtectedCusRoute exact path='/user/your-booking-room' component={ Components.PageBookingRoomProfile } />
                        <Components.ProtectedCusRoute exact path='/user/your-booking-room-detail/:id' component={ Components.PageBookingRoomProfile_Detail } />
                        
                        <Components.ProtectedCusRoute exact path='/user/your-booking-service' component={ Components.PageBookingService } />
                        <Components.ProtectedCusRoute exact path='/user/your-booking-service-detail/:id' component={ Components.PageBookingServiceDetail } />

                        <Components.ProtectedCusRoute exact path='/user/bills' component={ Components.PageBill } />
                        <Components.ProtectedCusRoute exact path='/user/bill-details/:id' component={ Components.PageBillDetails } />

                        <Components.ProtectedCusRoute exact path='/user/room-rental-contract' component={ Components.PageRoomRentalContract } />


                        {/* Admin */}
                        <Route exact path='/admin/' component={ Components.AdLogin } />
                        <Components.ProtectedRoute exact path="/admin/home/" component={ Components.AdHome } />
                        <Components.ProtectedRoute exact path='/admin/about/' component={ Components.AdAbout } />
                        <Components.ProtectedRoute exact path='/admin/slider/' component={ Components.AdSlider } />

                        <Components.ProtectedRoute exact path='/admin/adminacc/' component={ Components.AdPageAdmin } />
                        <Components.ProtectedRoute exact path='/admin/adminacc-add/' component={ Components.AdPageAdminAdd } />
                        <Components.ProtectedRoute exact path='/admin/adminacc-update/:id' component={ Components.AdPageAdminUpd } />

                        <Components.ProtectedRoute exact path='/admin/roomtype/' component={ Components.AdPageRoomType } />
                        <Components.ProtectedRoute exact path='/admin/roomtype-detail/:id' component={ Components.AdPageRoomTypeDetail } />
                        <Components.ProtectedRoute exact path='/admin/roomtype-add/' component={ Components.AdPageRoomTypeAdd } />
                        <Components.ProtectedRoute exact path='/admin/roomtype-upd/:id' component={ Components.AdPageRoomTypeUpd } />

                        <Components.ProtectedRoute exact path='/admin/roomtype-image/' component={ Components.AdPageRoomTypeImage } />
                        <Components.ProtectedRoute exact path='/admin/roomtype-image-add/' component={ Components.AdPageRoomTypeImageAdd } />
                        <Components.ProtectedRoute exact path='/admin/roomtype-image-upd/:id' component={ Components.AdPageRoomTypeImageUpd } />

                        <Components.ProtectedRoute exact path='/admin/service/' component={ Components.AdService } />
                        <Components.ProtectedRoute exact path='/admin/service-add/' component={ Components.AdPageServiceAdd } />
                        <Components.ProtectedRoute exact path='/admin/service-detail/:id' component={ Components.AdPageServiceDetail } />
                        <Components.ProtectedRoute exact path='/admin/service-upd/:id' component={ Components.AdPageServiceUpd } />

                        <Components.ProtectedRoute exact path='/admin/service-image/' component={ Components.AdPageServiceImage } />
                        <Components.ProtectedRoute exact path='/admin/service-image-add/' component={ Components.AdPageServiceImageAdd } />
                        <Components.ProtectedRoute exact path='/admin/service-image-upd/:id' component={ Components.AdPageServiceImageUpd } />

                        <Components.ProtectedRoute exact path='/admin/daily-rate/' component={ Components.AdPageDailyRate } />
                        <Components.ProtectedRoute exact path='/admin/daily-rate-add/' component={ Components.AdPageDailyRateAdd } />
                        <Components.ProtectedRoute exact path='/admin/daily-rate-upd/:id' component={ Components.AdPageDailyRateUpd } />

                        <Components.ProtectedRoute exact path='/admin/special-rate/' component={ Components.AdPageSpecialRate } />
                        <Components.ProtectedRoute exact path='/admin/special-rate-add/' component={ Components.AdPageSpecialRateAdd } />
                        <Components.ProtectedRoute exact path='/admin/special-rate-upd/:id' component={ Components.AdPageSpecialRateUpd } />

                        <Components.ProtectedRoute exact path='/admin/room/' component={ Components.AdPageRoom } />
                        <Components.ProtectedRoute exact path='/admin/room-add/' component={ Components.AdPageRoomAdd } />
                        <Components.ProtectedRoute exact path='/admin/room-upd/:id' component={ Components.AdPageRoomUpd } />
                        
                        <Components.ProtectedRoute exact path='/admin/customer-stay/' component={ Components.AdPageCustomerStay } />
                        <Components.ProtectedRoute exact path='/admin/customer-stay-add/' component={ Components.AdPageCustomerStayAdd } />
                        <Components.ProtectedRoute exact path='/admin/customer-stay-upd/:id' component={ Components.AdPageCustomerStayUpd } />

                        <Components.ProtectedRoute exact path='/admin/booking-service/' component={ Components.AdPageBookingService } />
                        <Components.ProtectedRoute exact path='/admin/booking-service-add/' component={ Components.AdPageBookingServiceAdd } />
                        <Components.ProtectedRoute exact path='/admin/booking-service-detail/:id' component={ Components.AdPageBookingServiceDetail } />

                        <Components.ProtectedRoute exact path='/admin/booking/' component={ Components.AdPageBooking } />
                         <Components.ProtectedRoute exact path='/admin/booking-detail/:id' component={ Components.AdPageBookingDetail } />
                        
                        <Components.ProtectedRoute exact path='/admin/bill/' component={ Components.AdPageBill } />
                        <Components.ProtectedRoute exact path='/admin/bill-detail/:id' component={ Components.AdPageBillDetail } />
                        
                        <Components.ProtectedRoute exact path='/admin/rrc/' component={ Components.AdPageRRC } />
                        <Components.ProtectedRoute exact path='/admin/rrc-add/' component={ Components.AdPageRRCAdd } />
 
                        {/* 404 Not Found */}
                        <Route path='*' component={ Components.Error } />  
                    </Switch>
                </>
            </BRouter>
        )
    }
}


