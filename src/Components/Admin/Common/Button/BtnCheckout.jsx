import React from 'react'
import { Row, Col, Button, message, Popconfirm } from 'antd';
import Paypal from 'Components/Common/Paypal/Paypal';
import { useState, useEffect } from 'react';
import { urnChangeStatusToPaidBill } from 'Api/urn';
import { url } from 'Api/url';
import { getData } from 'Api/api';
import { urnUpdateStatusWentByIDDDP } from 'Api/urn';

function BtnCheckout(props) {
    const bill = props.bill;
    const [cash, setcash] = useState(0);

    useEffect(() => {
        var money = 0;

        // if(bill.tinhTrang === 1){
        //     money = bill.tongTienConLai
        //     console.log('cash: ', money);
        //     setcash(money);
        // }
        if(bill.tinhTrang === 1 || bill.tinhTrang === 2){
            money = bill.tongTienConLai;
            console.log('cash: ', money);
            setcash(money);
        }
    },[bill])

    const paidcashSettlement = () => {
        let uri = url + urnChangeStatusToPaidBill(bill.idPTT);
        getData(uri).then((res) => {
            message.success('You was checkout, thank you!');
            var uri = url + urnUpdateStatusWentByIDDDP(bill.idDDP);
            getData(uri).then((res) => {
                return props.onRefesh(true);
            });
        })
    }

    const onResultPay = (err, cancel, payment) => {
        if(err){
            message.error('Server Paypal has problem! Can you come back later?');
            return;
        } else if (cancel){
            message.warning('You was cancelled checkout');
            return;
        } else {
            let uri = url + urnChangeStatusToPaidBill(bill.idPTT);
            getData(uri).then((res) => {
                message.success('You was checkout, thank you!');
                var uri = url + urnUpdateStatusWentByIDDDP(bill.idDDP);
                getData(uri).then((res) => {
                    return props.onRefesh(true);
                });
            })
        }
    }

    return (
        <>
            <Row className="mb-15">
                <Col xs={24} md={24} lg={24}>
                    <Popconfirm
                        title={"Customer accept paid for this bill with $" + cash}
                        onConfirm={ paidcashSettlement }
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button className="btn-create">CASH SETTLE</Button>
                    </Popconfirm>
                </Col>
            </Row> 
            <Row>
                <Col xs={24} md={24} lg={24}>
                    <Paypal total={ cash } onResultPay={ onResultPay } />
                </Col>
            </Row> 
        </>
    )
}

export default BtnCheckout
