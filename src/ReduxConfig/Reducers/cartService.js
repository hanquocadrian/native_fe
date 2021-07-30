import { SAVE_ITEM_CART_SERVICE, REMOVE_CART_SERVICE } from "ReduxConfig/ActionTypes"

const initialState = {
    arrItem: [],
    totalCost: 0,
}

const cartServiceReducer = (state = initialState, action) => {
    switch (action.type){
        case SAVE_ITEM_CART_SERVICE: {
            let result = state;
            let dv = action.payload;

            if(dv.soLuong === 0){
                result.arrItem = result.arrItem.filter(item => item.idDV !== dv.idDV);
            } else {
                let index = result.arrItem.findIndex(item => item.idDV === dv.idDV);
                if(index === -1) {
                    result.arrItem.push(dv);
                } else {
                    result.arrItem[index] = dv;
                }
            }
            

            var total = 0;
            result.arrItem.map(item => total += (parseFloat(item.soLuong) * parseFloat(item.donGia)))
            result.totalCost = total;

            return result;
        }
        case REMOVE_CART_SERVICE: {
            return {
                arrItem: [],
                totalCost: 0,
            };
        }
        default: 
            return state;
    }
}

export default cartServiceReducer;