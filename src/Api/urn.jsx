const urnRoomType = '/api/roomtype/';
const urnRoomTypeID = id => '/api/roomtype/'+ id;

const urnRoomTypeImage = '/api/roomtype-image/';
const urnRoomTypeImageID = id => '/api/roomtype-image/'+ id;
const urnRoomTypeImageIDLP = id => '/api/roomtype-image/get_by_idlp/'+ id;

const urnService = '/api/service/';
const urnServiceID = id => '/api/service/'+ id;

const urnServiceImage = '/api/service-image/';
const urnServiceImageID = id => '/api/service-image/'+ id;

export {
    urnRoomType,
    urnRoomTypeID,

    urnRoomTypeImage,
    urnRoomTypeImageID,
    urnRoomTypeImageIDLP,

    urnService,
    urnServiceID,
     
    urnServiceImage,
    urnServiceImageID,
};