import React from 'react'
import { Row, Col, Button, message, Popconfirm } from 'antd';
import Paypal from 'Components/Common/Paypal/Paypal';
import { useState, useEffect } from 'react';
import { urnChangeStatusToDepositBill } from 'Api/urn';
import { url } from 'Api/url';
import { getData } from 'Api/api';


function BtnDeposit(props) {
    const bill = props.bill;
    const [cash, setCash] = useState(0);

    useEffect(() => {
        var money = 0;

        if(bill){
            if(bill.tinhTrang === 1){
                money = bill.tienCoc
                console.log('cast: ', money);
                setCash(money);
            }
            if(bill.tinhTrang === 2){
                money = bill.tienConLai;
                console.log('cast: ', money);
                setCash(money);
            }  
        }
        
    },[bill])

    const paidCastSettlement = () => {
        let uri = url + urnChangeStatusToDepositBill(bill.idPTT);
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
            let uri = url + urnChangeStatusToDepositBill(bill.idPTT);
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
                        title={"Customer accept paid for this bill with $" + cash}
                        onConfirm={ paidCastSettlement }
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

export default BtnDeposit