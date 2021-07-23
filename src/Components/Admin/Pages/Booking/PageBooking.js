import React from 'react'
import Sidebar from '../../Common/Sidebar/Sidebar';
import { Row, Col, Table, Button, Tooltip, Tag } from 'antd';
import { SyncOutlined, CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

import { BiDetail } from 'react-icons/bi';

import NavbarTop from '../../Common/Navigation/NavbarTop';
import { Link } from 'react-router-dom';

import { url } from '../../../../Api/url';
import { getData } from 'Api/api';
import { urnBooking } from 'Api/urn';
import { format } from 'date-fns';
import CurrencyFormat from 'react-currency-format';

export default function PageBooking(props) {
    const [dataBooking, setdataBooking] = useState([]);

    useEffect(() => {
        var uri = url + urnBooking;
        getData(uri)
        .then(resBooking => {
            setdataBooking(resBooking.data);
        });
    }, []);

    const columns = [
        {
            title: 'id',
            dataIndex: 'idDDP',
            align: 'center'
        },
        {
            title: 'Arrive date',
            dataIndex: 'ngayDen',
            render: ngayDen => (
                <>{ format(new Date(ngayDen), 'dd/MM/yyyy') }</>
            ),
            align: 'center'
        },
        {
            title: 'End date',
            dataIndex: 'ngayDi',
            render: ngayDi => (
                <>{ format(new Date(ngayDi), 'dd/MM/yyyy') }</>
            ),
            align: 'center'
        },
        {
            title: 'Night(s)',
            dataIndex: 'soDem',
            align: 'center'
        },
        {
            title: 'Booking date',
            dataIndex: 'ngayDatPhong',
            render: ngayDatPhong => (
                <>{ format(new Date(ngayDatPhong), 'dd/MM/yyyy') }</>
            ),
            align: 'center'
        },
        {
            title: 'Total price',
            dataIndex: 'tongThanhTien',
            render: tongThanhTien => (
                <>
                    <CurrencyFormat value={tongThanhTien} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                </>
            ),
            align: 'center'
        },
        {
            title: 'Status',
            dataIndex: 'trangThaiDat',
            render: trangThaiDat => (
                <>
                    {
                        trangThaiDat === 1 ? <Tag icon={<CloseCircleOutlined/>} color="error">Cancelled</Tag> : 
                        (
                            trangThaiDat === 2 
                            ? <Tag icon={<CheckCircleOutlined/>} color="success">Completed</Tag> 
                            : <Tag icon={<SyncOutlined spin />} color="processing">Processing</Tag>
                        )
                    }
                </>
            ),
            align: 'center'
        },
        {
            title: 'Action',
            render: (record) => (
                <>
                    <Link to={ '/admin/booking-detail/' + record.idDDP }><Tooltip placement="top" title="Detail"><Button className="btn-detail"><BiDetail/></Button></Tooltip></Link>
                </>
            )
        }
    ];

    return (
        <>
            <NavbarTop props={props} />
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
                                <Col xs={2} md={2} lg={2}/>
                                <Col xs={20} md={20} lg={20}>
                                    <h1 className="text-center"><b>LIST OF BOOKING</b></h1>
                                </Col>
                                <Col xs={2} md={2} lg={2}/>
                            </Row>
                            <Table 
                                columns={ columns } 
                                dataSource={ dataBooking } 
                                pagination={{ pageSize: 7, position: ['topRight', 'none'] }}
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