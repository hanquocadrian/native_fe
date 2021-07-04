import React from 'react'
import { Row, Col, Form, Input, Tooltip, Button, Select, message, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import { ImCancelCircle } from 'react-icons/im';
import { useState, useEffect } from 'react';
import { url } from '../../../../Api/url';
import { putData, getData } from 'Api/api';

export default function ServiceUpd(props) {
    const idDV = props.idDV;
    const [tenDV, settenDV] = useState('');
    const [moTaTD, setmoTaTD] = useState('');
    const [moTaCT, setmoTaCT] = useState('');
    const [hinhThuc, sethinhThuc] = useState('');
    const [donGia, setdonGia] = useState(0);

    const { Option } = Select;

    useEffect(() => {
        var uri = url + "/api/service/" + idDV;
        getData(uri)
        .then(res =>{
            settenDV(res.data.tenDV);
            setmoTaTD(res.data.moTaTD);
            setmoTaCT(res.data.moTaCT);
            sethinhThuc(res.data.hinhThuc);
            setdonGia(res.data.donGia);
        })
        .catch(err => console.log(err));
    }, [idDV]);

    function onReset(){
        var uri = url + "/api/service/" + idDV;
        getData(uri)
        .then(res =>{
            settenDV(res.data.tenDV);
            setmoTaTD(res.data.moTaTD);
            setmoTaCT(res.data.moTaCT);
            sethinhThuc(res.data.hinhThuc);
            setdonGia(res.data.donGia);
        })
        .catch(err => console.log(err));
    }

    const onUpdate = () => {
        if(tenDV === "" || moTaCT === "" || moTaTD === "" ){
            message.error("Please, fill out all fields!");
            return;
        }
        const data = {
            idDV,
            tenDV,
            moTaTD,
            moTaCT,
            hinhThuc,
            donGia
        }
        console.log(data);
        var uri = url + '/api/service/' + idDV;

        putData(uri, data)
        .then(res => {
            console.log("res upd: ", res);
            message.success("Update successfully, wait a few seconds", 3).then(()=>{
                props.propsParent.history.push('/admin/service/');
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
                                <Link to="/admin/service">
                                    <Button className="btn-close" id="btnAdd">
                                        <ImCancelCircle style={{ color: 'black' }} className="icon-top" />
                                    </Button>
                                </Link>
                            </Tooltip>
                        </Col>
                        <Col xs={20} md={20} lg={20}>
                            <h1 className="text-center"><b>UPDATE SERVICE</b></h1>
                        </Col>
                        <Col xs={2} md={2} lg={2} />
                    </Row>
                    <Form>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>Service title:</b></Col>
                            <Col xs={18} md={18} lg={18}>
                                <Input name="tenDV" value={tenDV} onChange={ e => settenDV(e.target.value) } placeholder="Service title" />
                            </Col>
                        </Row>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>Title description:</b></Col>
                            <Col xs={18} md={18} lg={18}><Input name="moTaTD" value={moTaTD} onChange={ e => setmoTaTD(e.target.value) } placeholder="Title description" /></Col>
                        </Row>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>Detail description:</b></Col>
                            <Col xs={18} md={18} lg={18}><Input name="moTaCT" value={moTaCT} onChange={ e => setmoTaCT(e.target.value) } placeholder="Detail description" /></Col>
                        </Row>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>Price:</b></Col>
                            <Col xs={18} md={18} lg={18}><Input type="number" min={1} max={6} name="donGia" value={donGia} onChange={ e => setdonGia(e.target.value) } placeholder="Price" /></Col>
                        </Row>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>Type:</b></Col>
                            <Col xs={18} md={18} lg={18}>
                                <Select onChange={ value => sethinhThuc(value) } defaultValue="1" style={{width: 200}} value={hinhThuc === 1 ? 'Per booking' : (hinhThuc === 2 ? 'Per person per date' : 'Free')}>
                                    <Option value="1">Per booking</Option>
                                    <Option value="2">Per person per date</Option>
                                    <Option value="3">Free</Option>
                                </Select>
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
