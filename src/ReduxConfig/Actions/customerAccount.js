import { CUS_LOGIN, CUS_LOGOUT, CUS_LOGIN_UPDATE } from "ReduxConfig/ActionTypes"

export const actLogin = (user) => {
    return {
        type: CUS_LOGIN,
        payload: user,
    }
}

export const actUpdateLogin = (user) => {
    return {
        type: CUS_LOGIN_UPDATE,
        payload: user,
    }
}

export const actLogout = () => {
    return {
        type: CUS_LOGOUT,
    }
}