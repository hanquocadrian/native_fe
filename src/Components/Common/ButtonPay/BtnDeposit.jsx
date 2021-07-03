import React, { useEffect, useState } from 'react'
import Paypal from 'Components/Common/Paypal/Paypal'
import { Button, Popconfirm, message } from 'antd'
import { getData } from 'Api/api';
import { urnBookingDetailsByIdBooking } from 'Api/urn';
import { url } from 'Api/url';
import { urnRoomsByDatesIdRoomTypeNumber } from 'Api/urn';
import { postData } from 'Api/api';
import { urnBillDetailsByIdBill } from 'Api/urn';
import { urnChangeStatusToDepositBill } from 'Api/urn';
import { urnPayer } from 'Api/urn';
import { urnBillID } from 'Api/urn';
import { putData } from 'Api/api';

function BtnDeposit(props) {
    const [isClickDeposit, setIsClickDeposit] = useState(false);
    const [bill, setBill] = useState({});

    useEffect(() => {
        // console.log('record: ',props.bill);
        setBill(props.bill);
    }, [props.bill]);

    const canPaid = () => {
        // Check: Can use rooms on this bill?
        var idPTT = bill.idPTT;
        var idDDP = bill.idDDP;
        var dateA = bill.ngayDen;
        var dateB = bill.ngayDi;
        var arrRoom = [];

        //  Lấy DS Phòng có thể ở vào ngày ấy vs các LP ấy vs số lượng cho từng loại ấy
        //  Để so sánh vs Phía chi tiết Phiếu TT 
        //  Xem xem mình có thễ giữ chân Phòng ấy ko, lỡ có ai nhanh chân giữ chân nó trc lúc mình gom tiền để mình deposit phòng
        let uri = url + urnBookingDetailsByIdBooking(idDDP);
        getData(uri).then((resBookingDetails) => {
            if(typeof resBookingDetails.data === 'undefined'){ return message.error("Server Error"); }
            // console.log('booking details by idDDP: ', resBookingDetails.data);
            if(resBookingDetails.data.length > 0){
                var countBD = resBookingDetails.data.length;
                resBookingDetails.data.map((bookingDetail) => {
                    let idLP = bookingDetail.idLP;
                    let soLuong = bookingDetail.soLuong;

                    let data = {
                        dateA,
                        dateB,
                        idLP,
                        soLuong
                    };
                    let uri = url + urnRoomsByDatesIdRoomTypeNumber;
                    postData(uri, data)
                    .then((resRooms) => {
                        countBD--;
                        arrRoom = arrRoom.concat(resRooms.data);

                        if(countBD == 0) {
                            // console.log("Rooms can book: ", arrRoom);
                            
                            // Duyệt các phòng có trong CTPTT để xem có căn nào ko tồn tại trong DS Phòng trống từ DDP vào time hiện tại ko
                            let uri = url + urnBillDetailsByIdBill(idPTT);
                            getData(uri).then((resBillDetails) => {
                                if(typeof resBillDetails.data === 'undefined'){ return message.error("Server Error"); }
                                if(resBillDetails.data.length > 0) {
                                    var countBillD = resBillDetails.data.length;
                                    resBillDetails.data.map((billDetail) => {
                                        countBillD--;
                                        // console.log('Room in bill detail: ', billDetail);
                                        if(!arrRoom.includes(billDetail.maPhong)) { 
                                            return message.error(`Sorry! You can't deposit this bill, because some rooms in this bill had been someone deposit!`); 
                                        }  
                                        if(countBillD == 0){ 
                                            // console.log('có thể')
                                            message.success(`You can deposit 30% this bill now!`); 
                                            return setIsClickDeposit(!isClickDeposit);
                                        }
                                    })
                                }
                            })
                        }
                    });
                })
            }
            
        })
    }

    const onResultPay = (err, cancel, payment) => {
        if(err){
            message.error('Server Paypal has problem! Can you come back later?');
            setIsClickDeposit(!isClickDeposit);
            return;
        } else if (cancel){
            message.warning('You was cancelled deposit 30%');
            setIsClickDeposit(!isClickDeposit);
            return;
        } else {
            let uri = url + urnChangeStatusToDepositBill(bill.idPTT);
            getData(uri).then((res) => {
                // cập nhật idThe vào bill + lưu obj The vào tblTheThanhToan nếu chưa có acc payment ấy
                var dataPayer = {
                    idThe: payment.payerID,
                    tenThe: payment.address.recipient_name,
                    thoiHanThe: null,
                    loaiThe: 3,
                    nganHang: 1,
                    email: payment.email,
                    diaChi: payment.address.city
                }
                let uri = url + urnPayer;
                postData(uri, dataPayer).then(resPayer => {
                    var dataBill = bill;
                    dataBill.tinhTrang = 2;
                    dataBill.idThe = resPayer.data;

                    let uri = url + urnBillID(dataBill.idPTT);
                    putData(uri, dataBill).then(resBill => {
                        message.success('You deposited 30%, thank you!');
                        setIsClickDeposit(!isClickDeposit);
                        props.onRefesh(true);
                        return;
                    })
                })
            })
        }
    }

    return (
        <>
            {
                !isClickDeposit ? (
                    <Popconfirm
                        title="Are you sure to deposit for this bill?"
                        onConfirm={ canPaid }
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button className="btn-create">Deposit 30%</Button>
                    </Popconfirm>   
                ) : (
                        <Paypal total={ bill.tienCoc } onResultPay={ onResultPay } />
                )
            }
        </>
    )
}

export default BtnDeposit

