const urnRoomType = '/api/roomtype/';
const urnRoomTypeID = id => '/api/roomtype/'+ id;
const urnRoomTypeRateIDLP = id => '/api/roomtype/get-rate-by-idLP/'+ id;
const urnRoomTypeSearchByDates = '/api/roomtype/search-roomtype-by-days';

const urnRoomTypeImage = '/api/roomtype-image/';
const urnRoomTypeImageID = id => '/api/roomtype-image/'+ id;
const urnRoomTypeImageIDLP = id => '/api/roomtype-image/get_by_idlp/'+ id;

const urnService = '/api/service/';
const urnServiceID = id => '/api/service/'+ id;

const urnServiceImage = '/api/service-image/';
const urnServiceImageID = id => '/api/service-image/'+ id;

const urnDailyRate = '/api/daily-rate/';
const urnDailyRateID = id => '/api/daily-rate/' + id;

const urnSpecialRate = '/api/special-rate/';
const urnSpecialRateID = id => '/api/special-rate/' + id;

const urnRoom = '/api/room/';
const urnRoomID = id => '/api/room/'+ id;

const urnChartMoneyBooking = '/api/chart/booking-money-by-quarterlies';

const urnAdmin = '/api/admin/';
const urnAdminID = id => '/api/admin/'+ id;

const urnUser = '/api/user/';
const urnUserID = id => '/api/user/'+ id;

const urnKhd = '/api/khd/';
const urnKhdID = id => '/api/khd/' + id;

export {
    urnRoomType,
    urnRoomTypeID,
    urnRoomTypeRateIDLP,
    urnRoomTypeSearchByDates,

    urnRoomTypeImage,
    urnRoomTypeImageID,
    urnRoomTypeImageIDLP,

    urnService,
    urnServiceID,
     
    urnServiceImage,
    urnServiceImageID,

    urnDailyRate,
    urnDailyRateID,

    urnSpecialRate,
    urnSpecialRateID,

    urnRoom,
    urnRoomID,

    urnChartMoneyBooking,

    urnAdmin,
    urnAdminID,

    urnUser,
    urnUserID,

    urnKhd,
    urnKhdID,
};