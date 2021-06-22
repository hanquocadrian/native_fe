import { CUS_LOGIN, CUS_LOGOUT } from "ReduxConfig/ActionTypes";

const initialState = {
    idTK: sessionStorage.getItem('customerAccount') ? JSON.parse(sessionStorage.getItem('customerAccount')).idTK : -1,
    idKHD: sessionStorage.getItem('customerAccount') ? JSON.parse(sessionStorage.getItem('customerAccount')).idKHD : -1,
    email: sessionStorage.getItem('customerAccount') ? JSON.parse(sessionStorage.getItem('customerAccount')).email : '',
    displayName: sessionStorage.getItem('customerAccount') ? JSON.parse(sessionStorage.getItem('customerAccount')).displayName : '',
    loaiTaiKhoan: sessionStorage.getItem('customerAccount') ? JSON.parse(sessionStorage.getItem('customerAccount')).loaiTaiKhoan : 0,

    isLogin: sessionStorage.getItem('customerAccount') ? JSON.parse(sessionStorage.getItem('customerAccount')).isLogin :  false,
    isSocialLogin: sessionStorage.getItem('customerAccount') ? JSON.parse(sessionStorage.getItem('customerAccount')).isSocialLogin :  false,
}

const customerAccountReducer = (state = initialState, action) => {
    switch (action.type) {
        case CUS_LOGIN: {
            let customerAccount = {
                idTK: action.payload.idTK,
                idKHD: action.payload.idKHD,
                email: action.payload.email,
                displayName: action.payload.displayName,
                loaiTaiKhoan: action.payload.loaiTaiKhoan,
                isLogin: action.payload.isLogin,
                isSocialLogin: action.payload.isSocialLogin
            };

            sessionStorage.setItem('customerAccount', JSON.stringify(customerAccount));

            return customerAccount;
        }
        case CUS_LOGOUT: {
            let customerAccount = {
                idTK: -1,
                idKHD: -1,
                email: '',
                displayName: '',
                loaiTaiKhoan: 0,
                isLogin: false,
                isSocialLogin: false
            };

            sessionStorage.setItem('customerAccount', JSON.stringify(customerAccount));

            return customerAccount;
        }
        default: 
            return state;
    }
}

export default customerAccountReducer;