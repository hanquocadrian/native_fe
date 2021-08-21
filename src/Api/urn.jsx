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
export const urnRoomByIdBooking = id => '/api/room/get-rooms-by-idbooking-with-bill/'+ id;
export const urnRoomByIdBill = id => '/api/room/get-rooms-by-idbill-with-bill/'+ id;
export const urnRoomsByDatesIdlp = '/api/room/get-rooms-by-dates-idlp/';

export const urnChartMoneyBooking = '/api/chart/booking-money-by-quarterlies';
export const urnChartMoneyBookingService = '/api/chart/booking-service-money-by-quarterlies';
export const urnChartMoneyBillMonths = '/api/chart/bill-money-by-months';
export const urnChartNumberRoomTypeToBeBooked = '/api/chart/get-list-number-room-types-to-be-booked/';
export const urnChartCusStayIn7N1Nationals = '/api/chart/cus-stay-in-7-n-1-nationals';

export const urnAdmin = '/api/admin/';
export const urnAdminID = id => '/api/admin/'+ id;

export const urnUser = '/api/user/';
export const urnUserID = id => '/api/user/'+ id;
export const urnUserByEmail = '/api/user/get-user-by-email';

export const urnKhd = '/api/khd/';
export const urnKhdID = id => '/api/khd/' + id;
export const urnKhdWithStatusRRCIsUsing = '/api/khd/get-khd-with-status-rrc-is-using';
export const urnKhdByEmail = '/api/khd/get-khd-by-email';

export const urnCustomerStay = '/api/customer-stay/';
export const urnCustomerStayByDateSave = '/api/customer-stay/get-cus-by-date-save/';
export const urnCustomerStayID = id => '/api/customer-stay/' + id;


export const urnBookingService = '/api/booking-service/';
export const urnBookingServiceID = id => '/api/booking-service/' + id;
export const urnChangeStatusToCompletedByIddddv = id => '/api/booking-service/update-status-by-idDDDV-to-completed/' + id;
export const urnBookingServiceIDKHD = id => '/api/booking-service/get-dddv-by-idkhd/' + id;

export const urnDetailBookingService = '/api/detail-book-service/';
export const urnDetailBookingServiceID = id => '/api/detail-book-service/' + id;
export const urnDetailBookingServiceIDDDDV = id => '/api/detail-book-service/get-ctdddv-by-iddddv/' + id;

export const urnBooking = '/api/booking/';
export const urnBookingID = id => '/api/booking/' + id;
export const urnBookingIDKHD = id => '/api/booking/get_by_idKHD/' + id;
export const urnBookingWasDeposit = '/api/booking/was-deposit-in-bill/';
export const urnBookingIdKHDWithRRCIsUsing = id => '/api/booking/get-ddp-by-idkhd-with-rrc-is-using/' + id;


export const urnBookingDetail = '/api/detail-booking/';
export const urnBookingDetailID = id => '/api/detail-booking/' + id;
export const urnBookingDetailIDDDP = id => '/api/detail-booking/get-booking-detail-by-idDDP/' + id;

export const urnRoomsByDatesIdRoomTypeNumber = '/api/room/get-rooms-by-dates-idlp-number';
export const urnBookingDetailsByIdBooking = id => '/api/detail-booking/get-booking-detail-by-idDDP/' + id;
export const urnBillDetailsByIdBill = id => '/api/detail-bill/get-bill-detail-by-idPTT/' + id;

// export const urnPayer = '/api/payer/';

export const urnSaleOffByCost = '/api/sale-off/find-with-total-cost';
export const urnBill = '/api/bill/';
export const urnBillID = id => '/api/bill/' + id;
export const urnBillsByIDKHD = id => '/api/bill/get-bills-by-id-customer-booking/' + id;
export const urnBillByIDDDP = id => '/api/bill/get-bill-by-idDDP/' + id;
export const urnChangeStatusToDepositBill = id => '/api/bill/change-status-to-deposit-by-id-bill/' + id;
export const urnChangeStatusToPaidBill = id => '/api/bill/change-status-to-paid-by-id-bill/' + id;
export const urnChangeStatusToCancelBill = id => '/api/bill/change-status-to-cancel-by-id-bill/' + id;
export const urnBillCusCancel = id => '/api/bill/cus-cancel/' + id;
export const urnBillAdminCancel = id => '/api/bill/admin-cancel/' + id;
export const urnBillUpdateMoneyInBill = id => '/api/bill/update-money-in-bill/' + id;

export const urnBillDetail = '/api/detail-bill';
export const urnBillDetailID = id => '/api/detail-bill/' + id;

export const urnRRC = '/api/rrc/';
export const urnRRCID = id => '/api/rrc/' + id;
export const urnRRCByIDDDP = id => '/api/rrc/get-by-idDDP/' + id;
export const urnRoomRentalContractByIDDDP = id => '/api/rrc/get-by-idDDP/' + id;
export const urnUpdateStatusWentByIDDDP = id => '/api/rrc/update-status-went-by-idddp/' + id;
export const urnRRCByIDKHDWithRCCIsUsing = id => '/api/rrc/get-rrc-by-idkhd-with-status-rrc-is-using/' + id;
export const urnRRCByIDKHDIDDDPWithRCCIsUsing = '/api/rrc/get-rrc-by-idkhd-idddp-with-status-rrc-is-using';

export const urnExtraFee = '/api/extra-fee/';
export const urnExtraFeeID = id => '/api/extra-fee/' + id;
export const urnExtraFeeByIDPTT = id => '/api/extra-fee/get-extra-fee-by-idPTT/' + id;

export const urnSurchargePrice = '/api/surcharge-price/';
export const urnSurchargePriceID = id => '/api/surcharge-price/' + id;
