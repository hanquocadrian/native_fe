import { Button, Col,  Row, Table } from 'antd';
import { getData } from 'Api/api';
import { url } from 'Api/url';
import NavbarTop from 'Components/Admin/Common/Navigation/NavbarTop';
import Sidebar from 'Components/Admin/Common/Sidebar/Sidebar';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { urnBill } from 'Api/urn';
import { format } from 'date-fns';
import CurrencyFormat from 'react-currency-format';

function PageBill(props) {
    const [dataBills, setDataBills] = useState([]);

    useEffect(() => {
        var uri = url + urnBill;
        getData(uri)
        .then(res => {
            console.log(res.data);
            setDataBills(res.data); 
        });
    }, []);
    
    const columns = [
        {
            title: '#',
            dataIndex: 'idPTT',
            sorter: {
                compare: (a, b) => a.idPTT - b.idPTT
            },
            align: 'center',
            fixed: 'left',
            width: 50
        },
        {
            title: 'id booking',
            dataIndex: 'idDDP',
            sorter: {
                compare: (a, b) => a.idDDP - b.idDDP
            },
            align: 'center',
            width: 150
        },
        {
            title: 'id customer',
            dataIndex: 'idKHD',
            sorter: {
                compare: (a, b) => a.idKHD - b.idKHD
            },
            align: 'center',
            width: 150
        },
        {
            title: 'Date of issue',
            dataIndex: 'ngayThanhToan',
            render: ngayThanhToan => (
                <>{ format(new Date(ngayThanhToan), 'dd/MM/yyyy') }</>
            ),
            align: 'center',
            width: 200
        },
        {
            title: 'Status',
            dataIndex: 'tinhTrang',
            sorter: {
                compare: (a, b) => a.tinhTrang - b.tinhTrang
            },
            render: tinhTrang => (
                <>{tinhTrang === 1 ? 'Unpaid' : tinhTrang === 2 ? 'Deposited' : tinhTrang === 3 ? 'Paid' : 'Canceled'}</>
            ),
            align: 'center',
            width: 140
        },
        {
            title: 'Total Price',
            render: record => {
                var money = record.tongTienConLai + record.tienCoc;
                return (
                    <>
                        <CurrencyFormat value={money} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                    </>
                )
            },
            align: 'center',
            width: 250
        },
        {
            title: 'Start date',
            dataIndex: 'ngayDen',
            render: ngayDen => (
                <>{ format(new Date(ngayDen), 'dd/MM/yyyy') }</>
            ),
            align: 'center',
            width: 200
        },
        {
            title: 'End date',
            dataIndex: 'ngayDi',
            render: ngayDi => (
                <>{ format(new Date(ngayDi), 'dd/MM/yyyy') }</>
            ),
            align: 'center',
            width: 200
        }, 
        {
            title: 'Action',
            width: 150,
            align: 'center',
            fixed: 'right',
            render: (record) => (
                <>
                    <Link to={ '/admin/bill-detail/' + record.idPTT }><Button className="btn-detail">Detail</Button></Link>
                </>
            )
        },
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
                                <Col xs={2} md={2} lg={2} />
                                <Col xs={20} md={20} lg={20}>
                                    <h1 className="text-center"><b>LIST OF BILL</b></h1>
                                </Col>
                                <Col xs={2} md={2} lg={2} />
                            </Row>
                            <Table
                                columns={ columns } 
                                dataSource={ dataBills } 
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

export default PageBill

