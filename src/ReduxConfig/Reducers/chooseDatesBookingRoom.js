const { differenceInDays, format } = require("date-fns");
const { UPD_DATES_BOOKING_ROOM } = require("ReduxConfig/ActionTypes");

const initialState = {
    // dateA: format(new Date(), 'yyyy/MM/dd'),
    // dateB: format(new Date(), 'yyyy/MM/dd'),
    dateA: (new Date()).getTime() +  (1 * 24 * 60 * 60 * 1000),
    dateB: (new Date()).getTime() +  (1 * 24 * 60 * 60 * 1000),
    daysDiff: 0
}

const chooseDatesBookingRoomReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPD_DATES_BOOKING_ROOM: {
            let chooseDatesBookingRoom = {
                dateA: format(new Date(action.payload.dateA), 'yyyy/MM/dd'),
                dateB: format(new Date(action.payload.dateB), 'yyyy/MM/dd'),
                daysDiff: differenceInDays(new Date(action.payload.dateB), new Date(action.payload.dateA))
            }
            return chooseDatesBookingRoom;
        }
        default: {
            return state;
        }
    }
}

export default chooseDatesBookingRoomReducer;