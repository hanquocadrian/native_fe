import React from 'react'
import { Row, Col, Table, Popconfirm, Button } from 'antd';
import { urnBookingServiceIDKHD } from 'Api/urn';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { url } from 'Api/url';
import { getData } from 'Api/api';
import { firAuth } from 'FirebaseConfig';
import { actLogout } from 'ReduxConfig/Actions/customerAccount';
import format from 'date-fns/format';
import CurrencyFormat from 'react-currency-format';
import { Link } from 'react-router-dom';

function BookingService(props) {
    const dispatch = useDispatch();
    const isSocialLogin = useSelector(state => state.customerAccountReducer.isSocialLogin);
    const idKHD = sessionStorage.getItem('customerAccount') ? JSON.parse(sessionStorage.getItem('customerAccount')).idKHD : '';

    const [dataBookingService, setDataBookingService] = useState([]);

    useEffect(() => {
        var uri = url + urnBookingServiceIDKHD(idKHD);
        getData(uri).then((res) => { 
            setDataBookingService(res.data);
        })
    }, [idKHD]);

    const onLogout = () => {
        if(isSocialLogin){
            firAuth.signOut();
        }

        var actionLogout = actLogout();
        dispatch(actionLogout);
        return props.propsParent.history.push('/');
    }


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
            title: 'Action',
            render: (record) => (
                <>
                    <Link to={ '/user/your-booking-service-detail/' + record.idDDDV }><Button className="btn-detail">DETAIL</Button></Link>
                </>
            ),
            align: 'center'
        }
    ];

    return (
        <>
            <Row>
                <Col xs={24} md={24} lg={24}>
                    <h1 className="text-center" style={{ fontFamily: 'Georgia' }}><b>BOOKING SERVICES INFORMATION</b></h1> 
                    <Row className="mb-15 mt-15">
                        <Col xs={3} md={3} lg={3} />
                        <Col xs={18} md={18} lg={18} className="text-center">
                            <hr style={{ color: 'black'}} />
                        </Col>
                        <Col xs={3} md={3} lg={3} />
                    </Row>
                    <Row>
                        <Col xs={3} md={3} lg={3} />
                        <Col xs={18} md={18} lg={18} className="text-center">
                            <Table 
                                columns={ columns } 
                                dataSource={ dataBookingService } 
                                pagination={{ pageSize: 4, position: ['topRight', 'none'] }}
                                scroll={{ x: 1080 }}                                                  
                            />
                        </Col>
                        <Col xs={3} md={3} lg={3} />
                    </Row>
                    <Row className="mb-15">
                        <Col xs={3} md={3} lg={3} />
                        <Col xs={18} md={18} lg={18} className="text-center">
                            <hr style={{ color: 'black'}} />
                        </Col>
                        <Col xs={3} md={3} lg={3} />
                    </Row>
                    <Row className="mb-15">
                        <Col xs={6} md={6} lg={6} />
                        <Col xs={12} md={12} lg={12} className="text-center">
                            <Popconfirm
                                title="Are you sure to logout?"
                                onConfirm={ onLogout }
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button size="large" shape="round"><b>LOGOUT</b></Button>
                            </Popconfirm>
                        </Col>
                        <Col xs={6} md={6} lg={6} />
                    </Row>                   
                </Col>
            </Row>
        </>
    )
}

export default BookingService

