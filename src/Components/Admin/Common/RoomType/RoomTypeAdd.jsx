import React from 'react'
import { Row, Col, Form, Input, Tooltip, Button, Rate, Radio, message } from 'antd';
import { Link } from 'react-router-dom';
import { ImCancelCircle } from 'react-icons/im';
import { useState } from 'react';
import { url } from '../../../../Api/url';
import { postData } from 'Api/api';

export default function RoomTypeAdd() {
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

    function onReset(){
        settenLP('');
        setmoTaCT('');
        setmoTaGT('');
        setmoTaTD('');
        sethangPhong(1);
        setsoNguoi(1);
        setgiuong(1);
        setphongTam(1);
    }

    const onCreate = () => {
        if(tenLP == "" || moTaCT == "" || moTaGT == "" || moTaTD == "" ){
            message.error("Please, fields cannot be left blank!");
            return;
        }
        const data = {
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
        var uri = url + '/api/roomtype/';
        postData(uri, data)
        .then(res=>{
            console.log("res add: ", res.data);
            message.success("Create data successful, this page will refesh a few moments later", 3).then(()=>{
                onReset();
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
                            <Tooltip placement="right" title="Trở về">
                                <Link to="/admin/roomtype">
                                    <Button className="btn-close" id="btnAdd">
                                        <ImCancelCircle style={{ color: 'black' }} className="icon-top" />
                                    </Button>
                                </Link>
                            </Tooltip>
                        </Col>
                        <Col xs={20} md={20} lg={20}>
                            <h1 className="text-center"><b>THÊM LOẠI PHÒNG</b></h1>
                        </Col>
                        <Col xs={2} md={2} lg={2} />
                    </Row>
                    <Form>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>ID loại phòng:</b></Col>
                            <Col xs={18} md={18} lg={18}><Input name="idLP" placeholder="idLP" disabled /></Col>
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
