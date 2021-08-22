import { Button, Col, Row, Table } from 'antd'
import { getData } from 'Api/api';
import { url } from 'Api/url';
import { urnBillsByIDKHD } from 'Api/urn';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import CurrencyFormat from 'react-currency-format';
import BtnDeposit from '../Button/BtnDeposit';
import { Link } from 'react-router-dom';

function Bill(props) {
    const idKHD = useSelector(state => state.customerAccountReducer.idKHD);
    const [dataBillsOfIDCus, setDataBillsOfIDCus] = useState([]);
    const [isRefesh, setIsRefesh] = useState(false);

    useEffect(() => {
        var uri = url + urnBillsByIDKHD(idKHD);
        getData(uri).then(res => setDataBillsOfIDCus(res.data));
    },[isRefesh, idKHD]);


    const onRefesh = (rf = false) => {
        // console.log("onRefesh", isRefesh);
        setIsRefesh(rf);
    }

    const columns = [
        {
            title: '#',
            dataIndex: 'idPTT',
            sorter: {
                compare: (a, b) => a.idPTT - b.idPTT
            },
            align: 'center',
            width: 150
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
            title: 'Pay',
            width: 200,
            align: 'center',
            render: (record) => (
                <>
                    { 
                        record.tinhTrang === 1 && (
                            <BtnDeposit bill={record} onRefesh={onRefesh} onCanUpdateRooms={()=>{}} />
                        ) 
                    }
                    {
                        record.tinhTrang === 2 && (
                            <>
                                <b><i>Wait pay at hotel</i></b>
                            </>
                        )
                    }
                </>
            )
        },
        {
            title: 'Action',
            width: 200,
            align: 'center',
            fixed: 'right',
            render: (record) => (
                <Link to={'/user/bill-details/' + record.idPTT}>
                    <Button className="btn-detail">Details</Button>
                </Link>
            )
        }
    ];

    return (
        <>
            <Row style={{ fontFamily: 'Georgia' }}>
                <Col xs={2} md={2} lg={4}></Col>
                <Col xs={20} md={20} lg={16}><h1><b>THE INVOICES BOOKING ROOM</b></h1></Col>
                <Col xs={2} md={2} lg={4}></Col>
            </Row>
            <Row>
                <Col xs={2} md={2} lg={2}></Col>
                <Col xs={20} md={20} lg={20}>
                    <Table 
                        columns={ columns }
                        dataSource={ dataBillsOfIDCus }
                        pagination={{ pageSize: 7, position: ['topRight', 'none'] }} 
                        scroll={{ x: 1400 }}
                    />
                </Col>
                <Col xs={2} md={2} lg={2}></Col>
            </Row>
        </>
    )
}

export default Bill

