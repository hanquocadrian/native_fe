const initialState = {
    email: '',
    displayName: '',
    isLogin: false
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_USER': {
            return {
                email: action.email,
                displayName: action.displayName,
                isLogin: action.isLogin
            };
        }
        case 'LOGOUT_USER': {
            return {
                email: action.email,
                displayName: action.displayName,
                isLogin: action.isLogin
            };
        }
        default: 
            return state;
    }
}

export default userReducer;