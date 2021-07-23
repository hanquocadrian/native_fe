import React from 'react'
import { Row, Col, Form, Input, Tooltip, Button, Rate, Radio, message, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import { ImCancelCircle } from 'react-icons/im';
import { useState, useEffect } from 'react';
import { url } from '../../../../Api/url';
import { putData, getData } from 'Api/api';
import { urnRoomTypeID } from 'Api/urn';


function RoomTypeUpd(props) {
    const idLP = props.idLP;
    const [tenLP, settenLP] = useState('');
    const [moTaCT, setmoTaCT] = useState('');
    const [moTaGT, setmoTaGT] = useState('');
    const [moTaTD, setmoTaTD] = useState('');
    const [hangPhong, sethangPhong] = useState(1);
    const [soNguoi, setsoNguoi] = useState(1);
    const [giuong, setgiuong] = useState(1);
    const [phongTam, setphongTam] = useState(1);
    const [soLuong, setsoLuong] = useState(0);

    useEffect(() => {
        var uri = url + urnRoomTypeID(idLP);
        getData(uri)
        .then(res => {
            settenLP(res.data.tenLP);
            setmoTaCT(res.data.moTaCT);
            setmoTaGT(res.data.moTaGT);
            setmoTaTD(res.data.moTaTD);
            sethangPhong(res.data.hangPhong);
            setsoNguoi(res.data.soNguoi);
            setgiuong(res.data.giuong);
            setphongTam(res.data.phongTam);
            setsoLuong(res.data.soLuong);
        })
        .catch(err => console.log(err));
    }, [idLP])

    function onReset(){
        var uri = url + urnRoomTypeID(idLP);
        getData(uri)
        .then(res => {
            settenLP(res.data.tenLP);
            setmoTaCT(res.data.moTaCT);
            setmoTaGT(res.data.moTaGT);
            setmoTaTD(res.data.moTaTD);
            sethangPhong(res.data.hangPhong);
            setsoNguoi(res.data.soNguoi);
            setgiuong(res.data.giuong);
            setphongTam(res.data.phongTam);
            setsoLuong(res.data.soLuong);
        })
        .catch(err => console.log(err));
    }

    const onUpdate = () => {
        if(tenLP === "" || moTaCT === "" || moTaGT === "" || moTaTD === "" ){
            message.error("Please, fields cannot be left blank!");
            return;
        }
        const data = {
            idLP,
            tenLP,
            moTaCT,
            moTaGT,
            moTaTD,
            hangPhong,
            soNguoi,
            giuong,
            phongTam,
            soLuong,
        }
        console.log(data);
        var uri = url + urnRoomTypeID(idLP);

        putData(uri, data)
        .then(res => {
            if(res.data){
                console.log("res upd: ", res);
                message.success("Update successfully, this page will redirect a few moments later", 3).then(()=>{
                    props.propsParent.history.push('/admin/roomtype/');
                })
            } else if(res.response.data) {
                console.log(res.response.data);
                if(Array.isArray(res.response.data)){
                    res.response.data.map(err => { 
                        // console.log(err.message);
                        return alert(err.message);
                    })
                } else {
                    alert(res.response.data);
                }
            }
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
                            <Tooltip placement="right" title="Trở về">
                                <Link to="/admin/roomtype">
                                    <Button className="btn-close" id="btnAdd">
                                        <ImCancelCircle style={{ color: 'black' }} className="icon-top" />
                                    </Button>
                                </Link>
                            </Tooltip>
                        </Col>
                        <Col xs={20} md={20} lg={20}>
                            <h1 className="text-center"><b>UPDATE ROOM TYPE</b></h1>
                        </Col>
                        <Col xs={2} md={2} lg={2} />
                    </Row>
                    <Form>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>ID Room type:</b></Col>
                            <Col xs={18} md={18} lg={18}><Input name="idLP" value={idLP} placeholder="ID Room type" disabled /></Col>
                        </Row>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>Room type title:</b></Col>
                            <Col xs={18} md={18} lg={18}>
                                <Input name="tenLP" value={tenLP} onChange={ e => settenLP(e.target.value) } placeholder="Room type title" />
                            </Col>
                        </Row>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>Detail description:</b></Col>
                            <Col xs={18} md={18} lg={18}><Input name="moTaCT" value={moTaCT} onChange={ e => setmoTaCT(e.target.value) } placeholder="Detail description" /></Col>
                        </Row>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>Intro description:</b></Col>
                            <Col xs={18} md={18} lg={18}><Input name="moTaGT" value={moTaGT} onChange={ e => setmoTaGT(e.target.value) } placeholder="Intro description" /></Col>
                        </Row>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>Title description:</b></Col>
                            <Col xs={18} md={18} lg={18}><Input name="moTaTD" value={moTaTD} onChange={ e => setmoTaTD(e.target.value) } placeholder="Title description" /></Col>
                        </Row>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>Room type rate:</b></Col>
                            <Col xs={18} md={18} lg={18}><Rate allowHalf value={hangPhong} onChange={ value => sethangPhong(value) } /></Col>
                        </Row>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>Number of guest(s):</b></Col>
                            <Col xs={18} md={18} lg={18}><Input type="number" min={1} max={6} name="soNguoi" value={soNguoi} onChange={ e => setsoNguoi(e.target.value) } placeholder="Number of guest(s) from 1 to 6" /></Col>
                        </Row>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>Number of bed(s):</b></Col>
                            <Col xs={18} md={18} lg={18}>
                                <Radio.Group onChange={ e => setgiuong(e.target.value) } value={giuong}>
                                    <Radio value={1}>1 bed</Radio>
                                    <Radio value={2}>2 beds</Radio>
                                    <Radio value={3}>3 beds</Radio>
                                    <Radio value={4}>4 beds</Radio>
                                </Radio.Group>
                            </Col>
                        </Row>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>Number of bathroom(s):</b></Col>
                            <Col xs={18} md={18} lg={18}>
                                <Radio.Group onChange={ e => setphongTam(e.target.value) } value={phongTam}>
                                    <Radio value={1}>1 bathroom</Radio>
                                    <Radio value={2}>2 bathrooms</Radio>
                                </Radio.Group>
                            </Col>
                        </Row>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>Number of room(s):</b></Col>
                            <Col xs={18} md={18} lg={18}><Input type="number" min={0} name="soLuong" value={soLuong} onChange={ e => setsoLuong(e.target.value) } disabled /></Col>
                        </Row>
                        <Row justify="end">
                            <Col xs={2} md={2} lg={2}>
                                <Popconfirm
                                    title="Are you sure to reload form?"
                                    onConfirm={ onReset }
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button size="large" className="btn-reset">Reset</Button>
                                </Popconfirm>
                            </Col>
                            <Col xs={2} md={2} lg={2}>
                                <Button size="large" onClick={ onUpdate } className="btn-edit">Update</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
                <Col xs={2} md={2} lg={2} />
            </Row>
        </>
    )
}

export default RoomTypeUpd

