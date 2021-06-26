import { ADD_CART, DEL_CART } from "ReduxConfig/ActionTypes"

export const addCart = (sl) => {
    return {
        type: ADD_CART,
        payload: sl

        // idLP: roomType.idLP,
        // tenLP: roomType.idLP,
        // hinhAnh: roomType.hinhAnh,
        // giaLP: roomType.giaLP
    };
}

export const deleteCart = (sl) => {
    return {
        type: DEL_CART,
        payload: sl
    };
}