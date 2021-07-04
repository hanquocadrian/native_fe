import { Row, Col, Table, Button, Tooltip, Popconfirm, Tag } from 'antd';
import { SyncOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { getData } from 'Api/api';
import { url } from 'Api/url';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { firAuth } from 'FirebaseConfig';
import { actLogout } from 'ReduxConfig/Actions/customerAccount';
import { urnBookingIDKHD } from 'Api/urn';
import { format } from 'date-fns';
import CurrencyFormat from 'react-currency-format';

import { BiDetail } from 'react-icons/bi';
import { ImCancelCircle } from 'react-icons/im';
import { IoCreateOutline } from 'react-icons/io5';

export default function BookingRoomProfile(props) {
    const dispatch = useDispatch();
    const isSocialLogin = useSelector(state => state.customerAccountReducer.isSocialLogin);
    const idKHD = sessionStorage.getItem('customerAccount') ? JSON.parse(sessionStorage.getItem('customerAccount')).idKHD : '';
    const [dataDDP, setdataDDP] = useState([]);

    useEffect(() => {
        var uri = url + urnBookingIDKHD(idKHD);
        getData(uri)
        .then((resDDP) => {
            setdataDDP(resDDP.data);
        })
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
                    {trangThaiDat === 1 ? <Tag icon={<CloseCircleOutlined/>} color="error">Cancelled</Tag> : <Tag icon={<SyncOutlined spin />} color="processing">Processing</Tag>}
                </>
            ),
            align: 'center'
        },
        {
            title: 'Actions',
            render: (record) => (
                <>
                    <Link to={ '/user/your-booking-room-detail/' + record.idDDP }><Tooltip placement="top" title="Detail"><Button className="btn-detail"><BiDetail/></Button></Tooltip></Link>
                    {
                        record.trangThaiDat === 0 && <Link to={ '/about' + record.idDDP }><Tooltip placement="top" title="Create bill"><Button className="btn-edit"><IoCreateOutline/></Button></Tooltip></Link>
                    }
                    {
                        record.trangThaiDat === 0 && 
                        <Popconfirm
                            title="Are you sure?"
                            // onConfirm={ () => onDelete(record.idDV) }
                            okText="Yes"
                            cancelText="No"
                        >
                            <Tooltip placement="top" title="Cancel"><Button className="btn-delete"><ImCancelCircle/></Button></Tooltip>
                        </Popconfirm>
                    }
                </>
            )
        }
    ];

    const onLogout = () => {
        if(isSocialLogin){
            firAuth.signOut();
        }

        var actionLogout = actLogout();
        dispatch(actionLogout);
        return props.propsParent.history.push('/');
    }

    return (
        <>
            <Row>
                <Col xs={24} md={24} lg={24}>
                    <h1 className="text-center"><b>BOOKING ROOM INFORMATION</b></h1> 
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
                                dataSource={ dataDDP } 
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
