import { combineReducers } from 'redux';
import adminAccountReducer from './adminAccount';
import cartReducer from './cart';
import chooseDatesReducer from './chooseDates';
import customerAccountReducer from './customerAccount';
import cartServiceReducer from './cartService';


const allReducers = combineReducers({
    cartReducer, 
    customerAccountReducer,
    adminAccountReducer,
    chooseDatesReducer,
    cartServiceReducer,
});

export default allReducers;