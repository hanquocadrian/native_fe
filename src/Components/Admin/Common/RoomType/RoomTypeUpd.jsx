import React from 'react'
import { Row, Col, Form, Input, Tooltip, Button, Rate, Radio, message, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import { ImCancelCircle } from 'react-icons/im';
import { useState, useEffect } from 'react';
import { url } from '../../../../Api/url';
import { putData, getData } from 'Api/api';
import { urnRoomTypeID } from 'Api/urn';


function RoomTypeUpd(props) {
    const [idLP, setidLP] = useState(props.idLP);
    const [tenLP, settenLP] = useState('');
    const [moTaCT, setmoTaCT] = useState('');
    const [moTaGT, setmoTaGT] = useState('');
    const [moTaTD, setmoTaTD] = useState('');
    const [hangPhong, sethangPhong] = useState(1);
    const [soNguoi, setsoNguoi] = useState(1);
    const [giuong, setgiuong] = useState(1);
    const [phongTam, setphongTam] = useState(1);
    const [soLuong, setsoLuong] = useState(0);
    const [slHienTai, setslHienTai] = useState(0);

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
            setslHienTai(res.data.slHienTai);
        })
        .catch(err => console.log(err));
    }, [])

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
            setslHienTai(res.data.slHienTai);
        })
        .catch(err => console.log(err));
    }

    const onUpdate = () => {
        if(tenLP == "" || moTaCT == "" || moTaGT == "" || moTaTD == "" ){
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
            slHienTai
        }
        console.log(data);
        var uri = url + urnRoomTypeID(idLP);

        putData(uri, data)
        .then(res => {
            console.log("res upd: ", res);
            message.success("Update data successful, this page will redirect a few moments later", 3).then(()=>{
                props.propsParent.history.push('/admin/roomtype/');
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
                            <Tooltip placement="right" title="Trở về">
                                <Link to="/admin/roomtype">
                                    <Button className="btn-close" id="btnAdd">
                                        <ImCancelCircle style={{ color: 'black' }} className="icon-top" />
                                    </Button>
                                </Link>
                            </Tooltip>
                        </Col>
                        <Col xs={20} md={20} lg={20}>
                            <h1 className="text-center"><b>CẬP NHẬT LOẠI PHÒNG</b></h1>
                        </Col>
                        <Col xs={2} md={2} lg={2} />
                    </Row>
                    <Form>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>ID loại phòng:</b></Col>
                            <Col xs={18} md={18} lg={18}><Input name="idLP" value={idLP} placeholder="idLP" disabled /></Col>
                        </Row>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>Tên loại phòng:</b></Col>
                            <Col xs={18} md={18} lg={18}>
                                <Input name="tenLP" value={tenLP} onChange={ e => settenLP(e.target.value) } placeholder="Tên của loại phòng" />
                            </Col>
                        </Row>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>Mô tả chi tiết:</b></Col>
                            <Col xs={18} md={18} lg={18}><Input name="moTaCT" value={moTaCT} onChange={ e => setmoTaCT(e.target.value) } placeholder="Mô tả chi tiết cho loại phòng" /></Col>
                        </Row>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>Mô tả giới thiệu:</b></Col>
                            <Col xs={18} md={18} lg={18}><Input name="moTaGT" value={moTaGT} onChange={ e => setmoTaGT(e.target.value) } placeholder="Mô tả giới thiệu bên ngoài cho loại phòng" /></Col>
                        </Row>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>Mô tả tiêu đề:</b></Col>
                            <Col xs={18} md={18} lg={18}><Input name="moTaTD" value={moTaTD} onChange={ e => setmoTaTD(e.target.value) } placeholder="Mô tả tiêu đề bên trên cho loại phòng" /></Col>
                        </Row>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>Hạng của loại phòng:</b></Col>
                            <Col xs={18} md={18} lg={18}><Rate allowHalf value={hangPhong} onChange={ value => sethangPhong(value) } /></Col>
                        </Row>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>Số người:</b></Col>
                            <Col xs={18} md={18} lg={18}><Input type="number" min={1} max={6} name="soNguoi" value={soNguoi} onChange={ e => setsoNguoi(e.target.value) } placeholder="Số người từ 1 đến 6" /></Col>
                        </Row>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>Số giường:</b></Col>
                            <Col xs={18} md={18} lg={18}>
                                <Radio.Group onChange={ e => setgiuong(e.target.value) } value={giuong}>
                                    <Radio value={1}>1 Giường</Radio>
                                    <Radio value={2}>2 Giường</Radio>
                                    <Radio value={3}>3 Giường</Radio>
                                    <Radio value={4}>4 Giường</Radio>
                                </Radio.Group>
                            </Col>
                        </Row>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>Số phòng tắm:</b></Col>
                            <Col xs={18} md={18} lg={18}>
                                <Radio.Group onChange={ e => setphongTam(e.target.value) } value={phongTam}>
                                    <Radio value={1}>1 Phòng tắm</Radio>
                                    <Radio value={2}>2 Phòng tắm</Radio>
                                </Radio.Group>
                            </Col>
                        </Row>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>Số lượng phòng:</b></Col>
                            <Col xs={18} md={18} lg={18}><Input type="number" min={0} name="soLuong" value={soLuong} onChange={ e => setsoLuong(e.target.value) } disabled /></Col>
                        </Row>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>Số lượng phòng hiện tại:</b></Col>
                            <Col xs={18} md={18} lg={18}><Input type="number" min={0} name="slHienTai" value={slHienTai} onChange={ e => setslHienTai(e.target.value) } disabled /></Col>
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

