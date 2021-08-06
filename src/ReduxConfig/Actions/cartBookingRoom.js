import { SAVE_ITEM_CART_BOOKING, REMOVE_CART_BOOKING } from "ReduxConfig/ActionTypes"

export const saveItemCartBookingRoom = (obj) => {
    return {
        type: SAVE_ITEM_CART_BOOKING,
        payload: obj
    };
}

export const removeCartBookingRoom = () => {
    return {
        type: REMOVE_CART_BOOKING,
    }
}
