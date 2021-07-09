import { Button, Spin, Popconfirm, message } from 'antd'
import { putData } from 'Api/api';
import { postData } from 'Api/api';
import { getData } from 'Api/api';
import { url } from 'Api/url';
import { urnRoomsByDatesIdRoomTypeNumber } from 'Api/urn';
import { urnBillDetailID } from 'Api/urn';
import { urnBookingDetailIDDDP } from 'Api/urn';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react'

function BtnUpdateRooms(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [bill, setBill] = useState(props.bill);
    const [billDetails, setBillDetails] = useState(props.billDetails);

    useEffect(() => {
        setBill(props.bill);
        setBillDetails(props.billDetails);
    },[props.bill, props.billDetails])

    const updateRoomsInBill = async (bill, billDetails) => {
        setIsLoading(true);
        const {idDDP, idPTT} = bill;
        var dateA = format(new Date(bill.ngayDen), 'yyyy/MM/dd');
        var dateB = format(new Date(bill.ngayDi), 'yyyy/MM/dd');
        var uri = ""; 
        var arrRooms = [];
        var arrMoney = [];
        var arrCTPTTnew = [];

        uri = url + urnBookingDetailIDDDP(idDDP);
        getData(uri).then((resListCTDDP) => {
            var arrCTDDP = resListCTDDP.data;
            arrCTDDP.map((item, i) => {
                for (let j = 0; j < item.soLuong; j++){ 
                    arrMoney.push(item.donGia)
                    arrCTPTTnew.push({ idCTPTT: billDetails[i].idCTPTT, donGia: item.donGia, idPTT, maPhong: "", idLP: item.idLP }); 
                }
                return 1;
            });
            console.log('arrCTDDP, Money, CTPTTnew: ', arrCTDDP, arrMoney, arrCTPTTnew);

            var count1 = 0;
            arrCTDDP.map((item) => {
                var data = { dateA, dateB, idLP: item.idLP, soLuong: item.soLuong };
                console.log('tài nguyên: dataA, dateB, combo SL vs idLP trong arrCTDDP: ', data);
                uri = url + urnRoomsByDatesIdRoomTypeNumber;
                postData(uri, data).then(resRoom => {
                    count1++;
                    arrRooms = resRoom.data;
                    var i = 0;
                    arrCTPTTnew.map((item) => {
                        if(item.idLP === data.idLP){
                            // console.log('idCTPTT: ', item.idCTPTT);
                            arrCTPTTnew[arrCTPTTnew.findIndex(i => i.idCTPTT === item.idCTPTT)].maPhong = arrRooms[i++];
                            // console.log('new: ', arrCTPTTnew);
                        }
                        return 1;
                    })

                    if(count1 === arrCTDDP.length){
                        console.log('kq cuối: ', arrCTPTTnew);
                        var count2 = 0;
                        arrCTPTTnew.map((item)=>{
                            uri = url + urnBillDetailID(item.idCTPTT);
                            putData(uri, item).then(res => {
                                count2++;
                                if(count2 === arrCTPTTnew.length){
                                    message.success(`You can deposited 30% again for idBill: ${idPTT}, thank you!`, 5);
                                    props.onRefeshUpdate(true);
                                    setIsLoading(false);                                    
                                }
                            });
                            return 1;
                        })
                    }
                })
                return 1;
            });
        })
        
    }

    return (
        <div style={{height: '32px', lineHeight: '32px'}}>
            {
                isLoading ? (
                    <>
                        <Spin size="large" />
                    </>
                ) : (
                    <>
                        <Popconfirm
                            title="Are you sure to update rooms for this bill?"
                            onConfirm={ () => updateRoomsInBill(bill, billDetails) }
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button className="btn-update">Update rooms</Button>
                        </Popconfirm>
                    </>
                )
            }
            
        </div>
    )
}

export default BtnUpdateRooms

