import React from 'react'
import { Row, Col, Form, Input, Tooltip, Button, message, Popconfirm, Switch } from 'antd';
import { Link } from 'react-router-dom';
import { ImCancelCircle } from 'react-icons/im';
import { useState, useEffect } from 'react';
import { url } from '../../../../Api/url';
import { putData, getData } from 'Api/api';
import { urnSurchargePriceID } from 'Api/urn';

export default function SurchargePriceUpd(props) {
    const idGPT = props.idGPT;
    const [tenPT, setTenPT] = useState('');
    const [giaPT, setGiaPT] = useState(0);
    const [loaiGPT, setLoaiGPT] = useState(1);

    useEffect(() => {
        console.log('idGPT: ', idGPT);
        var uri = url + urnSurchargePriceID(idGPT);
        getData(uri)
        .then(res =>{
            setTenPT(res.data.tenPT);
            setGiaPT(res.data.giaPT);
            setLoaiGPT(res.data.loaiGPT);
        })
        .catch(err => console.log(err));
    }, [idGPT]);

    function onReset(){
        var uri = url + urnSurchargePriceID(idGPT);
        getData(uri)
        .then(res =>{
            setTenPT(res.data.tenPT);
            setGiaPT(res.data.giaPT);
            setLoaiGPT(res.data.loaiGPT);
        })
        .catch(err => console.log(err));
    }

    const onUpdate = () => {
        if(tenPT === "" || giaPT === 0){
            message.error("Please, fill out all the fields!");
            return;
        }
        const data = {
            tenPT,
            giaPT
        }
        console.log(data);
        var uri = url + urnSurchargePriceID(idGPT);
        putData(uri, data)
        .then(res => {
            console.log("res upd: ", res);
            message.success("Update successfully, wait a few seconds", 3).then(()=>{
                props.propsParent.history.push('/admin/surcharge-price/');
            })
        });
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
                            <h1 className="text-center"><b>UPDATE SURCHARGE PRICE</b></h1>
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
                            <Col xs={6} md={6} lg={6}><b>{loaiGPT === 1 ? "Price: " : "Percent: "}</b></Col>
                            <Col xs={18} md={18} lg={18}>
                                {
                                    loaiGPT === 1 ? (
                                        <Input type="number" prefix="$" suffix="USD" min={1} max={6} name="giaPT" value={giaPT} onChange={ e => setGiaPT(e.target.value) } placeholder="Price" />
                                    ) : (
                                        <Input type="number" suffix="%" min={1} max={6} name="giaPT" value={giaPT} onChange={ e => setGiaPT(e.target.value) } placeholder="Percent" />
                                    )
                                }
                            </Col>
                        </Row>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>Type:</b></Col>
                            <Col xs={18} md={18} lg={18}>
                                <Switch checkedChildren="Extra basic" checked={loaiGPT === 1 ? true : false} unCheckedChildren="Extra room" defaultChecked onChange={ (checked) => {setLoaiGPT(checked ? 1 : 2)} } />
                            </Col>
                        </Row>
                        <Row justify="end">
                            <Col xs={2} md={2} lg={2}>
                                <Popconfirm
                                    title="Are you sure?"
                                    onConfirm={ onReset }
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button size="large" className="btn-reset">Reset</Button>
                                </Popconfirm>
                            </Col>
                            <Col xs={2} md={2} lg={2}>
                                <Button size="large" onClick={ onUpdate } className="btn-create">Update</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
                <Col xs={2} md={2} lg={2} />
            </Row>
        </>
    )
}
