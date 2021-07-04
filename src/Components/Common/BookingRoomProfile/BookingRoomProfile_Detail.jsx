import { Row, Col, Button, Tooltip, Popconfirm, message, Tag, Descriptions } from 'antd';
import { SyncOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { getData, putData } from 'Api/api';
import { url } from 'Api/url';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { urnBookingID, urnBookingDetailIDDDP, urnRoomTypeID } from 'Api/urn';
import { format } from 'date-fns';
import CurrencyFormat from 'react-currency-format';
import ShowRoomtypeName from './ShowRoomtypeName/ShowRoomtypeName';

export default function BookingRoomProfile_Detail(props) {

    const [idDDP, setidDDP] = useState(props.idDDP);
    const [ngayDen, setngayDen] = useState(null);
    const [ngayDi, setngayDi] = useState(null);
    const [soDem, setSoDem] = useState(0);
    const [ngayDatPhong, setngayDatPhong] = useState('');
    const [tongThanhTien, settongThanhTien] = useState(0);
    const [trangThaiDat, settrangThaiDat] = useState(0);
    const [idKHD, setidKHD] = useState('');
    // const [donGia, setdonGia] = useState(0);
    // const [idLP, setidLP] = useState();
    // const [soLuong, setsoLuong] = useState();
    const [dataCTDDP, setdataCTDDP] = useState([]);
    const [arrLP, setarrLP] = useState([]);
    // var array = [];

    useEffect(() => {
        var uri = url + urnBookingID(idDDP);
        getData(uri)
        .then((resDDP) => {
            // return console.log('DDP: ', format(new Date(resDDP.data.ngayDen), 'dd/MM/yyyy'));
            setngayDen(format(new Date(resDDP.data.ngayDen), 'dd/MM/yyyy'));
            setngayDi(format(new Date(resDDP.data.ngayDi), 'dd/MM/yyyy'));
            setSoDem(resDDP.data.soDem);
            setngayDatPhong(format(new Date(resDDP.data.ngayDatPhong), 'dd/MM/yyyy'));
            settongThanhTien(resDDP.data.tongThanhTien);
            settrangThaiDat(resDDP.data.trangThaiDat);
            setidKHD(resDDP.data.idKHD);
        })
    }, []);

    useEffect(() => {
        var uri1 = url + urnBookingDetailIDDDP(idDDP);
        getData(uri1)
        .then((resCTDDP) => {
            // return console.log('CTDDP: ', resCTDDP.data);
            setdataCTDDP(resCTDDP.data);
            resCTDDP.data.map((item) => {
                var uri2 = url + urnRoomTypeID(item.idLP);
                getData(uri2)
                .then((resLP) => {
                    setarrLP(arrLP.push(resLP.data));
                    // array.push(resLP.data);
                })
            })
        })
    }, []);

    function showBookingDetail() {
        console.log('dataCTDDP: ', dataCTDDP);
        console.log('arrLP2: ', arrLP[0]);
        var lst = dataCTDDP.length > 0 && dataCTDDP.map((item, index) =>(
            <>
                <ShowRoomtypeName key={index} CTDDP={item} />
            </>
        ))
        return lst;
        
    }

    return (
        <>
            <Row>
                <Col xs={24} md={24} lg={24}>
                    <h1 className="text-center"><b>BOOKING ROOM DETAIL</b></h1> 
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
                            { showBookingDetail() }
                        </Col>
                        <Col xs={3} md={3} lg={3} />
                    </Row>
                    <Row>
                        <Col xs={3} md={3} lg={3} />
                        <Col xs={18} md={18} lg={18} className="text-center">
                            <Descriptions
                                title="Booking Information"
                                bordered
                                column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
                            >
                                <Descriptions.Item labelStyle={{fontWeight: 'bolder', width: '150px' }} label="Arrive date">{ngayDen}</Descriptions.Item>
                                <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="End date">{ngayDi}</Descriptions.Item>
                                <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="Booking date">{ngayDatPhong}</Descriptions.Item>
                                <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="Night(s)">{soDem}</Descriptions.Item>
                                <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="Status">{trangThaiDat === 1 ? <Tag icon={<CloseCircleOutlined/>} color="error">Cancel</Tag> : <Tag icon={<SyncOutlined spin />} color="processing">Processing</Tag>}</Descriptions.Item>
                                <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="Total Price " span={3}><CurrencyFormat value={tongThanhTien} displayType={'text'} thousandSeparator={true} prefix={'$'} /></Descriptions.Item>
                            </Descriptions>
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
                        <Col xs={6} md={6} lg={6} className="text-center">
                            <Link to="/user/your-booking-room"><Button size="large" shape="round"><b>BACK</b></Button></Link>
                        </Col>
                        <Col xs={6} md={6} lg={6} className="text-center">
                            <Link to="/user/your-booking-room"><Button size="large" shape="round"><b>CREATE BILL</b></Button></Link>
                        </Col>
                        <Col xs={6} md={6} lg={6} />
                    </Row>                 
                </Col>
            </Row>
        </>
    )
}
