import { AD_LOGIN, AD_LOGOUT } from "ReduxConfig/ActionTypes";

const initialState = {
    idTK: sessionStorage.getItem('adminAccount') ? JSON.parse(sessionStorage.getItem('adminAccount')).idTK : -1,
    idAdmin: sessionStorage.getItem('adminAccount') ? JSON.parse(sessionStorage.getItem('adminAccount')).idAdmin : -1,
    email: sessionStorage.getItem('adminAccount') ? JSON.parse(sessionStorage.getItem('adminAccount')).email : '',
    phanQuyen: sessionStorage.getItem('adminAccount') ? JSON.parse(sessionStorage.getItem('adminAccount')).phanQuyen : 0,
    displayName: sessionStorage.getItem('adminAccount') ? JSON.parse(sessionStorage.getItem('adminAccount')).displayName : '',
    loaiTaiKhoan: sessionStorage.getItem('adminAccount') ? JSON.parse(sessionStorage.getItem('adminAccount')).loaiTaiKhoan : 0,

    isLogin: sessionStorage.getItem('adminAccount') ? JSON.parse(sessionStorage.getItem('adminAccount')).isLogin : false,
}

const adminAccountReducer = (state = initialState, action) => {
    switch (action.type){
        case AD_LOGIN: {
            let adminAccount = {
                idTK: action.payload.idTK,
                idAdmin: action.payload.idAdmin,
                email: action.payload.email,
                phanQuyen: action.payload.phanQuyen,
                displayName: action.payload.displayName,
                loaiTaiKhoan: action.payload.loaiTaiKhoan,
                isLogin: action.payload.isLogin,
            }
            sessionStorage.setItem('adminAccount',JSON.stringify(adminAccount));
            return adminAccount;
        }
        case AD_LOGOUT: {
            let adminAccount = {
                idTK: -1,
                idAdmin: -1,
                email: '',
                phanQuyen: 0,
                displayName: '',
                loaiTaiKhoan: 0,
                isLogin: false,
            }
            sessionStorage.setItem('adminAccount', JSON.stringify(adminAccount));
            return adminAccount;
        }
        default: {
            return state;
        }
    }
};

export default adminAccountReducer;