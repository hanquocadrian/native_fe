const { differenceInDays, format } = require("date-fns");
const { UPD_DATES } = require("ReduxConfig/ActionTypes");

const initialState = {
    dateA: localStorage.getItem("chooseDates") ? JSON.parse(localStorage.getItem("chooseDates")).dateA : format(new Date(), 'yyyy/MM/dd'),
    dateB: localStorage.getItem("chooseDates") ? JSON.parse(localStorage.getItem("chooseDates")).dateB : format(new Date(), 'yyyy/MM/dd'),
    daysDiff: localStorage.getItem("chooseDates") ? JSON.parse(localStorage.getItem("chooseDates")).daysDiff : 0
}

const chooseDatesReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPD_DATES: {
            let chooseDates = {
                dateA: format(new Date(action.payload.dateA), 'yyyy/MM/dd'),
                dateB: format(new Date(action.payload.dateB), 'yyyy/MM/dd'),
                daysDiff: differenceInDays(new Date(action.payload.dateB), new Date(action.payload.dateA))
            }
            localStorage.setItem('chooseDates', JSON.stringify(chooseDates));
            return chooseDates;
        }
        default: {
            return state;
        }
    }
}

export default chooseDatesReducer;