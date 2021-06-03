import React from 'react'
import Sidebar from '../../Common/Sidebar/Sidebar';
import { Row, Col, Table, Button, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { GrAdd } from 'react-icons/gr';
import { BiDetail } from 'react-icons/bi';

import './Service.css'
import NavbarTop from '../../Common/Navigation/NavbarTop';
import { Link } from 'react-router-dom';

//Tạm sd http nhưng ko đúng ý nghĩa
import { url } from '../../../../Api/url';
const http = url;

export default function Service() {
    const [dataServices, setdataServices] = useState([]);

    useEffect(() => {
        try {
            const loadService = async () =>  {
                var url = http + '/api/service/';
                const result = await axios.get(url)
                .then(res => res.data)
                .catch(err => console.log(err));

                setdataServices(result);
            };
            loadService();
        } catch (error) {
            console.log('Error => get data Service in Service Page: ', error);
        }
    }, []);
    
    const columns = [
        {
            title: '#',
            dataIndex: 'idDV',

        },
        {
            title: 'Title',
            dataIndex: 'tenDV',
        },
        {
            title: 'Type',
            dataIndex: 'hinhThuc',
            render: hinhThuc => (
                hinhThuc === 1 ? 'per booking' : (hinhThuc === 2 ? 'per person per date' : 'free')
            )
        },
        {
            title: 'Price',
            dataIndex: 'donGia',
        },
        {
            title: 'Desc Title',
            dataIndex: 'moTaTD',
            render: moTaTD => (
                moTaTD.length > 30 ? moTaTD.slice(0,30)+' ...' : moTaTD 
            )
        },
        {
            title: 'Desc Detail',
            dataIndex: 'moTaCT',
            render: moTaCT => (
                moTaCT.length > 30 ? moTaCT.slice(0,30)+' ...' : moTaCT 
            )
        },
        {
            title: 'Actions',
            render: (record) => (
                <>
                    <Link to={ '/admin/service/' + record.idDV }><Button className="btn-detail"><BiDetail/></Button></Link>
                    <Link to={ '/admin/service/' + record.idDV }><Button className="btn-edit"><FaRegEdit/></Button></Link>
                    <Link to={ '/admin/service/' + record.idDV }><Button className="btn-delete"><RiDeleteBin5Line/></Button></Link>
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
                    <div style={{ height: '3vh' }} />
                    <Row>
                        <Col xs={2} md={2} lg={2} />
                        <Col xs={20} md={20} lg={20}>
                            <Row>
                                <Col xs={2} md={2} lg={2}>
                                    <Tooltip placement="right" title="Thêm Loại Phòng">
                                        <Link to="/admin/service-add">
                                            <Button className="btn-add" id="btnAdd">
                                                <GrAdd className="icon-top" />
                                            </Button>
                                        </Link>
                                    </Tooltip>
                                </Col>
                                <Col xs={20} md={20} lg={20}>
                                    <h1 className="text-center"><b>LIST OF SERVICES</b></h1>
                                </Col>
                                <Col xs={2} md={2} lg={2}/>
                            </Row>
                            <Table 
                                columns={ columns } 
                                dataSource={ dataServices } 
                                pagination={{ pageSize: 4, position: ['topRight', 'none'] }}
                                // scroll={{ x: 1080 }}                                                  
                            />
                        </Col>
                        <Col xs={2} md={2} lg={2} />
                    </Row>
                </Col>
            </Row>
        </>
    )
}
