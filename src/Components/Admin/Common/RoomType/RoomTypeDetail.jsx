import { Button, Col, Descriptions, Rate, Row, Tooltip } from 'antd';
import React from 'react'
import { useState, useEffect } from 'react';
import { ImCancelCircle } from 'react-icons/im';
import { Link } from 'react-router-dom';
import { url } from '../../../../Api/url';
import { getData } from 'Api/api';

function RoomTypeDetail(props) {
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
        var uri = url + "/api/roomtype/" + idLP;
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

    return (
        <>
            <div style={{ height: '3vh' }} />
            <Row >
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
                            <h1 className="text-center"><b>THÔNG TIN LOẠI PHÒNG</b></h1>
                        </Col>
                        <Col xs={2} md={2} lg={2} />
                    </Row>
                    <div style={{height: '80vh', overflow: "scroll"}}>
                        <Row>
                            <Descriptions
                                title={tenLP}
                                bordered
                                column={{ xxl: 3, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                            >
                                <Descriptions.Item labelStyle={{fontWeight: 'bolder', width: '150px' }} label="ID loại phòng">{idLP}</Descriptions.Item>
                                <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="Tên loại phòng">{tenLP}</Descriptions.Item>
                                <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="Hạng của loại phòng"><Rate allowHalf disabled value={hangPhong} onChange={ value => sethangPhong(value) } /></Descriptions.Item>
                                <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="Mô tả chi tiết" span={3}>{moTaCT}</Descriptions.Item>
                                <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="Mô tả giới thiệu" span={3}>{moTaGT}</Descriptions.Item>
                                <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="Mô tả tiêu đề" span={3}>{moTaTD}</Descriptions.Item>
                                <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="Số người">{soNguoi}</Descriptions.Item>
                                <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="Số giường">{giuong}</Descriptions.Item>
                                <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="Số phòng tắm">{phongTam}</Descriptions.Item>
                                <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="Số lượng phòng">{soLuong}</Descriptions.Item>
                                <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="Số lượng phòng hiện tại">{slHienTai}</Descriptions.Item>
                            </Descriptions>
                        </Row>
                        <Row>

                        </Row>
                    </div>
                </Col>
                <Col xs={2} md={2} lg={2} />
            </Row>

        </>
    )
}

export default RoomTypeDetail