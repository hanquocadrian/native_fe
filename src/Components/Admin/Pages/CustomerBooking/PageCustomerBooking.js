import { Col, Row, Table } from 'antd';
import { getData } from 'Api/api';
import { url } from 'Api/url';
import NavbarTop from 'Components/Admin/Common/Navigation/NavbarTop';
import Sidebar from 'Components/Admin/Common/Sidebar/Sidebar';
import React, { useEffect, useState } from 'react';
import { urnKhd } from 'Api/urn';

function PageCustomerBooking(props) {
    const [dataCustomerBooking, setdataCustomerBooking] = useState([]);


    useEffect(() => {
       var uri = url + urnKhd;
       getData(uri)
       .then(res => setdataCustomerBooking(res.data));
    }, []);


    const columns = [
        {
            title: '#',
            dataIndex: 'idKHD',
            sorter: {
                compare: (a, b) => a.idKHD - b.idKHD
            },
            align: 'center'
        },
        {
            title: 'Name',
            dataIndex: 'tenKH',
            align: 'center'
        },
        {
            title: 'Phone num',
            dataIndex: 'sdt', 
            render: sdt => (
                <>
                    {
                        sdt == null ? (
                            <span>.....</span>
                        ) : (
                            <span>{sdt}</span>
                        )
                    }
                </>
            ),
            align: 'center'
        },
        {
            title: 'Identity card',
            dataIndex: 'CMND',
            render: CMND => (
                <>
                    {
                        CMND == null ? (
                            <span>.....</span>
                        ) : (
                            <span>{CMND}</span>
                        )
                    }
                </>
            ),
            align: 'center'
        },
        {
            title: 'Passport',
            dataIndex: 'Passport',
            render: Passport => (
                <>
                    {
                        Passport == null ? (
                            <span>.....</span>
                        ) : (
                            <span>{Passport}</span>
                        )
                    }
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
                        <Col xs={2} md={2} lg={2} />
                        <Col xs={20} md={20} lg={20}>
                        <Row>
                            <Col xs={2} md={2} lg={2}/>
                            <Col xs={20} md={20} lg={20}>
                                <h1 className="text-center"><b>LIST OF CUSTOMER BOOKING</b></h1>
                            </Col>
                            <Col xs={2} md={2} lg={2} />
                        </Row>
                            <Table
                                columns={ columns } 
                                dataSource={ dataCustomerBooking } 
                                pagination={{ pageSize: 7, position: ['topRight', 'none'] }} 
                                scroll={{ x: 1080 }}
                            />
                        </Col>
                        <Col xs={2} md={2} lg={2} />
                    </Row>
                </Col>
            </Row>
        </>
    )
}

export default PageCustomerBooking

