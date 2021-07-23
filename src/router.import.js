// Customer
import { ProtectedCusRoute } from 'Auth/protectedCus.route';
import Home from './Components/Pages/Home/Home';
import Login from './Components/Pages/Login/Login';
import About from './Components/Pages/About/About';
import Service from './Components/Pages/HotelService/HotelService';
import Room from './Components/Pages/Room/Room';
import Basket from './Components/Pages/Basket/Basket';
import PageProfile from './Components/Pages/Profile/PageProfile';

import PageBooking from './Components/Pages/Booking/Booking';
import PageBookingRoomProfile from './Components/Pages/BookingRoomProfile/PageBookingRoomProfile';
import PageBookingRoomProfile_Detail from './Components/Pages/BookingRoomProfile/BookingRoomProfileDetail/PageBookingRoomProfile_Detail';

import PageBill from 'Components/Pages/Bill/PageBill';
import PageBillDetails from 'Components/Pages/Bill/BillDetails/PageBillDetails';

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
import AdPageCustomerStayAdd from 'Components/Admin/Pages/CustomerStay/Add/PageCustomerStayAdd';
import AdPageCustomerStayUpd from 'Components/Admin/Pages/CustomerStay/Update/PageCustomerStayUdp';

import AdPageBill from 'Components/Admin/Pages/Bill/PageBill';
import AdPageBillDetail from 'Components/Admin/Pages/Bill/BillDetail/PageBillDetail';

import AdPageRRC from 'Components/Admin/Pages/RoomRentalContract/PageRRC';
import AdPageRRCAdd from 'Components/Admin/Pages/RoomRentalContract/Add/PageRRCAdd';

// Error 404
import Error from './Components/Admin/Pages/Error/Error';

export { 
    ProtectedCusRoute, Home, Login, About, Service, Room, Basket, PageProfile, PageBill, PageBillDetails, PageBooking, PageBookingRoomProfile, PageBookingRoomProfile_Detail,
    ProtectedRoute, AdLogin, AdHome, AdAbout, AdSlider, AdPageAdmin, AdPageAdminAdd, AdPageAdminUpd, AdPageRoomType, AdPageRoomTypeDetail, AdPageRoomTypeAdd, AdPageRoomTypeUpd, AdPageRoomTypeImage, AdPageRoomTypeImageAdd, AdPageRoomTypeImageUpd, AdService, AdPageServiceAdd, AdPageServiceDetail, AdPageServiceUpd, AdPageServiceImage, AdPageServiceImageAdd, AdPageServiceImageUpd, AdPageDailyRate, AdPageDailyRateAdd, AdPageDailyRateUpd, AdPageSpecialRate, AdPageSpecialRateAdd, AdPageSpecialRateUpd, AdPageRoom, AdPageRoomAdd, AdPageRoomUpd, AdPageCustomerStay, AdPageCustomerStayAdd , AdPageCustomerStayUpd, AdPageBill, AdPageBillDetail, AdPageRRC, AdPageRRCAdd,
    Error,
};