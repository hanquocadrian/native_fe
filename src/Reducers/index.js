import cartReducer from './cart';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    cartReducer : cartReducer 
});

export default allReducers;