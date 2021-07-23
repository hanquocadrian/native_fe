import React from 'react'
import { Row, Col, Button, message, Popconfirm } from 'antd';
import Paypal from 'Components/Common/Paypal/Paypal';
import { useState, useEffect } from 'react';
import { urnChangeStatusToPaidBill } from 'Api/urn';
import { url } from 'Api/url';
import { getData } from 'Api/api';

function BtnCheckout(props) {
    const bill = props.bill;
    const [cast, setCast] = useState(0);

    useEffect(() => {
        var money = 0;

        if(bill.tinhTrang === 1){
            money = bill.tienPhaiTra
            console.log('cast: ', money);
            setCast(money);
        }
        if(bill.tinhTrang === 2){
            money = bill.tienConLai;
            console.log('cast: ', money);
            setCast(money);
        }
    },[bill])

    const paidCastSettlement = () => {
        let uri = url + urnChangeStatusToPaidBill(bill.idPTT);
        getData(uri).then((res) => {
            message.success('You deposited 30%, thank you!');
            return props.onRefesh(true);
        })
    }

    const onResultPay = (err, cancel, payment) => {
        if(err){
            message.error('Server Paypal has problem! Can you come back later?');
            return;
        } else if (cancel){
            message.warning('You was cancelled deposit 30%');
            return;
        } else {
            let uri = url + urnChangeStatusToPaidBill(bill.idPTT);
            getData(uri).then((res) => {
                message.success('You deposited 30%, thank you!');
                return props.onRefesh(true);
            })
        }
    }

    return (
        <>
            <Row className="mb-15">
                <Col xs={24} md={24} lg={24}>
                    <Popconfirm
                        title={"Customer accept paid for this bill with $" + cast}
                        onConfirm={ paidCastSettlement }
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button className="btn-create">CAST SETTLE</Button>
                    </Popconfirm>
                </Col>
            </Row> 
            <Row>
                <Col xs={24} md={24} lg={24}>
                    <Paypal total={ cast } onResultPay={ onResultPay } />
                </Col>
            </Row> 
        </>
    )
}

export default BtnCheckout

