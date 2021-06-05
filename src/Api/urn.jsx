const urnRoomType = '/api/roomtype/';
const urnRoomTypeID = id => '/api/roomtype/'+ id;

const urnRoomTypeImage = '/api/roomtype-image/';
const urnRoomTypeImageID = id => '/api/roomtype-image/'+ id;
const urnRoomTypeImageIDLP = id => '/api/roomtype-image/get_by_idlp/'+ id;

export {
    urnRoomType,
    urnRoomTypeID,
    urnRoomTypeImage,
    urnRoomTypeImageID,
    urnRoomTypeImageIDLP
};