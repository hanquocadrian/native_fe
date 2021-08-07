import { SAVE_ITEM_CART_BOOKING, REMOVE_CART_BOOKING } from "ReduxConfig/ActionTypes"

const initialState = {
    arrItem: [],
    totalCost: 0
}

const cartBookingRoomReducer = (state = initialState, action) => {
    switch (action.type){
        case SAVE_ITEM_CART_BOOKING: {
            let result = state;
            let rt = action.payload;

            if(rt.slDat === 0){
                result.arrItem = result.arrItem.filter(item => item.idLP !== rt.idLP);
            } else {
                let index = result.arrItem.findIndex(item => item.idLP === rt.idLP);
                if(index === -1) {
                    result.arrItem.push(rt);
                } else {
                    result.arrItem[index] = rt;
                }
            }
            

            var total = 0;
            result.arrItem.map(item => total += (parseFloat(item.slDat) * parseFloat(item.giaLP)))
            result.totalCost = total;

            return result;
        }
        case REMOVE_CART_BOOKING: {
            return {
                arrItem: [],
                totalCost: 0,
            };
        }
        default: 
            return state;
    }
}

export default cartBookingRoomReducer;