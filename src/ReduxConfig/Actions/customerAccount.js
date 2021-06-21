import { CUS_LOGIN, CUS_LOGOUT } from "ReduxConfig/ActionTypes"

export const actLogin = (user) => {
    return {
        type: CUS_LOGIN,
        payload: user,
    }
}

export const actLogout = () => {
    return {
        type: CUS_LOGOUT,
    }
}