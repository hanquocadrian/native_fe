import { Row, Col, Button, Tag, Descriptions, Tooltip } from 'antd';
import { SyncOutlined, CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { getData } from 'Api/api';
import { url } from 'Api/url';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { urnBookingID, urnBookingDetailIDDDP, urnRoomTypeID, urnBillByIDDDP } from 'Api/urn';
import { format } from 'date-fns';
import CurrencyFormat from 'react-currency-format';
import { ImCancelCircle } from 'react-icons/im';
import ShowRoomtypeName from './ShowRoomtypeName/ShowRoomtypeName';

export default function BookingRoomProfile_Detail(props) {

    const idDDP = props.idDDP;
    const [ngayDen, setngayDen] = useState(null);
    const [ngayDi, setngayDi] = useState(null);
    const [soDem, setSoDem] = useState(0);
    const [ngayDatPhong, setngayDatPhong] = useState(null);
    const [tongThanhTien, settongThanhTien] = useState(0);
    const [trangThaiDat, settrangThaiDat] = useState(0);
    const [idKHD, setidKHD] = useState('');
    // const [donGia, setdonGia] = useState(0);
    // const [idLP, setidLP] = useState();
    // const [soLuong, setsoLuong] = useState();
    const [dataCTDDP, setdataCTDDP] = useState([]);
    const [arrLP, setarrLP] = useState([]);
    const [createdBill, setcreatedBill] = useState(false);

    useEffect(() => {
        var uri = url + urnBookingID(idDDP);
        getData(uri)
        .then((resDDP) => {
            // return console.log('DDP: ', format(new Date(resDDP.data.ngayDen), 'dd/MM/yyyy'));
            setngayDen(resDDP.data.ngayDen);
            setngayDi(resDDP.data.ngayDi);
            setSoDem(resDDP.data.soDem);
            setngayDatPhong(resDDP.data.ngayDatPhong);
            settongThanhTien(resDDP.data.tongThanhTien);
            settrangThaiDat(resDDP.data.trangThaiDat);
            setidKHD(resDDP.data.idKHD);
        })
    }, [idDDP]);

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
                return 1;
            })
        })
    }, [idDDP]);

    useEffect(() => {
        var uri = url + urnBillByIDDDP(idDDP);
        getData(uri)
        .then((resBill) => {
            console.log('Da tao bill: ', resBill.data);
            if (resBill.data) {
                setcreatedBill(true);
            }
            console.log('created bill: ', createdBill);
        })
    }, [idDDP, createdBill]);

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
                    <Row className="mb-15 mt-15">
                        <Col xs={2} md={2} lg={2}/>
                        <Col xs={20} md={20} lg={20}>
                            <Row>
                                <Col xs={2} md={2} lg={2}>
                                    <Tooltip placement="right" title="Back">
                                        <Link to="/admin/booking">
                                            <Button className="btn-close" id="btnAdd">
                                                <ImCancelCircle style={{ color: 'black' }} className="icon-top" />
                                            </Button>
                                        </Link>
                                    </Tooltip>
                                </Col>
                                <Col xs={20} md={20} lg={20}>
                                    <h1 className="text-center"><b>BOOKING ROOM DETAIL</b></h1> 
                                </Col>
                                <Col xs={2} md={2} lg={2}/>
                            </Row>
                        </Col>
                        <Col xs={2} md={2} lg={2} />
                    </Row>
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
                                title={<span style={{ fontFamily: 'Georgia' }}>Booking Information</span>}
                                bordered
                                column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
                            >
                                <Descriptions.Item labelStyle={{fontWeight: 'bolder', width: '150px' }} label="Arrive date">{format(new Date(ngayDen), 'dd/MM/yyyy')}</Descriptions.Item>
                                <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="End date">{format(new Date(ngayDi), 'dd/MM/yyyy')}</Descriptions.Item>
                                <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="Booking date">{format(new Date(ngayDatPhong), 'dd/MM/yyyy')}</Descriptions.Item>
                                <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="Night(s)">{soDem}</Descriptions.Item>
                                <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="Status">{trangThaiDat === 1 ? <Tag icon={<CloseCircleOutlined/>} color="error">Cancelled</Tag> : (trangThaiDat === 2 ? <Tag icon={<CheckCircleOutlined/>} color="success">Completed</Tag> : <Tag icon={<SyncOutlined spin />} color="processing">Processing</Tag>)}</Descriptions.Item>
                                <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="Total Price " span={3}><CurrencyFormat value={tongThanhTien} displayType={'text'} thousandSeparator={true} prefix={'$'} /></Descriptions.Item>
                            </Descriptions>
                        </Col>
                        <Col xs={3} md={3} lg={3} />
                    </Row>
                </Col>
            </Row>
        </>
    )
}
