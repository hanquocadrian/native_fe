import { combineReducers } from 'redux';
import adminAccountReducer from './adminAccount';
import cartReducer from './cart';
import chooseDatesReducer from './chooseDates';
import customerAccountReducer from './customerAccount';
import cartServiceReducer from './cartService';
import cartBookingRoomReducer from './cartBookingRoom';
import chooseDatesBookingRoomReducer from './chooseDatesBookingRoom';


const allReducers = combineReducers({
    cartReducer, 
    customerAccountReducer,
    adminAccountReducer,
    chooseDatesReducer,
    cartServiceReducer,
    cartBookingRoomReducer,
    chooseDatesBookingRoomReducer,
});

export default allReducers;