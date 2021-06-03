import React from 'react'
import Sidebar from '../../Common/Sidebar/Sidebar';
import { Row, Col, Table, Button } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";

import './ServiceImage.css'
import NavbarTop from '../../Common/Navigation/NavbarTop';
import { Link } from 'react-router-dom';

//Tạm sd http nhưng ko đúng ý nghĩa
import { url } from '../../../../Api/url';
const http = url;

export default function ServiceImage() {
    const [dataServiceImages, setdataServiceImages] = useState([]);
    const [service, setService] = useState([]);

    useEffect(() => {
        try {
            const loadServiceImage = async () =>  {
                var url = http + '/api/imageservice/';
                const result = await axios.get(url)
                .then(res => res.data)
                .catch(err => console.log(err));

                setdataServiceImages(result);
            };
            loadServiceImage();
        } catch (error) {
            console.log('Error => get data Service images: ', error);
        }
    }, []);

    useEffect(() => {
        try {
            const getServices = async () =>  {
                var url = http + '/api/service/';
                const result = await axios.get(url)
                .then(res => res.data)
                .catch(err => console.log(err));

                setService(result);
            };
            getServices();
        } catch (error) {
            console.log('Error => get data Service: ', error);
        }
    }, []);
    
    const columns = [
        {
            title: '#',
            dataIndex: 'idHinhDV',

        },
        {
            title: 'Image',
            dataIndex: 'hinhAnh',
            render: hinhAnh => (
                <img src={hinhAnh} alt="not found" style={{ width:"12.5vw", height:"17.5vh"}}/>
            )
        },
        {
            title: 'Service Title',
            dataIndex: 'idDV',
            render: idDV => (
                service.map((item, index) => 
                    item.idDV === idDV && item.tenDV
                )
            )
        },
        {
            title: 'Actions',
            render: (record) => (
                <>
                    <Row>
                        <Col xs={24} md={12} lg={12}>
                            <Link to={ '/admin/imageservice/' + record.idHinhDV }><Button type="primary" ><FaRegEdit/></Button></Link>
                        </Col>
                        <Col xs={24} md={12} lg={12}>
                            <Link to={ '/admin/imageservice/' + record.idHinhDV }><Button type="primary" danger><RiDeleteBin5Line/></Button></Link>
                        </Col>
                    </Row>
                </>
            )
        }
    ];

    return (
        <>
            <NavbarTop />
            <Row>
                <Col span={5}>
                    <Sidebar />
                </Col>
                <Col span={19}>
                    <Row  style={{paddingTop:"2%"}}>
                        <Col xs={2} md={2} lg={2} />
                        <Col xs={20} md={20} lg={20}>
                        <h2 className="text-center"><b>LIST OF SERVICE IMAGES</b></h2>
                            <Table 
                                columns={ columns } 
                                dataSource={ dataServiceImages } 
                                pagination={{ pageSize: 3, position: ['topRight', 'none'] }}
                            />
                        </Col>
                        <Col xs={2} md={2} lg={2} />
                    </Row>
                </Col>
            </Row>
        </>
    )
}
