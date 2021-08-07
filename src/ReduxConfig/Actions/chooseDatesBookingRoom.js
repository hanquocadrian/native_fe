import { UPD_DATES_BOOKING_ROOM } from "ReduxConfig/ActionTypes"

export const updDatesBookingRoom = (dates) => {
    return {
        type: UPD_DATES_BOOKING_ROOM,
        payload: dates
    };
}