import React from 'react'
import { Col, Row,  Descriptions, Progress,  Button, Table, Empty } from 'antd';
import format from 'date-fns/format';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { getData } from 'Api/api';
import { useEffect } from 'react';
import { url } from 'Api/url';
import { urnServiceID, urnKhdID, urnRRCID } from 'Api/urn';
import CurrencyFormat from 'react-currency-format';
import { urnBookingServiceID } from 'Api/urn';
import { urnDetailBookingServiceIDDDDV } from 'Api/urn';

function DisplayService(props) {
    const [tenDV, setTenDV] = useState("");
    
    useEffect(() => {
        var uri = url + urnServiceID(props.idDV);
        getData(uri).then(res => setTenDV(res.data.tenDV));
    }, [props.idDV]);

    return (
        <>
            { tenDV }
        </>
    )
}

function BookingServiceDetail(props) {
    const [bookingService, setBookingService] = useState(null);
    const [dataDetailBookingService,setDataDetailBookingService] = useState([]);
    const [tenKH, setTenKH] = useState("");
    const [idDDP, setIdDDP] = useState(-1);

    useEffect(() => {
        var uri = "";
        uri = url + urnBookingServiceID(props.idDDDV);
        getData(uri).then(res => setBookingService(res.data||null));

        uri = url + urnDetailBookingServiceIDDDDV(props.idDDDV);
        getData(uri).then(res => setDataDetailBookingService(res.data||[]));
    },[props.idDDDV])

    useEffect(() => {
        if(bookingService){
            var uri = ""
            if(bookingService.idKHD){
                uri = url + urnKhdID(bookingService.idKHD);
                getData(uri).then(res => setTenKH(res.data[0].tenKH));
            }     
            if(bookingService.idPTP){
                uri = url + urnRRCID(bookingService.idPTP);
                getData(uri).then(res => setIdDDP(res.data.idDDP))
            }
        } 
    },[bookingService])

    const columns = [
        {
            title: 'CHOOSE BOOKING SERVICE',
            children: [
                {
                    title: '#',
                    dataIndex: 'idCTDDV',
                    align: 'center', 
                    width: 50
                },
                {
                    title: 'Service',
                    render: record => (
                        <DisplayService idDV={record.idDV} />
                    ),
                    align: 'center',
                    width: 150
                },
                {
                    title: 'Type',
                    dataIndex: 'hinhThuc',
                    render: hinhThuc => (
                        hinhThuc === 1 ? 'per booking' : (hinhThuc === 2 ? 'per person per date' : 'free')
                    ),
                    align: 'center', 
                    width: 150
                },
                {
                    title: 'Amount',
                    dataIndex: 'soLuong',
                    align: 'center', 
                    width: 150
                },
                {
                    title: 'Price',
                    dataIndex: 'donGia',
                    align: 'center', 
                    width: 150
                }
            ]
        }
    ]
    return (
            <Row>
                <Col xs={24} md={24} lg={24}>
                    <h1 className="text-center" style={{ fontFamily: 'Georgia' }}><b>BOOKING SERVICES DETAIL</b></h1> 
                    <Row className="mb-15 mt-15">
                        <Col xs={3} md={3} lg={3} />
                        <Col xs={18} md={18} lg={18} className="text-center">
                            <hr style={{ color: 'black'}} />
                        </Col>
                        <Col xs={3} md={3} lg={3} />
                    </Row>
                    <Row>
                        <Col xs={5} md={5} lg={5} />
                        <Col xs={14} md={14} lg={14} className="text-center">
                            {
                                bookingService ? (
                                    <>
                                        <Descriptions
                                            bordered
                                            column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
                                        >
                                            <Descriptions.Item labelStyle={{fontWeight: 'bolder', width: '200px'}} contentStyle={{width: '200px'}} label="ID booking service">{ bookingService.idDDDV }</Descriptions.Item>
                                            <Descriptions.Item labelStyle={{fontWeight: 'bolder', width: '200px'}} contentStyle={{width: '200px'}} label="Date booking">{ format(new Date(bookingService.ngayDat), 'dd/MM/yyyy') }</Descriptions.Item>
                                            <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="ID Customer">{ bookingService.idKHD }</Descriptions.Item>
                                            <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="Customer name">{ tenKH }</Descriptions.Item>
                                            <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="ID RRC">{ bookingService.idPTP }</Descriptions.Item>
                                            <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="ID Booking">{ idDDP }</Descriptions.Item>
                                            <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="Status">
                                                <Row>
                                                    <Col xs={10} md={14} lg={20}>
                                                        <Progress
                                                            strokeColor={{
                                                                '0%': '#108ee9',
                                                                '100%': '#87d068',
                                                            }}
                                                            percent={ bookingService.trangThai === 1 ? 60 : 100 }
                                                            status="active"
                                                            showInfo={false}
                                                        />
                                                    </Col>
                                                    <Col xs={14} md={10} lg={4} style={{textAlign:'center'}}>
                                                        { bookingService.trangThai === 1 ? "Unpaid" : "Paid" }
                                                    </Col>
                                                </Row>
                                            </Descriptions.Item>
                                        </Descriptions>                                                
                                    </>
                                ) : (
                                    <Empty />
                                )
                            }
                        </Col>
                        <Col xs={5} md={5} lg={5} />
                    </Row>
                    <Row className="mb-30">
                        <Col xs={5} md={5} lg={5} />
                        <Col xs={14} md={14} lg={14} className="text-center">
                            <Table
                                className="tbl-choose-service-admin"
                                bordered
                                columns={ columns } 
                                dataSource={ dataDetailBookingService } 
                                pagination={{ pageSize: 3, position: ['topRight', 'none'] }}    
                                footer={() => 
                                    <>
                                        <Row>
                                            <Col xs={18} md={18} lg={18} style={{textAlign:'end', fontWeight:'bolder'}}>Total cost: </Col>
                                            <Col xs={2} md={2} lg={2} />
                                            <Col xs={4} md={4} lg={4}>
                                                <CurrencyFormat value={bookingService ? bookingService.tongThanhTien : 0} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                            </Col>
                                        </Row>
                                    </>
                                }                                         
                            />  
                        </Col>
                        <Col xs={5} md={5} lg={5} />
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
                            <Link to="/user/your-booking-service"><Button size="large" shape="round"><b>BACK</b></Button></Link>
                        </Col>
                        <Col xs={6} md={6} lg={6} />
                    </Row> 
                    {/* { showButton } */}
                </Col>
            </Row>
    )
}

export default BookingServiceDetail

