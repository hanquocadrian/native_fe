import React, { useEffect, useState } from 'react'
import Paypal from 'Components/Common/Paypal/Paypal'
import { Button, Popconfirm, message, Spin, notification } from 'antd'
import { getData } from 'Api/api';
import { urnBookingDetailsByIdBooking } from 'Api/urn';
import { url } from 'Api/url';
import { urnRoomsByDatesIdRoomTypeNumber } from 'Api/urn';
import { postData } from 'Api/api';
import { urnBillDetailsByIdBill } from 'Api/urn';
import { urnChangeStatusToDepositBill } from 'Api/urn';
import { urnBillID } from 'Api/urn';
import { putData } from 'Api/api';
import { format } from 'date-fns';

function BtnDeposit(props) {
    const [isClickDeposit, setIsClickDeposit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [bill, setBill] = useState({});

    useEffect(() => {
        // console.log('record: ',props.bill);
        setBill(props.bill);
    }, [props.bill]);

    const canPaid = () => {
        setIsLoading(true);
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
            if(typeof resBookingDetails.data === 'undefined'){ 
                setIsLoading(false);
                return message.error("Server Error"); 
            }
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

                        if(countBD === 0) {
                            // console.log("Rooms can book: ", arrRoom);
                            
                            // Duyệt các phòng có trong CTPTT để xem có căn nào ko tồn tại trong DS Phòng trống từ DDP vào time hiện tại ko
                            let uri = url + urnBillDetailsByIdBill(idPTT);
                            getData(uri).then((resBillDetails) => {
                                if(typeof resBillDetails.data === 'undefined'){ 
                                    setIsLoading(false);
                                    return message.error("Server Error"); 
                                }
                                if(resBillDetails.data.length > 0) {
                                    var countBillD = resBillDetails.data.length;
                                    resBillDetails.data.map((billDetail) => {
                                        countBillD--;
                                        // console.log('Room in bill detail: ', billDetail);
                                        if(!arrRoom.includes(billDetail.maPhong)) { 
                                            setIsLoading(false);
                                            props.onCanUpdateRooms(true);
                                            return notification['warning'](
                                                {
                                                    message: `Can't deposit!`,
                                                    description:
                                                        `Sorry! You can't deposit this bill, because some rooms in this bill had been someone deposit!`,
                                                    duration: 7
                                                }
                                            );
                                        }  
                                        if(countBillD === 0){ 
                                            // console.log('có thể')
                                            setIsLoading(false);
                                            message.success(`You can deposit 30% this bill now!`); 
                                            return setIsClickDeposit(!isClickDeposit);
                                        }
                                        return 1;
                                    })
                                }
                            })
                        }
                    });
                    return 1;
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
                var dataBill = bill;
                dataBill.ngayDen = format(new Date(bill.ngayDen), 'yyyy/MM/dd');
                dataBill.ngayDi = format(new Date(bill.ngayDi), 'yyyy/MM/dd');
                dataBill.ngayThanhToan = format(new Date(bill.ngayThanhToan), 'yyyy/MM/dd');
                dataBill.tinhTrang = 2;

                console.log(dataBill);
                let uri = url + urnBillID(dataBill.idPTT);
                putData(uri, dataBill).then(resBill => {
                    message.success('You deposited 30%, thank you!');
                    setIsClickDeposit(!isClickDeposit);
                    props.onRefesh(true);
                    return;
                })
            })
        }
    }

    return (
        <div style={{height: '32px', lineHeight: '32px'}}>
            {
                !isClickDeposit ? (
                    <Popconfirm
                        title="Are you sure to deposit for this bill?"
                        onConfirm={ canPaid }
                        okText="Yes"
                        cancelText="No"
                    >
                        {
                            !isLoading ? (
                                <Button className="btn-create">Deposit 30%</Button>
                            ) : (
                                <Spin size="large">Waiting</Spin>
                            )
                        }
                        
                    </Popconfirm>   
                ) : (
                        <Paypal total={ bill.tienCoc } onResultPay={ onResultPay } />
                )
            }
        </div>
    )
}

export default BtnDeposit

