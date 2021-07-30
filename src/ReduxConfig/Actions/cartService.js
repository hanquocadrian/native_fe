import { SAVE_ITEM_CART_SERVICE, REMOVE_CART_SERVICE } from "ReduxConfig/ActionTypes"

export const saveItemCartService = (obj) => {
    return {
        type: SAVE_ITEM_CART_SERVICE,
        payload: obj
    };
}

export const removeCartService = () => {
    return {
        type: REMOVE_CART_SERVICE,
    }
}
