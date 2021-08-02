import React from 'react'
import Sidebar from '../../Common/Sidebar/Sidebar';
import { Row, Col, Table, Button, Tooltip } from 'antd';
import { useEffect, useState } from 'react';

import NavbarTop from '../../Common/Navigation/NavbarTop';
import { Link } from 'react-router-dom';

import { url } from 'Api/url';
import { getData } from 'Api/api';
import { urnBookingService, urnKhdID } from 'Api/urn';
import { format } from 'date-fns';
import CurrencyFormat from 'react-currency-format';
import { GrAdd } from 'react-icons/gr';
import { useSelector } from 'react-redux';

function DisplayCustomer(props) {
    const [tenKH, setTenKH] = useState("");
    
    useEffect(() => {
        var uri = url + urnKhdID(props.KHD.idKHD);
        getData(uri).then(res => setTenKH(res.data[0].tenKH));
    }, [props.KHD]);

    return (
        <>
            { tenKH }
        </>
    )
}

function PageBookingService(props) {
    const phanQuyen = useSelector(state => state.adminAccountReducer.phanQuyen);
    const [dataBookingService, setdataBookingService] = useState([]);

    useEffect(() => {
        var uri = url + urnBookingService;
        getData(uri)
        .then(resBooking => {
            setdataBookingService(resBooking.data);
        });
    }, []);

    const columns = [
        {
            title: '#',
            dataIndex: 'idDDDV',
            sorter: {
                compare: (a, b) => a.idDDDV - b.idDDDV
            },
            align: 'center'
        },
        {
            title: 'Date booking',
            dataIndex: 'ngayDat',
            sorter: {
                compare: (a, b) => a.ngayDat - b.ngayDat
            },
            render: ngayDat => (
                <>{ format(new Date(ngayDat), 'dd/MM/yyyy') }</>
            ),
            align: 'center'
        },
        {
            title: 'Total cost',
            dataIndex: 'tongThanhTien',
            render: tongThanhTien => (
                <>
                    <CurrencyFormat value={tongThanhTien} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                </>
            ),
            align: 'center'
        },
        {
            title: 'id RRC',
            dataIndex: 'idPTP',
            sorter: {
                compare: (a, b) => a.idPTP - b.idPTP
            },
            align: 'center'
        },
        {
            title: 'Customer Booking',
            render: record => (
                <DisplayCustomer KHD={record} />
            ),
            align: 'center'
        },
        {
            title: 'Action',
            render: (record) => (
                <>
                    <Link to={ '/admin/booking-service-detail/' + record.idDDDV }><Button className="btn-detail">DETAIL</Button></Link>
                </>
            ),
            align: 'center'
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
                        <Col xs={2} md={2} lg={2}/>
                        <Col xs={20} md={20} lg={20}>
                            <Row>
                                <Col xs={2} md={2} lg={2}>
                                    {
                                        phanQuyen === 3 && (
                                            <Tooltip placement="right" title="Create new one">
                                                <Link to="/admin/booking-service-add">
                                                    <Button className="btn-add" id="btnAdd">
                                                        <GrAdd className="icon-top" />
                                                    </Button>
                                                </Link>
                                            </Tooltip>
                                        )
                                    }
                                </Col>
                                <Col xs={20} md={20} lg={20}>
                                    <h1 className="text-center"><b>LIST OF BOOKING SERVICES</b></h1>
                                </Col>
                                <Col xs={2} md={2} lg={2}/>
                            </Row>
                            <Table 
                                columns={ columns } 
                                dataSource={ dataBookingService } 
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

export default PageBookingService

