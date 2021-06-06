export const addCart = (roomType) => {
    return {
        type: 'ADD_CART',

        idLP: roomType.idLP,
        tenLP: roomType.idLP,
        hinhAnh: roomType.hinhAnh,
        giaLP: roomType.giaLP
    };
}

export const deleteItemInCart = (idLP) => {
    return {
        type: 'ADD_CART',
        idLP
    };
}