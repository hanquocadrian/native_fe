import { combineReducers } from 'redux';
import cartReducer from './cart';
import userReducer from './user';

const allReducers = combineReducers({
    cartReducer : cartReducer, 
    userReducer : userReducer
});

export default allReducers;