export const urnRoomType = '/api/roomtype/';
export const urnRoomTypeID = id => '/api/roomtype/'+ id;
export const urnRoomTypeRateIDLP = id => '/api/roomtype/get-rate-by-idLP/'+ id;
export const urnRoomTypeSearchByDates = '/api/roomtype/search-roomtype-by-days';

export const urnRoomTypeImage = '/api/roomtype-image/';
export const urnRoomTypeImageID = id => '/api/roomtype-image/'+ id;
export const urnRoomTypeImageIDLP = id => '/api/roomtype-image/get_by_idlp/'+ id;

export const urnService = '/api/service/';
export const urnServiceID = id => '/api/service/'+ id;

export const urnServiceImage = '/api/service-image/';
export const urnServiceImageID = id => '/api/service-image/'+ id;

export const urnDailyRate = '/api/daily-rate/';
export const urnDailyRateID = id => '/api/daily-rate/' + id;

export const urnSpecialRate = '/api/special-rate/';
export const urnSpecialRateID = id => '/api/special-rate/' + id;

export const urnRoom = '/api/room/';
export const urnRoomID = id => '/api/room/'+ id;

export const urnChartMoneyBooking = '/api/chart/booking-money-by-quarterlies';

export const urnAdmin = '/api/admin/';
export const urnAdminID = id => '/api/admin/'+ id;

export const urnUser = '/api/user/';
export const urnUserID = id => '/api/user/'+ id;

export const urnKhd = '/api/khd/';
export const urnKhdID = id => '/api/khd/' + id;

export const urnCustomerStay = '/api/customer-stay/';
export const urnCustomerStayID = id => '/api/customer-stay/' + id;

export const urnBooking = '/api/booking/';
export const urnBookingID = id => '/api/booking/' + id;
export const urnBookingIDKHD = id => '/api/booking/get_by_idKHD/' + id;

export const urnBookingDetail = '/api/detail-booking/';
export const urnBookingDetailID = id => '/api/detail-booking/' + id;
export const urnBookingDetailIDDDP = id => '/api/detail-booking/get-booking-detail-by-idDDP/' + id;

export const urnRoomsByDatesIdRoomTypeNumber = '/api/room/get-rooms-by-dates-idlp-number';
export const urnBookingDetailsByIdBooking = id => '/api/detail-booking/get-booking-detail-by-idDDP/' + id;
export const urnBillDetailsByIdBill = id => '/api/detail-bill/get-bill-detail-by-idPTT/' + id;

export const urnChangeStatusToDepositBill = id => '/api/bill/change-status-to-deposit-by-id-bill/' + id;

export const urnPayer = '/api/payer/';

export const urnBill = '/api/bill/';
export const urnBillID = id => '/api/bill/' + id;
export const urnBillsByIDKHD = id => '/api/bill/get-bills-by-id-customer-booking/' + id;
export const urnBillByIDDDP = id => '/api/bill/get-bill-by-idDDP/' + id;

export const urnBillDetail = '/api/detail-bill';
export const urnBillDetailID = id => '/api/detail-bill/' + id;
