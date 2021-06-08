const initialState = {
    email: localStorage.getItem('email') || '',
    displayName: localStorage.getItem('displayName') || '',
    isLogin: localStorage.getItem('isLogin') ||  false,
    isSocialLogin: localStorage.getItem('isSocialLogin') ||  true,
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_USER': {
            localStorage.setItem('email', action.payload.email);
            localStorage.setItem('displayName', action.payload.displayName);
            localStorage.setItem('isLogin', action.payload.isLogin);
            localStorage.setItem('isSocialLogin', action.payload.isSocialLogin);

            return {
                email: action.payload.email,
                displayName: action.payload.displayName,
                isLogin: action.payload.isLogin,
                isSocialLogin: action.payload.isSocialLogin
            };
        }
        case 'LOGOUT_USER': {
            localStorage.setItem('email', action.payload.email);
            localStorage.setItem('displayName', action.payload.displayName);
            localStorage.setItem('isLogin', action.payload.isLogin);
            localStorage.setItem('isSocialLogin', action.payload.isSocialLogin);

            return {
                email: action.payload.email,
                displayName: action.payload.displayName,
                isLogin: action.payload.isLogin,
                isSocialLogin: action.payload.isSocialLogin
            };
        }
        default: 
            return state;
    }
}

export default userReducer;