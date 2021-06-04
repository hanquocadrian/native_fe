import React from 'react'
import { Button, Col, Descriptions, Row, Tooltip, Image, Space, Divider } from 'antd';
import { useState, useEffect } from 'react';
import { ImCancelCircle } from 'react-icons/im';
import { Link } from 'react-router-dom';
import { url } from '../../../../Api/url';
import { getData } from 'Api/api';

export default function ServiceDetail(props) {
    const [idDV, setidDV] = useState(props.idDV);
    const [tenDV, settenDV] = useState('');
    const [moTaTD, setmoTaTD] = useState('');
    const [moTaCT, setmoTaCT] = useState('');
    const [hinhThuc, sethinhThuc] = useState('');
    const [donGia, setdonGia] = useState(0);
    const [imageService, setimageService] = useState([]);

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
    }, []);

    useEffect(() => {
        var uri = url + "/api/service-image/get_by_iddv/" + idDV;
        getData(uri)
        .then(res =>{
            setimageService(res.data);
        })
        .catch(err => console.log(err));
    }, []);

    return (
        <>
            <div style={{ height: '3vh' }} />
            <Row >
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
                            <h1 className="text-center"><b>INFORMATION SERVICES</b></h1>
                        </Col>
                        <Col xs={2} md={2} lg={2} />
                    </Row>
                    <div style={{height: '80vh', overflow: "scroll"}}>
                        <Row>
                            <Descriptions
                                title={tenDV}
                                bordered
                                column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                            >
                                <Descriptions.Item labelStyle={{fontWeight: 'bolder', width: '150px' }} label="ID Service">{idDV}</Descriptions.Item>
                                <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="Service title">{tenDV}</Descriptions.Item>
                                <br/>
                                <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="Price">{donGia} $</Descriptions.Item>
                                <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="Type">{hinhThuc == 1 ? "Per booking" : (hinhThuc == 2 ? "Per person per date" : "Free")}</Descriptions.Item>
                                <br/>
                                <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="Description title" span={3}>{moTaTD}</Descriptions.Item>
                                <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="Description detail" span={3}>{moTaCT}</Descriptions.Item>
                                <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="Images" span={3}>
                                    <Space split={<Divider type="vertical" />}>
                                        {imageService.map((item, index) => 
                                            <Image
                                                key={index}
                                                width={100}
                                                src={item.hinhAnh}
                                            />
                                        )}
                                    </Space>
                                </Descriptions.Item>
                            </Descriptions>
                        </Row>
                    </div>
                </Col>
                <Col xs={2} md={2} lg={2} />
            </Row>
        </>
    )
}
