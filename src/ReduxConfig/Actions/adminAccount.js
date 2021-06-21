import { AD_LOGIN, AD_LOGOUT } from 'ReduxConfig/ActionTypes';

export const actLogin = (user) => {
    return {
        type: AD_LOGIN,
        payload: user
    };
};

export const actLogout = () => {
    return {
        type: AD_LOGOUT,
    };
};