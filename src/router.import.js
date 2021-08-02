// Customer
import { ProtectedCusRoute } from 'Auth/protectedCus.route';
import Home from './Components/Pages/Home/Home';
import Login from './Components/Pages/Login/Login';
import ForgotPassword from './Components/Pages/ForgotPassword/ForgotPassword';
import ResetPassword from './Components/Pages/ResetPassword/ResetPassword';
import About from './Components/Pages/About/About';
import PageRates from 'Components/Pages/PageRates/PageRates';
import Service from './Components/Pages/HotelService/HotelService';
import Room from './Components/Pages/Room/Room';
import Basket from './Components/Pages/Basket/Basket';
import PageProfile from './Components/Pages/Profile/PageProfile';

import PageBooking from './Components/Pages/Booking/Booking';
import PageBookingRoomProfile from './Components/Pages/BookingRoomProfile/PageBookingRoomProfile';
import PageBookingRoomProfile_Detail from './Components/Pages/BookingRoomProfile/BookingRoomProfileDetail/PageBookingRoomProfile_Detail';

import PageBookingService from './Components/Pages/BookingServiceProfile/PageBookingService';
import PageBookingServiceDetail from './Components/Pages/BookingServiceProfile/Detail/PageBookingServiceDetail';

import PageBill from 'Components/Pages/Bill/PageBill';
import PageBillDetails from 'Components/Pages/Bill/BillDetails/PageBillDetails';

import PageRoomRentalContract from 'Components/Pages/RoomRentalContract/PageRoomRentalContract';

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

import AdPageCustomerBooking from 'Components/Admin/Pages/CustomerBooking/PageCustomerBooking';

import AdPageCustomerStay from 'Components/Admin/Pages/CustomerStay/PageCustomerStay';
import AdPageCustomerStayAdd from 'Components/Admin/Pages/CustomerStay/Add/PageCustomerStayAdd';
import AdPageCustomerStayUpd from 'Components/Admin/Pages/CustomerStay/Update/PageCustomerStayUdp';

import AdPageBookingService from 'Components/Admin/Pages/BookingService/PageBookingService';
import AdPageBookingServiceAdd from 'Components/Admin/Pages/BookingService/Add/PageBookingServiceAdd';
import AdPageBookingServiceDetail from 'Components/Admin/Pages/BookingService/Detail/PageBookingServiceDetail';

import AdPageBooking from 'Components/Admin/Pages/Booking/PageBooking';
import AdPageBookingDetail from 'Components/Admin/Pages/Booking/Detail/PageBookingDetail';

import AdPageBill from 'Components/Admin/Pages/Bill/PageBill';
import AdPageBillDetail from 'Components/Admin/Pages/Bill/BillDetail/PageBillDetail';

import AdPageRRC from 'Components/Admin/Pages/RoomRentalContract/PageRRC';
import AdPageRRCAdd from 'Components/Admin/Pages/RoomRentalContract/Add/PageRRCAdd';

import AdPageSurchargePrice from 'Components/Admin/Pages/SurchargePrice/PageSurchargePrice';
import AdPageSurchargePriceAdd from 'Components/Admin/Pages/SurchargePrice/Add/PageSurchargePriceAdd';
import AdPageSurchargePriceUpd from 'Components/Admin/Pages/SurchargePrice/Update/PageSurchargePriceUpdate';

import AdPageSurcharge from 'Components/Admin/Pages/Surcharge/PageSurcharge';
// Error 404
import Error from './Components/Admin/Pages/Error/Error';

export { 
    ProtectedCusRoute, Home, Login, About, PageRates, Service, Room, Basket, PageProfile, PageBill, PageBillDetails, PageBooking, PageBookingRoomProfile, PageBookingRoomProfile_Detail, PageBookingService, PageBookingServiceDetail, PageRoomRentalContract, ForgotPassword, ResetPassword,
    ProtectedRoute, AdLogin, AdHome, AdAbout, AdSlider, AdPageAdmin, AdPageAdminAdd, AdPageAdminUpd, AdPageRoomType, AdPageRoomTypeDetail, AdPageRoomTypeAdd, AdPageRoomTypeUpd, AdPageRoomTypeImage, AdPageRoomTypeImageAdd, AdPageRoomTypeImageUpd, AdService, AdPageServiceAdd, AdPageServiceDetail, AdPageServiceUpd, AdPageServiceImage, AdPageServiceImageAdd, AdPageServiceImageUpd, AdPageDailyRate, AdPageDailyRateAdd, AdPageDailyRateUpd, AdPageSpecialRate, AdPageSpecialRateAdd, AdPageSpecialRateUpd, AdPageRoom, AdPageRoomAdd, AdPageRoomUpd, AdPageCustomerStay, AdPageCustomerStayAdd , AdPageCustomerStayUpd, AdPageBill, AdPageBillDetail, AdPageRRC, AdPageRRCAdd, AdPageBooking, AdPageBookingDetail, AdPageBookingService, AdPageBookingServiceAdd, AdPageBookingServiceDetail, AdPageSurchargePrice, AdPageSurchargePriceAdd, AdPageSurchargePriceUpd, AdPageCustomerBooking, AdPageSurcharge,
    Error,
};