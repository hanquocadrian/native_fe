import React from 'react'
import { useEffect, useState} from 'react';
import { Row, Col, Button, Input, message } from 'antd';
import { Link } from 'react-router-dom';
import { getData, putData, postData } from 'Api/api';
import { url } from 'Api/url';
import { urnKhdID, urnUserID, urnBooking, urnBookingDetail } from 'Api/urn';
import { format } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import { deleteCart } from 'ReduxConfig/Actions/cart';

import { FaHotel } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

import './BookingInfo.css';

// const initialization = {
//     rooms: localStorage.getItem('itemsShoppingCart') ? JSON.parse(localStorage.getItem('itemsShoppingCart')) : [],
// };

export default function BookingInfo(props) {
    //KHD
    const idKHD = sessionStorage.getItem('customerAccount') ? JSON.parse(sessionStorage.getItem('customerAccount')).idKHD : '';
    const [tenKH, setTenKH] = useState('');
    const [phone, setPhone] = useState('');
    const [cmnd, setCMND] = useState('');
    const [passport, setPassport] = useState('');
    //USER
    const idTK = sessionStorage.getItem('customerAccount') ? JSON.parse(sessionStorage.getItem('customerAccount')).idTK : '';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [title, setTitle] = useState('');
    const [loaiTaiKhoan, setLoaiTaiKhoan] = useState(0);
    //CART
    // const rooms = localStorage.getItem('itemsShoppingCart') ? JSON.parse(localStorage.getItem('itemsShoppingCart')) : [];
    // const startDate = localStorage.getItem('dateArriveCart') ? new Date(JSON.parse(localStorage.getItem('dateArriveCart')).startDate): null;
    // const endDate = localStorage.getItem('dateArriveCart') ? new Date(JSON.parse(localStorage.getItem('dateArriveCart')).endDate) : null;
    // const diff = localStorage.getItem('dateArriveCart') ? JSON.parse(localStorage.getItem('dateArriveCart')).days_diff : 0;

    const rooms = localStorage.getItem('itemsShoppingCart') ? JSON.parse(localStorage.getItem('itemsShoppingCart')) : [];
    const startDate = new Date(useSelector(state => state.chooseDatesReducer.dateA));
    const endDate = new Date(useSelector(state => state.chooseDatesReducer.dateB));
    const diff = parseInt(useSelector(state => state.chooseDatesReducer.daysDiff));
    const slPhong = localStorage.getItem('slItemsShoppingCart') ? JSON.parse(localStorage.getItem('slItemsShoppingCart')).sl : 0;
    const [totalPrice, setTotalPrice] = useState(0);

    const dateA = useSelector(state => state.chooseDatesReducer.dateA);
    const dateB = useSelector(state => state.chooseDatesReducer.dateB);
    // const daysDiff = useState(useSelector(state => state.chooseDatesReducer.daysDiff));

    const dispatch = useDispatch();

    useEffect(() => {
        var uri = url + urnUserID(idTK);
        getData(uri)
        .then((resUser) => {
            //  USER
            setEmail(resUser.data[0].email);
            setPassword(resUser.data[0].password);
            setDisplayName(resUser.data[0].displayName);
            setTitle(resUser.data[0].title || 'Mr');
            setLoaiTaiKhoan(resUser.data[0].loaiTaiKhoan);
            // setidKHD(resUser.data[0].idKHD);

            uri = url + urnKhdID(idKHD);
            getData(uri)
            .then((resKHD) => {
                //  KHD
                setTenKH(resKHD.data[0].tenKH);
                setPhone(resKHD.data[0].sdt);
                setCMND(resKHD.data[0].CMND);
                setPassport(resKHD.data[0].Passport);
            })
        });
    }, [idTK, idKHD]);

    useEffect(() => {
        if (rooms != null) {
            var ttp = 0;
            rooms.forEach(room => {
                ttp += parseInt(room.giaLP, 10) * diff * parseInt(room.slDat, 10);
            });
            setTotalPrice(ttp);
        }
    }, [rooms, diff]);

    function showRooms() {
        var lst = rooms.map((item, index) =>
            <div style={{fontSize:'20px', fontFamily:'Georgia', fontWeight:'revert'}} key={index}>
                <span><b>{item.tenLP}</b> X <b>{item.slDat}</b></span><br/>
                <span><b>{item.giaLP}</b> USD/ day</span>
                <hr/>
            </div>
        );
        return lst;
    }

    const onReset = () => {
        var uri = url + urnUserID(idTK);
        getData(uri)
        .then((resUser) => {
            //  USER
            setEmail(resUser.data[0].email);
            setPassword(resUser.data[0].password);
            setDisplayName(resUser.data[0].displayName);
            setTitle(resUser.data[0].title || 'Mr');
            setLoaiTaiKhoan(resUser.data[0].loaiTaiKhoan);
            // setidKHD(resUser.data[0].idKHD);

            uri = url + urnKhdID(idKHD);
            getData(uri)
            .then((resKHD) => {
                //  KHD
                setTenKH(resKHD.data[0].tenKH);
                setPhone(resKHD.data[0].sdt);
                setCMND(resKHD.data[0].CMND);
                setPassport(resKHD.data[0].Passport);
            })
        });
    }

    const onSubmitBooking = () => {
        // return console.log('cmnd:', cmnd, tenKH, email, phone);
        // return console.log('idKHD, idTK:', idKHD, idTK);
        // return console.log('ngayDatPhong:', format(new Date(), "yyyy-MM-dd"));
        if(cmnd === null || tenKH === '' || email === '' || phone.length < 10){
            message.error("Please, fill out all the fields!");
            return;
        }
        var dataKHD = {
            tenKH,
            sdt: phone,
            CMND: cmnd,
            Passport: passport,
            displayName,
            email,
            isChangePass: 0,
            isBooking: true
        }
        // return console.log('dataKHD:', dataKHD);
        const uri1 = url + urnKhdID(idKHD);
        putData(uri1, dataKHD)
        .then(resKHD => {
            if (resKHD.data !== undefined) {
                var dataUser = {
                    tenKH,
                    sdt: phone,
                    CMND: cmnd,
                    Passport: passport,
                    email,
                    password,
                    displayName,
                    title,
                    loaiTaiKhoan,
                    idKHD,
                    isChangePass: 0
                }
                const uri2 = url + '/api/user/update_cus_acc/' + idTK;
                putData(uri2, dataUser)
                .then( resUser => {
                    if (resUser.data) {
                        console.log("res add: ", resUser.data);
                        var dataDDP = {
                            ngayDen: dateA,
                            ngayDi: dateB,
                            soDem: diff,
                            ngayDatPhong: format(new Date(), "yyyy/MM/dd"),
                            tongThanhTien: totalPrice,
                            trangThaiDat: 0,
                            idKHD
                        }
                        const uri3 =  url + urnBooking;
                        postData(uri3, dataDDP)
                        .then( resDDP => {
                            if (resDDP.data) {
                                console.log('resDDP.data: ', resDDP.data);
                                JSON.parse(localStorage.getItem('itemsShoppingCart')).map(item => {
                                    let dataCTDDP = {
                                        donGia: item.giaLP,
                                        idDDP: resDDP.data,
                                        idLP: item.idLP,
                                        soLuong: item.slDat
                                    }
                                    let uri4 = url + urnBookingDetail;
                                    postData(uri4, dataCTDDP)
                                    .then( resCTDDP  => {
                                        if (resCTDDP.data) {
                                            console.log('CT_DDP: ', resCTDDP.data);
                                        }
                                        else {
                                            message.error("Something went wrong, please try again!!!", 3);
                                            return;
                                        }
                                    })
                                    return 1;
                                })
                            }
                            message.success("Booking successfully, wait a few seconds", 2).then(()=>{
                                localStorage.removeItem('itemsShoppingCart');
                                localStorage.removeItem('dateArriveCart');
                                var actionDelSL = deleteCart(slPhong);
                                dispatch(actionDelSL);
                                onReset();
                                return props.propsParent.history.push('/user/your-booking-room');
                            })
                        })
                    }
                    else {
                        message.error("Something went wrong, please try again!!!", 3)
                    }
                })
            }
            else if(typeof resKHD.response.data !== undefined){
                console.log("res.response.data: ", resKHD.response.data);
                if(Array.isArray(resKHD.response.data)){
                    resKHD.response.data.map(err => {
                        return message.error(err.message);
                    })                    
                } 
                else {
                    message.error(resKHD.response.data);
                }
                return;
            }
        })
    }

    return (
        <div style={{ paddingTop:'1%', backgroundColor:'#FFFFFF'}}>
            <div style={{backgroundColor:'#FFFFFF', paddingBottom:'1%'}}>
                <Row className="breadcrumb-nativeLink">
                    <Col xs={2} md={3} lg={3}></Col>
                    <Col xs={20} md={18} lg={18}>
                        <Link to="/"><span>NATIVE</span></Link>&nbsp; <IoIosArrowForward className="icon"/>&nbsp;<Link to="/your-basket"><span>BASKET</span></Link>&nbsp; <IoIosArrowForward className="icon"/>&nbsp;<span>BOOKING</span>
                    </Col>
                    <Col xs={2} md={3} lg={3}></Col>
                </Row> 
            </div>
            <Row style={{ paddingTop:'5%', paddingBottom:'5%', backgroundColor:'#F3F1EF'}}>
                <Col xs={2} md={3} lg={6}></Col>
                <Col xs={20} md={18} lg={12}>
                    <span style={{fontSize:'45px', fontWeight:'bold', fontFamily:'Georgia'}}>Almost there.</span>&nbsp;&nbsp;<FaHotel style={{width:'4vw', height:'4vh'}} className="iconBasket"/><hr/>
                    <p style={{fontSize:'19px', fontFamily:'Georgia'}}>Please complete the fields below to secure your selection.</p>
                </Col>
                <Col xs={2} md={3} lg={6}></Col>
            </Row>
            <Row style={{ paddingTop:'3%', paddingBottom:'8%'}}>
                <Col xs={1} md={2} lg={3}></Col>
                <Col xs={0} md={16} lg={13} style={{fontFamily:'Georgia'}}>
                    <Row >
                        <Col>
                            <span style={{fontSize:'25px', fontFamily:'Georgia', fontWeight:'bold'}}>Personal Details:</span>
                        </Col>
                    </Row>
                    <Row style={{ paddingTop:'5%'}} className="formPersonalDetails">
                        <Col xs={4} md={4} lg={4} style={{ lineHeight: '40px', fontSize: '18px' }}>
                            <b>Full name:</b>
                        </Col>
                        <Col xs={3} md={3} lg={3} >
                            <Input placeholder="Mr" value={ title } onChange={(e) => setTitle( e.target.value )} />
                        </Col>
                        <Col xs={16} md={15} lg={13} >
                            <Input value={ tenKH } onChange={(e) => setTenKH( e.target.value )} placeholder="FULLNAME* (required)" required/>
                        </Col>
                        <Col xs={1} md={2} lg={4} />
                    </Row>
                    <Row style={{ paddingTop:'5%'}} className="formPersonalDetails">
                        <Col xs={4} md={4} lg={4} style={{ lineHeight: '40px', fontSize: '18px' }}>
                            <b>ID Card:</b>
                        </Col>
                        <Col xs={19} md={18} lg={16} >
                            <Input value={ cmnd } onChange={(e) => setCMND( e.target.value )} placeholder="ID CARD* (required)" required/>
                        </Col>
                        <Col xs={1} md={2} lg={4} />
                    </Row>
                    <Row style={{ paddingTop:'5%'}} className="formPersonalDetails">
                        <Col xs={4} md={4} lg={4} style={{ lineHeight: '40px', fontSize: '18px' }}>
                            <b>Passport:</b>
                        </Col>
                        <Col xs={19} md={18} lg={16} >
                            <Input value={ passport } onChange={(e) => setPassport( e.target.value )} placeholder="PASSPORT* (not required)" required/>
                        </Col>
                        <Col xs={1} md={2} lg={4} />
                    </Row>
                    <Row style={{ paddingTop:'5%'}} className="formPersonalDetails">
                        <Col xs={4} md={4} lg={4} style={{ lineHeight: '40px', fontSize: '18px' }}>
                            <b>Email:</b>
                        </Col>
                        <Col xs={19} md={18} lg={16} >
                            <Input value={ email } onChange={(e) => setEmail( e.target.value )} placeholder="EMAIL* (required)" /> 
                        </Col>
                        <Col xs={1} md={2} lg={4} />
                    </Row>
                    <Row style={{ paddingTop:'5%'}} className="formPersonalDetails">
                        <Col xs={4} md={4} lg={4} style={{ lineHeight: '40px', fontSize: '18px'}}>
                            <b>Phone:</b>
                        </Col>
                        <Col xs={19} md={18} lg={16} >
                            <Input value={ phone } onChange={(e) => setPhone( e.target.value )} placeholder="PHONE NUMBER* (required)"/> 
                        </Col>
                        <Col xs={1} md={2} lg={4} />
                    </Row>
                </Col>
                <Col xs={22} md={0} lg={0} style={{fontFamily:'Georgia'}}>
                    <Row >
                        <Col>
                            <span style={{fontSize:'25px', fontFamily:'Georgia', fontWeight:'bold'}}>Personal Details:</span>
                        </Col>
                    </Row>
                    <Row style={{ paddingTop:'5%'}} className="formPersonalDetails">
                        <Col xs={24} md={0} lg={0} style={{ lineHeight: '40px', fontSize: '18px' }}>
                            <b>Full name:</b>
                        </Col>
                        <Col xs={3} md={0} lg={0} >
                            <Input placeholder="Mr" value={ title } onChange={(e) => setTitle( e.target.value )} />
                        </Col>
                        <Col xs={21} md={0} lg={0} >
                            <Input value={ tenKH } onChange={(e) => setTenKH( e.target.value )} placeholder="FULLNAME* (required)" required/>
                        </Col>
                        <Col xs={0} md={0} lg={0} />
                    </Row>
                    <Row style={{ paddingTop:'5%'}} className="formPersonalDetails">
                        <Col xs={24} md={4} lg={4} style={{ lineHeight: '40px', fontSize: '18px' }}>
                            <b>ID Card:</b>
                        </Col>
                        <Col xs={24} md={18} lg={16} >
                            <Input value={ cmnd } onChange={(e) => setCMND( e.target.value )} placeholder="ID CARD* (required)" required/>
                        </Col>
                        <Col xs={0} md={2} lg={4} />
                    </Row>
                    <Row style={{ paddingTop:'5%'}} className="formPersonalDetails">
                        <Col xs={24} md={4} lg={4} style={{ lineHeight: '40px', fontSize: '18px' }}>
                            <b>Passport:</b>
                        </Col>
                        <Col xs={24} md={18} lg={16} >
                            <Input value={ passport } onChange={(e) => setPassport( e.target.value )} placeholder="PASSPORT* (not required)" required/>
                        </Col>
                        <Col xs={0} md={2} lg={4} />
                    </Row>
                    <Row style={{ paddingTop:'5%'}} className="formPersonalDetails">
                        <Col xs={24} md={4} lg={4} style={{ lineHeight: '40px', fontSize: '18px' }}>
                            <b>Email:</b>
                        </Col>
                        <Col xs={24} md={18} lg={16} >
                            <Input value={ email } onChange={(e) => setEmail( e.target.value )} placeholder="EMAIL* (required)" /> 
                        </Col>
                        <Col xs={0} md={2} lg={4} />
                    </Row>
                    <Row style={{ paddingTop:'5%', paddingBottom:'5%'}} className="formPersonalDetails">
                        <Col xs={24} md={4} lg={4} style={{ lineHeight: '40px', fontSize: '18px'}}>
                            <b>Phone:</b>
                        </Col>
                        <Col xs={24} md={18} lg={16} >
                            <Input value={ phone } onChange={(e) => setPhone( e.target.value )} placeholder="PHONE NUMBER* (required)"/> 
                        </Col>
                        <Col xs={0} md={2} lg={4} />
                    </Row>
                </Col>
                <Col xs={0} md={4} lg={5}>
                    <Row style={{ paddingTop:'5%', backgroundColor:'#F3F1EF'}}>
                        <Col xs={1} md={1} lg={2} /> 
                        <Col xs={22} md={22} lg={20} style={{textAlign:'center'}}>
                            <span style={{fontSize:'24px', fontFamily:'Georgia', fontWeight:'bold'}}>Your Receipt</span>
                        </Col>
                        <Col xs={1} md={1} lg={2} />
                    </Row>
                    <Row style={{ paddingTop:'5%', backgroundColor:'#F3F1EF'}}>
                        <Col xs={1} md={1} lg={2} /> 
                        <Col xs={22} md={22} lg={20} style={{textAlign:'center'}}>
                            <span style={{fontSize:'20px', fontFamily:'Georgia', fontWeight:'revert'}}>
                                <span>{format(startDate, 'dd/MM')} - {format(endDate, 'dd/MM')}, {diff} night(s)</span>
                                <hr/>
                            </span>
                        </Col>
                        <Col xs={1} md={1} lg={2} /> 
                    </Row>
                    <Row style={{ paddingTop:'5%', backgroundColor:'#F3F1EF'}}>
                        <Col xs={1} md={1} lg={2} /> 
                        <Col xs={22} md={22} lg={20}>
                            { showRooms() }
                        </Col>
                        <Col xs={1} md={1} lg={2} /> 
                    </Row>
                    <Row style={{ paddingTop:'5%', paddingBottom: '5%', backgroundColor:'#F3F1EF'}}>
                        <Col xs={1} md={1} lg={2} /> 
                        <Col xs={22} md={22} lg={20}>
                            <span style={{fontSize:'20px', fontFamily:'Georgia', fontWeight:'revert'}}>
                                <span>Total cost</span><br/>
                                <span>{slPhong} room(s) for {diff} night(s)</span> <br/>
                                <span style={{fontSize:'25px', fontFamily:'Georgia', fontWeight:'bold'}}>{new Intl.NumberFormat().format(totalPrice)} USD</span>
                            </span>
                        </Col>
                        <Col xs={1} md={1} lg={2} /> 
                    </Row>
                    <Row style={{paddingTop:'5%',fontFamily:'Georgia', fontWeight:'revert'}}>
                        <Col xs={0} md={2} lg={2} /> 
                        <Col xs={0} md={20} lg={20} style={{textAlign:'center'}}><span style={{fontSize:'25px'}}>Total booking cost</span><hr/></Col>
                        <Col xs={0} md={2} lg={2} /> 
                    </Row>
                    <Row style={{fontFamily:'Georgia', fontWeight:'revert'}}>
                        <Col xs={0} md={2} lg={2} /> 
                        <Col xs={0} md={20} lg={20} style={{textAlign:'center'}}>
                            <span style={{fontWeight:'bold', fontSize:'25px'}}>
                                {new Intl.NumberFormat().format(totalPrice)} USD
                            </span>
                        </Col>
                        <Col xs={0} md={2} lg={2} />    
                    </Row>
                    <Row style={{ paddingTop:'2%', fontSize:'15px', fontFamily:'Georgia', fontWeight:'revert'}} className="button-Continue">
                        <Col xs={0} md={2} lg={2} /> 
                        <Col xs={0} md={20} lg={20} style={{textAlign:'center'}}>
                            <Button size="large" style={{width:'200px'}} onClick={ onSubmitBooking }><b>BOOKING</b></Button>
                        </Col>
                        <Col xs={0} md={2} lg={2} /> 
                    </Row>
                </Col>
                <Col xs={22} md={0} lg={0}>
                    <Row style={{ paddingTop:'5%', backgroundColor:'#F3F1EF'}}>
                        <Col xs={6} md={8} lg={10} /> 
                        <Col xs={12} md={8} lg={4} style={{textAlign:'center'}}>
                            <span style={{fontSize:'24px', fontFamily:'Georgia', fontWeight:'bold'}}>Your Receipt</span>
                        </Col>
                        <Col xs={6} md={8} lg={10} />
                    </Row>
                    <Row style={{ paddingTop:'5%', backgroundColor:'#F3F1EF'}}>
                        <Col xs={3} md={6} lg={8} /> 
                        <Col xs={18} md={12} lg={8} style={{textAlign:'center'}}>
                            <span style={{fontSize:'20px', fontFamily:'Georgia', fontWeight:'revert'}}>
                                <span>{format(startDate, 'dd/MM')} - {format(endDate, 'dd/MM')}, {diff} night(s)</span>
                                <hr/>
                            </span>
                        </Col>
                        <Col xs={3} md={6} lg={8} /> 
                    </Row>
                    <Row style={{ paddingTop:'5%', backgroundColor:'#F3F1EF'}}>
                        <Col xs={3} md={6} lg={8} /> 
                        <Col xs={18} md={12} lg={8} >
                            { showRooms() }
                        </Col>
                        <Col xs={3} md={6} lg={8} /> 
                    </Row>
                    <Row style={{ paddingTop:'5%', paddingBottom: '5%', backgroundColor:'#F3F1EF'}}>
                        <Col xs={3} md={6} lg={8} /> 
                        <Col xs={18} md={12} lg={8} >
                            <span style={{fontSize:'20px', fontFamily:'Georgia', fontWeight:'revert'}}>
                                <span>Total cost</span><br/>
                                <span>{slPhong} room(s) for {diff} night(s)</span><br/>
                                <span style={{fontSize:'25px', fontFamily:'Georgia', fontWeight:'bold'}}> {new Intl.NumberFormat().format(totalPrice)} USD</span>
                            </span>
                        </Col>
                        <Col xs={3} md={6} lg={8} /> 
                    </Row>
                    <Row style={{paddingTop:'5%',fontFamily:'Georgia', fontWeight:'revert'}}>
                        <Col xs={2} md={0} lg={0} /> 
                        <Col xs={20} md={0} lg={0} style={{textAlign:'center'}}><span style={{fontSize:'25px'}}>Total booking cost</span><hr/></Col>
                        <Col xs={2} md={0} lg={0} /> 
                    </Row>
                    <Row style={{fontFamily:'Georgia', fontWeight:'revert'}}>
                        <Col xs={2} md={0} lg={0} />
                        <Col xs={20} md={0} lg={0} style={{textAlign:'center'}}>
                            <span style={{fontWeight:'bold', fontSize:'25px'}}>
                                {new Intl.NumberFormat().format(totalPrice)} USD
                            </span>
                        </Col>
                        <Col xs={2} md={0} lg={0} />    
                    </Row>
                    <Row style={{ paddingTop:'2%', fontSize:'15px', fontFamily:'Georgia', fontWeight:'revert'}} className="button-Continue">
                        <Col xs={2} md={0} lg={0} />
                        <Col xs={20} md={0} lg={0} style={{textAlign:'center'}}>
                            <Button size="large" style={{width:'200px'}} onClick={ onSubmitBooking }><b>BOOKING</b></Button>
                        </Col>
                        <Col xs={2} md={0} lg={0} />
                    </Row>
                </Col>
                <Col xs={1} md={2} lg={3}></Col>
            </Row>
        </div>
    )
}
