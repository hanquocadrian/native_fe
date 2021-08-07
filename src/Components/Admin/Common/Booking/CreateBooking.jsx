import { Row, Col, Tooltip, Button, Form, Input, DatePicker, Card, Divider, Spin, Table, message } from 'antd';
import { getData, postData, putData, deleteData } from 'Api/api';
import { url } from 'Api/url';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeCartBookingRoom, saveItemCartBookingRoom } from 'ReduxConfig/Actions/cartBookingRoom';
import { updDatesBookingRoom } from 'ReduxConfig/Actions/chooseDatesBookingRoom';
import moment from 'moment';
import { urnRoomTypeSearchByDates } from 'Api/urn';
import { format, differenceInDays } from 'date-fns';
import CurrencyFormat from 'react-currency-format';
import { ImCancelCircle } from 'react-icons/im';
import { urnKhdByEmail, urnUserByEmail, urnRoomTypeRateIDLP, urnKhdID, urnBooking, urnBookingDetail, urnSaleOffByCost, urnBill, urnRoomsByDatesIdRoomTypeNumber, urnBillDetail, urnBillID } from 'Api/urn';

const { RangePicker } = DatePicker;


function ShowPrice(props) {
    const [gia, setGia] = useState(0);
    useEffect(() => {
        getData(url + urnRoomTypeRateIDLP(props.idLP))
        .then(rateLP => setGia(rateLP.data))
    }, [props]);
    return (
        <>
            <CurrencyFormat value={gia ? gia : 0} displayType={'text'} thousandSeparator={true} prefix={'$'} />
        </>
    )
}

function ActionsBookingRoom(props) {
    const dispatch = useDispatch();

    const roomType = props.roomType;
    const cartBookingRoom = useSelector(state => state.cartBookingRoomReducer.arrItem);
    const [soLuongDat, setSoLuongDat] = useState(0);
    
    useEffect(() => {
        let found = cartBookingRoom.find(item => item.idLP === roomType.idLP);
        if(found) {
            setSoLuongDat(found.slDat);
        } else {
            setSoLuongDat(0);
        }
    },[props])

    const choose = e => {
        setSoLuongDat(parseInt(e.target.value))
    }

    const onSave = () => {
        console.log(roomType.idLP, soLuongDat);
        var uri = url + urnRoomTypeRateIDLP(roomType.idLP);
        getData(uri)
        .then(rateLP => {
            if (rateLP.data) {
                console.log(rateLP);
                var sl = parseInt(soLuongDat, 10);
                var rt = {
                    idLP: roomType.idLP,
                    tenLP: roomType.tenLP,
                    hangPhong: roomType.hangPhong,
                    giaLP: rateLP.data,
                    slDat: parseInt(soLuongDat, 10)
                }
                console.log('objLP: ', rt);
                if (cartBookingRoom.length === 0) {
                    if (sl <= 10) {
                        const actionSaveCartBooking = saveItemCartBookingRoom(rt);
                        dispatch(actionSaveCartBooking);
                    }
                    else {
                        message.error("You only book 10 rooms!!!");
                        return;
                    }
                }
                else {
                    var test = 0;
                    cartBookingRoom.map(item => {
                        test += item.slDat;
                        return 1;
                    })
                    test += sl;
                    console.log('test: ', test);
                    if (test <= 10) {
                        const actionSaveCartBooking = saveItemCartBookingRoom(rt);
                        dispatch(actionSaveCartBooking);
                    }
                    else {
                        message.error("You only book 10 rooms!!!");
                        return;
                    }
                }
            }
        })
    }

    return (
        <>
            <Row>
                <Tooltip placement="top" title={<span>Booking quantity</span>}>
                    <Col xs={12} md={12} lg={12}>
                        <Input type="number" min="0" max={props.maxSLD} value={soLuongDat} onChange={ choose } />
                    </Col>
                </Tooltip>
                <Col xs={12} md={12} lg={12}><Button onClick={ onSave }>SAVE</Button></Col>
            </Row>
        </>
    )
}

