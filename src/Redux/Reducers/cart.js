const initialState = {
    items: JSON.parse(localStorage.getItem('cartItemLS')) || [],
    count: localStorage.getItem('cartCountLS') || 0
}

const cartReducer = (state = initialState, action) => {
    switch(action.type){
        case 'ADD_CART': 
            var items = [
                ...state.items,
                {
                    idLP: action.idLP,
                    tenLP: action.tenLP,
                    hinhAnh: action.hinhAnh,
                    giaLP: action.giaLP
                }
            ];
            var count = state.count + 1;
            localStorage.setItem('cartItemLS', JSON.stringify(items));
            localStorage.setItem('cartCountLS', count);
            return {
                items,
                count
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