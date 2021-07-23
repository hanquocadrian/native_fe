import { Row, Col, Button, Tag, Descriptions, message } from 'antd';
import { SyncOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { getData, postData, putData } from 'Api/api';
import { url } from 'Api/url';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { urnBookingID, urnBookingDetailIDDDP, urnRoomTypeID, urnBill, urnBillByIDDDP, urnRoomsByDatesIdRoomTypeNumber, urnBillDetail } from 'Api/urn';
import { format } from 'date-fns';
import CurrencyFormat from 'react-currency-format';
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
    // var array = [];

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
            var setdata = [];
            var i = 0;
            resCTDDP.data.map((item) => {
                var uri2 = url + urnRoomTypeID(item.idLP);
                getData(uri2)
                .then((resLP) => {
                    i++;
                    console.log('bla', resLP.data);
                    setdata.push(resLP.data);
                    if(i === resCTDDP.data.length)
                        setarrLP(setdata);
                    // array.push(resLP.data);
                })
                return 1;
            })
        })
    }, [idDDP, arrLP]);

    useEffect(() => {
        var uri = url + urnBillByIDDDP(idDDP);
        getData(uri)
        .then((resBill) => {
            console.log('Da tao bill: ', resBill.data);
            if (resBill.data) {
                setcreatedBill(true);
            }
            // console.log('created bill: ', createdBill);
        })
    }, [idDDP]);

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

    const onSubmitCreateBill = () => {
        // console.log('ngayDi: ', ngayDi);
        // console.log('new ngayDi: ', new Date(ngayDi));
        // return console.log('format ngayDi: ', format(new Date(ngayDi), 'yyyy/MM/dd'));
        var dateA = format(new Date(ngayDen), 'yyyy/MM/dd');
        var dateB = format(new Date(ngayDi), 'yyyy/MM/dd');
        var arrRooms = [];
        var arrCTPTTnew = [];

        var phanTramGiam = 0;

        var dataPTTP = {
            ngayThanhToan: format(new Date(), "yyyy/MM/dd"),
            tinhTrang: 1,
            tongThanhTien,
            tienPhaiTra: tongThanhTien - ((tongThanhTien * phanTramGiam) / 100),
            tienCoc: ((tongThanhTien - ((tongThanhTien * phanTramGiam) / 100)) * 30) / 100,
            tienConLai: (tongThanhTien - ((tongThanhTien * phanTramGiam) / 100)) - (((tongThanhTien - ((tongThanhTien * phanTramGiam) / 100)) * 30) / 100),
            phanTramGiam,
            idKHD,
            idDDP,
            ngayDen: format(new Date(ngayDen), "yyyy/MM/dd"),
            ngayDi: format(new Date(ngayDi), "yyyy/MM/dd"),
            soDem
        }
        const uri1 = url + urnBill;
        postData(uri1, dataPTTP)
        .then((resPTTP) => {
            dataCTDDP.map((item) => {
                for (let j = 0; j < item.soLuong; j++) {
                    arrCTPTTnew.push({ donGia: item.donGia, idPTT: resPTTP.data, maPhong: "", idLP: item.idLP });
                }
                return 1;
            })
            var count1 = 0;
            dataCTDDP.map((item) => {
                var dataSearchRoooms = { 
                    dateA, 
                    dateB, 
                    idLP: item.idLP, 
                    soLuong: item.soLuong 
                };
                const uri2 = url + urnRoomsByDatesIdRoomTypeNumber;
                postData(uri2, dataSearchRoooms)
                .then((resSearchRooms) => {
                    count1++;
                    arrRooms = resSearchRooms.data;
                    var i = 0;
                    arrCTPTTnew.map((item) => {
                        if (item.idLP === dataSearchRoooms.idLP) {
                            arrCTPTTnew[arrCTPTTnew.findIndex(x => x === item)].maPhong = arrRooms[i++];
                        }
                        return 1;
                    })
                    if (count1 === dataCTDDP.length) {
                        var count2 = 0;
                        arrCTPTTnew.map((item) => {
                            const uri3 = url + urnBillDetail;
                            postData(uri3, item)
                            .then((res) => {
                                count2++;
                                if (count2 === arrCTPTTnew.length) {
                                    message.success("Created successfully.", 2).then(() => {
                                        message.success("Please check your bill!!!");
                                        return props.propsParent.history.push('/user/bills');
                                    });
                                }
                            })
                            return 1;
                        })
                    }
                })
                return 1;
            })
        })
    }

    const onSubmitCancelBooking = () => {
        var dataDDP = {
            ngayDen: format(new Date(ngayDen), "yyyy/MM/dd"),
            ngayDi: format(new Date(ngayDi), "yyyy/MM/dd"),
            soDem,
            ngayDatPhong: format(new Date(ngayDatPhong), "yyyy/MM/dd"),
            tongThanhTien,
            trangThaiDat: 1,
            idKHD
        }
        const uri = url + urnBookingID(idDDP);
        putData(uri, dataDDP)
        .then((resDDP) => {
            console.log("resDDP: ", resDDP.data);
            if (resDDP.data) {
                message.success("Your booking is cancelled.");
                return props.propsParent.history.push('/user/your-booking-room');
            }
            else {
                message.error("Something went wrong, please try again!!!");
                return;
            }
        })
    }

    // const showButton = () => {
    //     console.log("trangthaidat: ", trangThaiDat);
    //     console.log("createdBill: ", createdBill);
    //     if(trangThaiDat === 0 || createdBill === false){
    //         return (
    //             <Row className="mb-15">
    //                 <Col xs={6} md={6} lg={6} />
    //                 <Col xs={4} md={4} lg={4} className="text-center">
    //                     <Link to="/user/your-booking-room"><Button size="large" shape="round"><b>BACK</b></Button></Link>
    //                 </Col>
    //                 <Col xs={4} md={4} lg={4} className="text-center">
    //                     <Button size="large" shape="round" onClick={ onSubmitCancelBooking }><b>CANCEL BOOKING</b></Button>
    //                 </Col>
    //                 <Col xs={4} md={4} lg={4} className="text-center">
    //                     <Button size="large" shape="round" onClick={ onSubmitCreateBill }><b>CREATE BILL</b></Button>
    //                 </Col>
    //                 <Col xs={6} md={6} lg={6} />
    //             </Row>  
    //         )
    //     }
    //     return (
    //         <Row className="mb-15">
    //             <Col xs={6} md={6} lg={6} />
    //             <Col xs={12} md={12} lg={12} className="text-center">
    //                 <Link to="/user/your-booking-room"><Button size="large" shape="round"><b>BACK</b></Button></Link>
    //             </Col>
    //             <Col xs={6} md={6} lg={6} />
    //         </Row>    
    //     )
    // }

    return (
        <>
            <Row>
                <Col xs={24} md={24} lg={24}>
                    <h1 className="text-center" style={{ fontFamily: 'Georgia' }}><b>BOOKING ROOM DETAIL</b></h1> 
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
                                <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="Status">{trangThaiDat === 1 ? <Tag icon={<CloseCircleOutlined/>} color="error">Cancelled</Tag> : <Tag icon={<SyncOutlined spin />} color="processing">Processing</Tag>}</Descriptions.Item>
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
                    {
                        console.log('btn show: ', trangThaiDat, createdBill)
                    }
                    { 
                        (trangThaiDat === 0 && createdBill === false) ? 
                        (
                            <Row className="mb-15">
                                <Col xs={6} md={6} lg={6} />
                                <Col xs={4} md={4} lg={4} className="text-center">
                                    <Link to="/user/your-booking-room"><Button size="large" shape="round"><b>BACK</b></Button></Link>
                                </Col>
                                <Col xs={4} md={4} lg={4} className="text-center">
                                    <Button size="large" shape="round" onClick={ onSubmitCancelBooking }><b>CANCEL BOOKING</b></Button>
                                </Col>
                                <Col xs={4} md={4} lg={4} className="text-center">
                                    <Button size="large" shape="round" onClick={ onSubmitCreateBill }><b>CREATE BILL</b></Button>
                                </Col>
                                <Col xs={6} md={6} lg={6} />
                            </Row>  
                        ) : 
                        (
                            <Row className="mb-15">
                                <Col xs={6} md={6} lg={6} />
                                <Col xs={12} md={12} lg={12} className="text-center">
                                    <Link to="/user/your-booking-room"><Button size="large" shape="round"><b>BACK</b></Button></Link>
                                </Col>
                                <Col xs={6} md={6} lg={6} />
                            </Row> 
                        )
                    }
                    {/* { showButton } */}
                </Col>
            </Row>
        </>
    )
}