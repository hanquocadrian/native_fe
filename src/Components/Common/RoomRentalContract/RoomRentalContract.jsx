import { Row, Col, Table, Button, Popconfirm, Tag } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { getData } from 'Api/api';
import { url } from 'Api/url';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { firAuth } from 'FirebaseConfig';
import { actLogout } from 'ReduxConfig/Actions/customerAccount';
import { urnBookingIDKHD, urnRRCByIDDDP } from 'Api/urn';
import { format } from 'date-fns';

export default function RoomRentalContract(props) {
    const dispatch = useDispatch();
    const isSocialLogin = useSelector(state => state.customerAccountReducer.isSocialLogin);
    const idKHD = useSelector(state => state.customerAccountReducer.idKHD);
    const [dataDDP, setdataDDP] = useState([]);
    const [dataRRC, setdataRRC] = useState([]);

    useEffect(() => {
        var uri = url + urnBookingIDKHD(idKHD);
        getData(uri)
        .then(resDDP => {
            console.log("resDDP: ", resDDP.data);
            setdataDDP(resDDP.data);
            var setdata = [];
            var i =  0;
            resDDP.data.map(item => {
                var uri2 = url + urnRRCByIDDDP(item.idDDP);
                getData(uri2)
                .then(resRRC => {
                    i++;
                    console.log("count i: ", i);
                    console.log("resRRC: ", resRRC.data);
                    setdata = setdata.concat(resRRC.data);

                    if(i === resDDP.data.length)
                        setdataRRC(setdata);
                })
                return 1;
            })
        })
    }, [idKHD]);

    const columns = [
        {
            title: 'id',
            dataIndex: 'idPTP',
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
            title: 'Status',
            dataIndex: 'trangThai',
            render: trangThai => (
                <>
                    {
                        trangThai === 1 ? <Tag icon={<CheckCircleOutlined/>} color="warning">Paid</Tag> : 
                        (
                            trangThai === 2 ? 
                            <Tag icon={<CheckCircleOutlined/>} color="processing">Deposit 30%</Tag> : 
                            <Tag icon={<CheckCircleOutlined/>} color="success">Completed</Tag>
                        )
                    }
                </>
            ),
            align: 'center'
        },
        {
            title: 'Room',
            dataIndex: 'maPhong',
            align: 'center'
        },
        {
            title: 'Booking id',
            dataIndex: 'idDDP',
            align: 'center'
        },
        {
            title: 'Customer stay id',
            dataIndex: 'idKHO',
            align: 'center'
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
            {console.log("dataRRC: ", dataRRC)}
            <Row>
                <Col xs={24} md={24} lg={24}>
                    <h1 className="text-center" style={{ fontFamily: 'Georgia' }}><b>ROOM RENTAL CONTRACT</b></h1> 
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
                                dataSource={ dataRRC } 
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
