import { ADD_CART, DEL_CART, REMOVE_CART } from "ReduxConfig/ActionTypes";

const initialState = {
    sl: localStorage.getItem('slItemsShoppingCart') ? JSON.parse(localStorage.getItem('slItemsShoppingCart')).sl : 0
}

const cartReducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_CART: {
            let slItemAddCart = {
                sl: action.payload
            }
            localStorage.setItem('slItemsShoppingCart', JSON.stringify(slItemAddCart));
            return slItemAddCart;
        }
        case DEL_CART: {
            // var getIndex = state.items.map(function(item) { return item.idLP; }).indexOf(action.idLP);
            // return {
            //     items: state.items.splice(getIndex, 1),
            //     count: state.count - 1
            // };
            let slItemDelCart = {
                sl: state.sl - action.payload
            }
            if(slItemDelCart.sl === 0)   
                localStorage.removeItem('slItemsShoppingCart');
            localStorage.setItem('slItemsShoppingCart', JSON.stringify(slItemDelCart));
            return slItemDelCart;            
        }
        case REMOVE_CART: {
            let slItemCart = {
                sl: 0
            }
            localStorage.setItem('slItemsShoppingCart', JSON.stringify(slItemCart));
            return slItemCart;
        }
        default: 
            return state;
    }
} 

export default cartReducer;