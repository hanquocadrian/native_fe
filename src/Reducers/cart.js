const initialState = {
    items: [],
    count: 0
}

const cartReducer = (state = initialState, action) => {
    switch(action.type){
        case 'ADD_CART': 
            return {
                items: [
                    ...state.items,
                    {
                        idLP: action.idLP,
                        tenLP: action.tenLP,
                        hinhAnh: action.hinhAnh,
                        giaLP: action.giaLP
                    }
                ],
                count: state.count + 1
            };
        case 'REMOVE_CART': 
            var getIndex = state.items.map(function(item) { return item.idLP; }).indexOf(action.idLP);
            return {
                items: state.items.splice(getIndex, 1),
                count: state.count - 1
            };
        default: 
            return state;
    }
}

export default cartReducer;