function CreateBooking(props) {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [idKHD, setIdKHD] = useState('');
    const [tenKH, setTenKH] = useState('');
    const [sdt, setSDT] = useState('');
    const [cmnd, setCMND] = useState('');
    const [passport, setPassport] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [checkEmail, setCheckEmail] = useState(false);

    const [isLoading, setisLoading] = useState(false);
    const [roomTypeCanBooking, setroomTypeCanBooking] = useState([]);
    
    const [dateA, setDateA] = useState(useSelector(state => state.chooseDatesBookingRoomReducer.dateA));
    const [dateB, setDateB] = useState(useSelector(state => state.chooseDatesBookingRoomReducer.dateB));
    const [daysDiff, setDaysDiff] = useState(useSelector(state => state.chooseDatesBookingRoomReducer.daysDiff));

    const chooseDataRoomType = useSelector(state => state.cartBookingRoomReducer.arrItem);
    const tongThanhTien = useSelector(state => state.cartBookingRoomReducer.totalCost);
    const [cash, setCash] = useState(0);

    useEffect(() => {
        setDaysDiff(differenceInDays(new Date(dateB), new Date(dateA)));
    },[dateA, dateB])

    const columns = [
        {
            title: '#',
            dataIndex: 'idLP',
            align: 'center', 
            width: 50
        },
        {
            title: 'Title',
            dataIndex: 'tenLP',
            align: 'center', 
            width: 150
        },
        {
            title: 'Kinds of room',
            dataIndex: 'hangPhong',
            render: hangPhong => (
                <>
                    <b>{hangPhong}</b> Stars
                </>
            ),
            align: 'center', 
            width: 150
        },
        {
            title: 'Number of rooms',
            dataIndex: 'soLuong',
            align: 'center',
            width: 100
        },
        {
            title: 'Price',
            render: (record) => (
                <ShowPrice idLP={record.idLP}/>
            ),
            align: 'center',
            width: 100
        },
        {
            title : 'Action cart',
            align: 'center', 
            render: (record) => (
                <ActionsBookingRoom roomType={record} maxSLD={record.soLuong} />
            ), 
            width: 100
        }
    ]

    useEffect(() => {
        var money = 0;
        if(chooseDataRoomType.length > 0){
            money = daysDiff * tongThanhTien;
        }
        setCash(money);
    },[tongThanhTien])

    const onChooseDate = (date, dateString) => {
        setDateA(dateString[0]);
        setDateB(dateString[1]);
    }

    useEffect(() => {
        setroomTypeCanBooking([]);
        setisLoading(true);
        console.log("dateA: ", dateA);
        console.log("dateB: ", dateB);
        if(new Date(dateA) < new Date()){
            return message.error(` Date hasn't chosen yet or date has past`);
        }
        if(dateA === "" || dateB === ""){ 
            setisLoading(false); 
            return message.error("You must choose date!") 
        }
        const data = {
            dateA,
            dateB
        };
        const actionChosenDatesBookingRoom = updDatesBookingRoom(data);
        dispatch(actionChosenDatesBookingRoom);

        const actionRemoveCartBookingRoom = removeCartBookingRoom();
        dispatch(actionRemoveCartBookingRoom);
        console.log("data: ", data);
        var uri = url + urnRoomTypeSearchByDates; 
        postData(uri, data)
        .then(res => {
            setroomTypeCanBooking(res.data);
            setisLoading(false);
        })
    }, [dateA, dateB])

    function disabledDate(current) {
        // Can not select days before today and today
        return current && current < moment().endOf('day');
    }

    const checkEmailExistence = () => {
        const dataEmail = {
            email
        }
        var uri = url + urnKhdByEmail;
        postData(uri, dataEmail)
        .then(resKHD => {
            console.log("resKHD.data: ", resKHD.data);
            if (resKHD.data) {
                setIdKHD(resKHD.data[0].idKHD);
                setTenKH(resKHD.data[0].tenKH);
                setSDT(resKHD.data[0].sdt);
                setCMND(resKHD.data[0].CMND);
                setPassport(resKHD.data[0].Passport);
                setCheckEmail(true);
                var uri1 = url + urnUserByEmail;
                postData(uri1, dataEmail)
                .then(resUser => {
                    console.log("resUSer.data: ", resUser.data);
                    if (resUser.data) {
                        setDisplayName(resUser.data[0].displayName);
                    }
                })
            }
            else {
                message.error("Email does not exist in system!");
                return;
            }
        })
    }

    const onClickCancelButton = () => {
        const data = {
            dateA: (new Date()).getTime() +  (1 * 24 * 60 * 60 * 1000),
            dateB: (new Date()).getTime() +  (1 * 24 * 60 * 60 * 1000),
        };

        const actionChosenDatesBookingRoom = updDatesBookingRoom(data);
        dispatch(actionChosenDatesBookingRoom);

        const actionRemoveCartBookingRoom = removeCartBookingRoom();
        dispatch(actionRemoveCartBookingRoom);
        return props.propsParent.history.push('/admin/booking');
    }

    const onCreateBookingRoom = () => {
        if(cmnd === null || tenKH === '' || email === '' || sdt.length < 10){
            message.error("Please, fill out all the fields!");
            return;
        }
        var dataKHD = {
            tenKH,
            sdt,
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
                var dataDDP = {
                    ngayDen: dateA,
                    ngayDi: dateB,
                    soDem: daysDiff,
                    ngayDatPhong: format(new Date(), "yyyy/MM/dd"),
                    tongThanhTien: cash,
                    trangThaiDat: 0,
                    idKHD
                }
                const uri2 =  url + urnBooking;
                postData(uri2, dataDDP)
                .then( resDDP => {
                    if (resDDP.data) {
                        console.log('resDDP.data: ', resDDP.data);
                        var arrCTDDP = [];
                        chooseDataRoomType.map(item => {
                            let dataCTDDP = {
                                donGia: item.giaLP,
                                idDDP: resDDP.data,
                                idLP: item.idLP,
                                soLuong: item.slDat
                            }
                            arrCTDDP.push(dataCTDDP);
                            let uri3 = url + urnBookingDetail;
                            postData(uri3, dataCTDDP)
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
                        var arrRooms = [];
                        var arrCTPTTnew = [];

                        var tongTienPhong = cash;
                        var tienCoc = tongTienPhong * (30/100);
                        var phiPhatSinh = 0;
                        const uri4 = url + urnSaleOffByCost;
                        postData(uri4,{tongTienPhong, phiPhatSinh})
                        .then(resSaleOff => {
                            var phanTramGiam = resSaleOff.data.phanTramGiam;
                            var tongTienConLai = ((tongTienPhong - tienCoc) - (tongTienPhong - tienCoc) * (phanTramGiam / 100)) + (tienCoc - tienCoc * (phanTramGiam / 100)) + (phiPhatSinh - phiPhatSinh * (phanTramGiam / 100));

                            var dataPTTP = {
                                ngayThanhToan: format(new Date(), "yyyy/MM/dd"),
                                tinhTrang: 1,
                                tongTienPhong,
                                tienCoc,
                                phiPhatSinh,
                                phanTramGiam,
                                tongTienConLai,
                                idKM: resSaleOff.data.idKM,
                                idKHD,
                                idDDP: resDDP.data,
                                ngayDen: dateA,
                                ngayDi: dateB,
                                soDem: daysDiff
                            }
                            const uri5 = url + urnBill;
                            postData(uri5, dataPTTP)
                            .then((resPTTP) => {
                                arrCTDDP.map((item) => {
                                    for (let j = 0; j < item.soLuong; j++) {
                                        arrCTPTTnew.push({ donGia: item.donGia, idPTT: resPTTP.data, maPhong: "", idLP: item.idLP });
                                    }
                                    return 1;
                                })
                                var count1 = 0;
                                arrCTDDP.map((item) => {
                                    var dataSearchRoooms = { 
                                        dateA, 
                                        dateB, 
                                        idLP: item.idLP, 
                                        soLuong: item.soLuong 
                                    };
                                    const uri6 = url + urnRoomsByDatesIdRoomTypeNumber;
                                    postData(uri6, dataSearchRoooms)
                                    .then((resSearchRooms) => {
                                        count1++;
                                        if(resSearchRooms.data){
                                            arrRooms = resSearchRooms.data;
                                            var i = 0;
                                            arrCTPTTnew.map((item) => {
                                                if (item.idLP === dataSearchRoooms.idLP) {
                                                    arrCTPTTnew[arrCTPTTnew.findIndex(x => x === item)].maPhong = arrRooms[i++];
                                                }
                                                return 1;
                                            })
                                            if (count1 === arrCTDDP.length) {
                                                var count2 = 0;
                                                arrCTPTTnew.map((item) => {
                                                    const uri7 = url + urnBillDetail;
                                                    postData(uri7, item)
                                                    .then((res) => {
                                                        count2++;
                                                        if (count2 === arrCTPTTnew.length) {
                                                            message.success("Booking successfully, wait a few seconds", 2).then(()=>{
                                                                const dataDate = {
                                                                    dateA: (new Date()).getTime() +  (1 * 24 * 60 * 60 * 1000),
                                                                    dateB: (new Date()).getTime() +  (1 * 24 * 60 * 60 * 1000),
                                                                };
                                                        
                                                                var actionChosenDatesBookingRoom = updDatesBookingRoom(dataDate);
                                                                dispatch(actionChosenDatesBookingRoom);
                                                                var actionRemoveCartBookingRoom = removeCartBookingRoom();
                                                                dispatch(actionRemoveCartBookingRoom);
                                                                return props.propsParent.history.push('/admin/bill-detail/' + resPTTP.data);
                                                            })
                                                        }
                                                    })
                                                    return 1;
                                                })
                                            }
                                        } else if(resSearchRooms.response.data) {
                                            let uriDelete = url + urnBillID(resPTTP.data);
                                            deleteData(uriDelete).then(resDeleteBill => { 
                                                return message.error(resSearchRooms.response.data);
                                            })
                                        }
                                    })
                                    return 1;
                                })
                            })            
                        })
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
        <>
             <Row style={{ paddingTop: '3vh', height: '90vh', overflow: "scroll"}}>
                <Col xs={2} md={2} lg={2} />
                <Col xs={20} md={20} lg={20}>
                    <Row className="mb-15">
                        <Col xs={2} md={2} lg={2}>
                            <Tooltip placement="right" title="Back">
                                <Button className="btn-close" id="btnAdd" onClick={ onClickCancelButton }>
                                    <ImCancelCircle style={{ color: 'black' }} className="icon-top" />
                                </Button>
                            </Tooltip>
                        </Col>
                        <Col xs={20} md={20} lg={20}>
                            <h1 className="text-center"><b>CREATE BOOKING ROOM FOR CUSTOMER</b></h1>
                        </Col>
                        <Col xs={2} md={2} lg={2} />
                    </Row>
                    <Row className="mb-30">
                        <Col xs={1} md={1} lg={1} />
                        <Col xs={22} md={22} lg={22}>
                            <Form>
                                <Card size="small" style={{padding: '0 5vw 2vh'}}>
                                    <Row style={{ fontFamily: 'Georgia' }}>
                                        <Col xs={24} md={24} lg={24} style={{ textAlign: 'center', padding: '0'}}><h1><b>CUSTOMER BOOKING</b></h1></Col>
                                    </Row>
                                    <Divider style={{margin: '0'}} />
                                    <Row className="mb-20 mt-20">
                                        <Col xs={5} md={5} lg={5} style={{lineHeight: '32px', textAlign: 'end' }}><b>Email:</b></Col>
                                        <Col xs={1} md={1} lg={1} />
                                        <Col xs={13} md={13} lg={13}><Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /></Col>
                                        <Col xs={3} md={3} lg={3}>
                                            <Tooltip placement="right" title="Check email existence in system">
                                                <Button onClick={ checkEmailExistence }>CHECK</Button>
                                            </Tooltip>
                                        </Col>
                                        <Col xs={2} md={2} lg={2} />
                                    </Row>
                                    <Row className="mb-20 mt-20">
                                        <Col xs={5} md={5} lg={5} style={{lineHeight: '32px', textAlign: 'end' }}><b>ID:</b></Col>
                                        <Col xs={1} md={1} lg={1} />
                                        <Col xs={16} md={16} lg={16}><Input placeholder="ID customer booking" value={idKHD} onChange={e => setIdKHD(e.target.value)} readOnly /></Col>
                                        <Col xs={2} md={2} lg={2} />
                                    </Row>
                                    <Row className="mb-20 mt-20">
                                        <Col xs={5} md={5} lg={5} style={{lineHeight: '32px', textAlign: 'end' }}><b>Full name:</b></Col>
                                        <Col xs={1} md={1} lg={1} />
                                        {
                                            checkEmail ? 
                                            (<Col xs={16} md={16} lg={16}><Input placeholder="Full name" value={tenKH} onChange={e => setTenKH(e.target.value)} /></Col>) :
                                            (<Col xs={16} md={16} lg={16}><Input placeholder="Full name" value={tenKH} disabled/></Col>)
                                        }
                                        <Col xs={2} md={2} lg={2} />
                                    </Row>
                                    <Row className="mb-20 mt-20">
                                        <Col xs={5} md={5} lg={5} style={{lineHeight: '32px', textAlign: 'end' }}><b>Phone:</b></Col>
                                        <Col xs={1} md={1} lg={1} />
                                        {
                                            checkEmail ? 
                                            (<Col xs={16} md={16} lg={16}><Input placeholder="Phone (required)" value={sdt} onChange={e => setSDT(e.target.value)} /></Col>) :
                                            (<Col xs={16} md={16} lg={16}><Input placeholder="Phone (required)" value={sdt} disabled/></Col>)
                                        }
                                        <Col xs={2} md={2} lg={2} />
                                    </Row>
                                    <Row className="mb-20 mt-20">
                                        <Col xs={5} md={5} lg={5} style={{lineHeight: '32px', textAlign: 'end' }}><b>Identity card:</b></Col>
                                        <Col xs={1} md={1} lg={1} />
                                        {
                                            checkEmail ? 
                                            (<Col xs={16} md={16} lg={16}><Input placeholder="Identity card (required)" value={cmnd} onChange={e => setCMND(e.target.value)} /></Col>) :
                                            (<Col xs={16} md={16} lg={16}><Input placeholder="Identity card (required)" value={cmnd} disabled/></Col>)
                                        }
                                        <Col xs={2} md={2} lg={2} />
                                    </Row>
                                    <Row className="mb-20 mt-20">
                                        <Col xs={5} md={5} lg={5} style={{lineHeight: '32px', textAlign: 'end' }}><b>Passport:</b></Col>
                                        <Col xs={1} md={1} lg={1} />
                                        {
                                            checkEmail ? 
                                            (<Col xs={16} md={16} lg={16}><Input placeholder="Passport (not required)" value={passport} onChange={e => setPassport(e.target.value)} /></Col>) :
                                            (<Col xs={16} md={16} lg={16}><Input placeholder="Passport (not required)" value={passport} disabled/></Col>)
                                        }
                                        <Col xs={2} md={2} lg={2} />
                                    </Row>
                                </Card>
                            </Form>  
                        </Col>
                        <Col xs={1} md={1} lg={1} />
                    </Row>
                    <hr/>
                    <Row className="mb-15" style={{ fontFamily: 'Georgia' }}>
                        <Col xs={2} md={2} lg={2}/>
                        <Col xs={20} md={20} lg={20}>
                            <h1 className="text-center"><b>BOOKING ROOM</b></h1>
                        </Col>
                        <Col xs={2} md={2} lg={2} />
                    </Row>
                    <Row className="mb-30">
                        <Col xs={1} md={1} lg={1} />                          
                        <Col xs={22} md={22} lg={22}>
                            <Row justify="center">
                                <Col xs={24} md={5} lg={4} style={{ lineHeight: '32px' }}>
                                    <b>Search by date:</b> 
                                </Col>
                                <Col xs={24} md={15} lg={16}>
                                    <RangePicker 
                                        defaultValue={
                                            [
                                                moment(new Date(dateA), 'DD/MM/YYYY'), 
                                                moment(new Date(dateB), 'DD/MM/YYYY')
                                            ]
                                        } 
                                        disabledDate={disabledDate} 
                                        onChange={ onChooseDate } 
                                    />
                                </Col>
                                <Col xs={24} md={2} lg={2} style={{ lineHeight: '32px' }}>
                                    <b>Night(s):</b> 
                                </Col>
                                <Col xs={24} md={2} lg={2} style={{ textAlign:'end' }}>
                                    <Input type="number" value={daysDiff} readOnly />
                                </Col>
                            </Row>
                            <hr />
                            <Row className="mb-20">
                                <Col xs={24} md={24} lg={24}>
                                    {
                                        isLoading ? (
                                            <>
                                                <div style={{ minHeight: '314px' }}>
                                                    <Spin style={{ position: 'relative', top: "100px", paddingLeft: "450px"}} size="large" />
                                                </div>
                                            </>
                                        ) : (
                                            <Table
                                                bordered
                                                columns={ columns } 
                                                dataSource={ roomTypeCanBooking } 
                                                pagination={{ pageSize: 4, position: ['topRight', 'none'] }}    
                                                footer={() => 
                                                    <>
                                                        <Row>
                                                            <Col xs={18} md={18} lg={18} style={{textAlign:'end', fontWeight:'bolder'}}>Number room type chosen: </Col>
                                                            <Col xs={2} md={2} lg={2} />
                                                            <Col xs={4} md={4} lg={4}>
                                                                {chooseDataRoomType.length || 0} room(s)
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xs={18} md={18} lg={18} style={{textAlign:'end', fontWeight:'bolder'}}>Total cost per room(s): </Col>
                                                            <Col xs={2} md={2} lg={2} />
                                                            <Col xs={4} md={4} lg={4}>
                                                                <CurrencyFormat value={tongThanhTien || 0} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xs={18} md={18} lg={18} style={{textAlign:'end', fontWeight:'bolder'}}>Night(s): </Col>
                                                            <Col xs={2} md={2} lg={2} />
                                                            <Col xs={4} md={4} lg={4}>
                                                                {daysDiff || 0}
                                                            </Col>
                                                        </Row>
                                                        <Divider />
                                                        <Row>
                                                            <Col xs={18} md={18} lg={18} style={{textAlign:'end', fontWeight:'bolder'}}>Total cost: </Col>
                                                            <Col xs={2} md={2} lg={2} />
                                                            <Col xs={4} md={4} lg={4}>
                                                                <CurrencyFormat value={cash || 0} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                                            </Col>
                                                        </Row>
                                                    </>
                                                }                                         
                                            />  
                                        )
                                    }
                                </Col>
                            </Row>
                            <Row className="mb-20">
                                <Col xs={24} md={24} lg={24} style={{ textAlign:'center' }}>
                                    <Button size="large" className="btn-create" onClick={ onCreateBookingRoom }>CREATE</Button>
                                </Col>
                            </Row>  
                        </Col>
                        <Col xs={1} md={1} lg={1} />   
                    </Row>
                </Col>
                <Col xs={2} md={2} lg={2} />
            </Row>
        </>
    )
}
export default CreateBooking