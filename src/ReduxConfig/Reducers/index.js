import { combineReducers } from 'redux';
import adminAccountReducer from './adminAccount';
import cartReducer from './cart';
import chooseDatesReducer from './chooseDates';
import customerAccountReducer from './customerAccount';


const allReducers = combineReducers({
    cartReducer, 
    customerAccountReducer,
    adminAccountReducer,
    chooseDatesReducer,
});

export default allReducers;