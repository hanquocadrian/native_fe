import { combineReducers } from 'redux';
import adminAccountReducer from './adminAccount';
import cartReducer from './cart';
import customerAccountReducer from './customerAccount';


const allReducers = combineReducers({
    cartReducer: cartReducer, 
    customerAccountReducer,
    adminAccountReducer,
});

export default allReducers;