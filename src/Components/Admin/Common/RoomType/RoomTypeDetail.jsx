import { Button, Col, Descriptions, Rate, Row, Tooltip, Carousel } from 'antd';
import React from 'react'
import { useState, useEffect } from 'react';
import { ImCancelCircle } from 'react-icons/im';
import { Link } from 'react-router-dom';
import { url } from '../../../../Api/url';
import { getData } from 'Api/api';
import { urnRoomTypeID, urnRoomTypeImageIDLP } from 'Api/urn';

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

    const [dataRoomTypeImages, setdataRoomTypeImages] = useState([])

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
    useEffect(() => {
        try {
            var uri = url + urnRoomTypeImageIDLP(idLP);
            getData(uri)
            .then(res => {
                setdataRoomTypeImages(res.data);
            })
            .catch(err => console.log(err));
        } catch (error) {
            console.error(error);
        }
    }, [])

    return (
        <>
            <div style={{ height: '3vh' }} />
            <Row >
                <Col xs={2} md={2} lg={2} />
                <Col xs={20} md={20} lg={20}>
                    <Row>
                        <Col xs={2} md={2} lg={2}>
                            <Tooltip placement="right" title="Back">
                                <Link to="/admin/roomtype">
                                    <Button className="btn-close" id="btnAdd">
                                        <ImCancelCircle style={{ color: 'black' }} className="icon-top" />
                                    </Button>
                                </Link>
                            </Tooltip>
                        </Col>
                        <Col xs={20} md={20} lg={20}>
                            <h1 className="text-center"><b>INFORMATION ROOM TYPE</b></h1>
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
                                <Descriptions.Item labelStyle={{fontWeight: 'bolder', width: '150px' }} label="ID Room type">{idLP}</Descriptions.Item>
                                <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="Room type title">{tenLP}</Descriptions.Item>
                                <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="Room type rate"><Rate allowHalf disabled value={hangPhong} onChange={ value => sethangPhong(value) } /></Descriptions.Item>
                                <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="Detail description" span={3}>{moTaCT}</Descriptions.Item>
                                <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="Intro description" span={3}>{moTaGT}</Descriptions.Item>
                                <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="Title description" span={3}>{moTaTD}</Descriptions.Item>
                                <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="Number of guest(s)">{soNguoi}</Descriptions.Item>
                                <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="Number of bed(s)">{giuong}</Descriptions.Item>
                                <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="Number of bathroom(s)">{phongTam}</Descriptions.Item>
                                <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="Number of room(s)">{soLuong}</Descriptions.Item>
                                <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="Number of rooms available">{slHienTai}</Descriptions.Item>
                            </Descriptions>
                        </Row>
                        {
                            dataRoomTypeImages != null && 
                                <>
                                    <div style={{ height: '3vh' }} />
                                    <Row justify="center">
                                        <Col xs={24} md={24} lg={24}><h3><b>Room type images</b></h3></Col>
                                    </Row>
                                    <div style={{ height: '3vh' }} />    
                                </>
                        }
                        
                        <Row>
                            <Col xs={5} md={5} lg={5} />
                            <Col xs={19} md={19} lg={19}>
                                <Carousel autoplay>
                                    {
                                        dataRoomTypeImages && dataRoomTypeImages.map((item, index) => 
                                            <div key={ index }>
                                                <img src={ item.hinhAnh } alt="not found" style={{ width: "auto", height: "50vh" }} />
                                            </div>
                                        )
                                    }
                                </Carousel>
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col xs={2} md={2} lg={2} />
            </Row>

        </>
    )
}

export default RoomTypeDetail