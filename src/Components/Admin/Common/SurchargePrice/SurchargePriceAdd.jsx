import React from 'react'
import { Row, Col, Form, Input, Tooltip, Button, message } from 'antd';
import { Link } from 'react-router-dom';
import { ImCancelCircle } from 'react-icons/im';
import { useState } from 'react';
import { url } from '../../../../Api/url';
import { postData } from 'Api/api';
import { urnSurchargePrice } from 'Api/urn';

export default function SurchargePriceAdd() {
    const [tenPT, setTenPT] = useState('');
    const [giaPT, setGiaPT] = useState(0);

    function onReset(){
        setTenPT('');
        setGiaPT(0);
    }

    const onCreate = () => {
        if(tenPT === "" || giaPT === 0){
            message.error("Please, fill out all the fields!");
            return;
        }
        const data = {
            tenPT,
            giaPT
        }
        console.log(data);
        var uri = url + urnSurchargePrice;
        postData(uri, data)
        .then(res=>{
            console.log("res add: ", res.data);
            message.success("Create successfully, wait a few seconds", 3).then(()=>{
                onReset();
                return;
            })
        })
    }

    return (
        <>
            <div style={{ height: '3vh' }} />
            <Row>
                <Col xs={2} md={2} lg={2} />
                <Col xs={20} md={20} lg={20}>
                    <Row>
                        <Col xs={2} md={2} lg={2}>
                            <Tooltip placement="right" title="Back">
                                <Link to="/admin/surcharge-price">
                                    <Button className="btn-close" id="btnAdd">
                                        <ImCancelCircle style={{ color: 'black' }} className="icon-top" />
                                    </Button>
                                </Link>
                            </Tooltip>
                        </Col>
                        <Col xs={20} md={20} lg={20}>
                            <h1 className="text-center"><b>CREATE SURCHARGE PRICE</b></h1>
                        </Col>
                        <Col xs={2} md={2} lg={2} />
                    </Row>
                    <Form>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>Surcharge title:</b></Col>
                            <Col xs={18} md={18} lg={18}>
                                <Input name="tenLP" value={tenPT} onChange={ e => setTenPT(e.target.value) } placeholder="Surcharge title" />
                            </Col>
                        </Row>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>Price:</b></Col>
                            <Col xs={18} md={18} lg={18}><Input type="number" min={1} max={6} name="giaPT" value={giaPT} onChange={ e => setGiaPT(e.target.value) } placeholder="Price" /></Col>
                        </Row>
                        <Row justify="end">
                            <Col xs={2} md={2} lg={2}>
                                <Button size="large" onClick={ onReset } className="btn-reset">Reset</Button>
                            </Col>
                            <Col xs={2} md={2} lg={2}>
                                <Button size="large" onClick={ onCreate } className="btn-create">Create</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
                <Col xs={2} md={2} lg={2} />
            </Row>
        </>
    )
}
