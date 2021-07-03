import { UPD_DATES } from "ReduxConfig/ActionTypes"

export const updDates = (dates) => {
    return {
        type: UPD_DATES,
        payload: dates
    };
}