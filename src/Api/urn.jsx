const urnRoomType = '/api/roomtype/';
const urnRoomTypeID = id => '/api/roomtype/'+ id;
const urnRoomTypeRateIDLP = id => '/api/roomtype/get-rate-by-idLP/'+ id;

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

export {
    urnRoomType,
    urnRoomTypeID,
    urnRoomTypeRateIDLP,

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
};