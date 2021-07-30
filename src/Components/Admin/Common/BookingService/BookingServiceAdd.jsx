import React from 'react'
import { Row, Col, Tooltip, Button, Form, Input, DatePicker, Card, Progress, Select, Divider, Checkbox, Table, message, Popconfirm, Empty } from 'antd';
import { Link } from 'react-router-dom';
import { ImCancelCircle } from 'react-icons/im';
import moment from 'moment';
import { useState, useEffect } from 'react';
import { url } from 'Api/url';
import { urnKhdWithStatusRRCIsUsing, urnService, urnBookingService } from 'Api/urn';
import { getData, postData } from 'Api/api';
import { urnBookingIdKHDWithRRCIsUsing } from 'Api/urn';
import { format } from 'date-fns';
import { urnRRCByIDKHDIDDDPWithRCCIsUsing } from 'Api/urn';
import { urnRRCByIDKHDWithRCCIsUsing } from 'Api/urn';
import { useDispatch, useSelector } from 'react-redux';
import { removeCartService, saveItemCartService } from 'ReduxConfig/Actions/cartService';
import { urnDetailBookingService } from 'Api/urn';
import CurrencyFormat from 'react-currency-format';
import { urnChangeStatusToCompletedByIddddv } from 'Api/urn';
import Paypal from 'Components/Common/Paypal/Paypal';


function ActionsBookingService(props) {
    const dispatch = useDispatch();
    const service = props.service;
    const cart = useSelector(state => state.cartServiceReducer.arrItem);
    const [soLuong, setSoLuong] = useState(0);
    
    useEffect(() => {
        let found = cart.find(item => item.idDV === service.idDV);
        if(found) {
            setSoLuong(found.soLuong);
        } else {
            setSoLuong(0);
        }
    },[props])

    const choose = e => {
        if(service.hinhThuc === 3 && parseInt(e.target.value) > 1){
            setSoLuong(1);
            message.error('only one for this free');
        } else {
            setSoLuong(parseInt(e.target.value))
        }
    }

    const onSave = () => {
        console.log(service.idDV, soLuong);
        var dv = {
            idCTDDV: null, 
            donGia: service.donGia, 
            hinhThuc: service.hinhThuc, 
            soLuong,
            idDDV: null, 
            idDV: service.idDV
        };
        const actionSaveCart = saveItemCartService(dv);
        dispatch(actionSaveCart);
    }

    return (
        <>
            <Row>
                <Col xs={12} md={12} lg={12}><Input type="number" min="0" value={soLuong} onChange={ choose } /></Col>
                <Col xs={12} md={12} lg={12}><Button onClick={ onSave }>SAVE</Button></Col>
            </Row>
        </>
    )
}

function BookingServiceAdd(props) {
    const dispatch = useDispatch();
    const [idKHD, setIdKHD] = useState();
    const ngayDat = new Date();
    const tongThanhTien = useSelector(state => state.cartServiceReducer.totalCost);
    const trangThai = 1;
    const [progress, setProgress] = useState(0);

    const [dataService, setDataService] = useState([]);
    const [dataKHD, setDataKHD] = useState([]);
    const [dataDDP, setDataDDP] = useState([]);
    const [dataRRC, setDataRRC] = useState([]);
    const [idDDP, setIdDDP] = useState();

    const [chooseDataRRC, setChooseDataRRC] = useState([]);
    const chooseDataService = useSelector(state => state.cartServiceReducer.arrItem);

    const [isCreateSuccess, setIsCreateSuccess] = useState(false);
    const [cash, setCash] = useState(0);
    const [dataIDDDV, setDataIDDDV] = useState([]);

    useEffect(() => {
        var uri = url + urnKhdWithStatusRRCIsUsing;
        getData(uri).then(res => { return setDataKHD(res.data || []) })

        uri = url + urnService;
        getData(uri).then(res => { return setDataService(res.data || []) })
    },[])

    useEffect(() => {
        setIdDDP();
        if(idKHD){
            var uri = url + urnBookingIdKHDWithRRCIsUsing(idKHD);
            getData(uri).then(res => { return setDataDDP(res.data || []) })
        }
    },[idKHD])

    useEffect(()=>{
        if(idKHD){
            console.log("idDDP", idDDP);
            var uri = "";
            if(!idDDP || idDDP === "-1"){
                uri = url + urnRRCByIDKHDWithRCCIsUsing(idKHD);
                getData(uri).then(res => { return setDataRRC(res.data || []) })
            } else if(idDDP){
                uri = url + urnRRCByIDKHDIDDDPWithRCCIsUsing;
                var data = {idKHD, idDDP};
                postData(uri, data).then(res => { return setDataRRC(res.data || []) }) 
            } 
        }
    },[idKHD, idDDP])

    useEffect(() => {
        var money = 0;
        if(chooseDataRRC.length > 0){
            money = chooseDataRRC.length * tongThanhTien;
        }
        setCash(money);
    },[tongThanhTien, chooseDataRRC])

    useEffect(() => {
        if(idKHD){
            if(idDDP && idDDP !== "-1"){
                setProgress(25);
            } else {
                setProgress(15);
            }
            if(chooseDataRRC.length !== 0){
                if(tongThanhTien !== 0){
                    setProgress(60);
                } else {
                    setProgress(40);
                }
            }
        }
    },[idKHD, idDDP, chooseDataRRC, tongThanhTien])

    const columns = [
        {
            title: 'CHOOSE BOOKING SERVICE',
            children: [
                {
                    title: '#',
                    dataIndex: 'idDV',
                    align: 'center', 
                    width: 50
                },
                {
                    title: 'Title',
                    dataIndex: 'tenDV',
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
                    title: 'Price',
                    dataIndex: 'donGia',
                    align: 'center', 
                    width: 150
                },
                {
                    title : 'Action cart',
                    align: 'center', 
                    render: (record) => (
                        <ActionsBookingService service={record} />
                    ), 
                    width: 100
                }
            ]
        }
        
    ]

    function processPaid() {
        var uri = "";
        dataIDDDV.map((idDDDV, i1) => {
            uri = url + urnChangeStatusToCompletedByIddddv(idDDDV);
            getData(uri);
            if(i1 === (dataIDDDV.length - 1)){
                message.success("Paid successfully, wait a few seconds").then(() =>{
                    const actionRemove = removeCartService();
                    dispatch(actionRemove);
                    return props.propsParent.history.push('/admin/booking-service')
                })
            }
        })
    }

    const onResultPay = (err, cancel, payment) => {
        if(err){
            message.error('Server Paypal has problem! Can you come back later?');
            return;
        } else if (cancel){
            message.warning('You was cancelled paid with Paypal');
            return;
        } else {
            var uri = "";
            dataIDDDV.map((idDDDV, i1) => {
                console.log("change status: ",idDDDV);
                uri = url + urnChangeStatusToCompletedByIddddv(idDDDV);
                getData(uri);
                if(i1 === (dataIDDDV.length - 1)){
                    message.success("Paid successfully, wait a few seconds").then(() =>{
                        const actionRemove = removeCartService();
                        dispatch(actionRemove);
                        return props.propsParent.history.push('/admin/booking-service')
                    })
                }
            })
        }
    }

    const onCreate = () => {
        if(chooseDataRRC.length === 0){
            return message.error("You must choose least one room rental contract");
        }
        if(chooseDataService.length === 0){
            return message.error("You must choose least one service");
        }
        var uri = "";
        chooseDataRRC.map((idPTP, i1) => {
            var bookingService = {
                idDDDV: null,
                ngayDat: format(new Date(ngayDat), 'yyyy-MM-dd'),
                tongThanhTien,
                trangThai,
                idPTP,
                idKHD
            }
            uri = url + urnBookingService;
            postData(uri, bookingService)
            .then(res => { 

                var arrIDDDV = dataIDDDV;
                arrIDDDV.push(res.data);
                setDataIDDDV(arrIDDDV);

                chooseDataService.map((item, i2) => {
                    var detailBookingService = {
                        idCTDDV: null,
                        donGia: item.donGia, 
                        hinhThuc: item.hinhThuc,
                        soLuong: item.soLuong,
                        idDDDV: res.data,
                        idDV: item.idDV
                    }
                    uri = url + urnDetailBookingService;
                    postData(uri, detailBookingService);
                    if(i1 === (chooseDataRRC.length - 1) && i2 === (chooseDataService.length - 1)){
                        setIsCreateSuccess(!isCreateSuccess);
                        message.success("Create booking service successfully");
                    }
                })
            })
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
                                <Button className="btn-close" id="btnAdd" 
                                    onClick={ () => {
                                        const actionRemove = removeCartService();
                                        dispatch(actionRemove);
                                        return props.propsParent.history.push('/admin/booking-service')
                                    }}
                                >
                                    <ImCancelCircle style={{ color: 'black' }} className="icon-top" />
                                </Button>
                            </Tooltip>
                        </Col>
                        <Col xs={20} md={20} lg={20}>
                            <h1 className="text-center"><b>CREATE BOOKING SERVICE FOR CUSTOMER</b></h1>
                        </Col>
                        <Col xs={2} md={2} lg={2} />
                    </Row>

                    <Row className="mb-30">
                        <Col xs={1} md={1} lg={1} />
                        <Col xs={22} md={22} lg={22}>
                            <Form>
                                <Card size="small" style={{padding: '0 5vw 2vh'}}>
                                    <Row style={{ fontFamily: 'Georgia' }}>
                                        <Col xs={24} md={24} lg={24} style={{ textAlign: 'center', padding: '0'}}><h1><b>BOOKING SERVICE</b></h1></Col>
                                    </Row>
                                    <Divider style={{margin: '0'}} />
                                    <Row className="mb-20 mt-20">
                                        <Col xs={5} md={5} lg={5} style={{lineHeight: '32px', textAlign: 'end' }}><b>ID booking service:</b></Col>
                                        <Col xs={1} md={1} lg={1} />
                                        <Col xs={16} md={16} lg={16}><Input placeholder="ID booking service" disabled /></Col>
                                        <Col xs={2} md={2} lg={2} />
                                    </Row>
                                    <Row className="mb-20">
                                        <Col xs={5} md={5} lg={5} style={{lineHeight: '32px', textAlign: 'end' }}><b>Customer booking:</b></Col>
                                        <Col xs={1} md={1} lg={1} />
                                        <Col xs={16} md={16} lg={16}>
                                            <Select value={idKHD} onChange={(value) => setIdKHD(value)}  style={{width: '100%'}} placeholder="Choose customer booking">
                                                { 
                                                    dataKHD.map((item, index) => <>
                                                        <Select.Option key={index} value={item.idKHD}>{'#' + item.idKHD}_{item.tenKH}</Select.Option>
                                                    </>)
                                                }
                                            </Select>
                                        </Col>
                                        <Col xs={2} md={2} lg={2} />
                                    </Row>
                                    <Row className="mb-20">
                                        <Col xs={5} md={5} lg={5} style={{lineHeight: '32px', textAlign: 'end' }}><b>Date booking:</b></Col>
                                        <Col xs={1} md={1} lg={1} />
                                        <Col xs={16} md={16} lg={16}>
                                            <DatePicker value={ moment(ngayDat, 'YYYY/MM/DD') } readOnly />
                                        </Col>
                                        <Col xs={2} md={2} lg={2} />
                                    </Row>
                                    <Row className="mb-20">
                                        <Col xs={5} md={5} lg={5} style={{lineHeight: '32px', textAlign: 'end'}}><b>Total price per rrc:</b></Col>
                                        <Col xs={1} md={1} lg={1} />
                                        <Col xs={16} md={16} lg={16}><Input min={0} type="number" prefix="$" suffix="USD" name="giaMoiTuan" value={tongThanhTien} readOnly/></Col>
                                        <Col xs={2} md={2} lg={2} />
                                    </Row>
                                    <Row className="mb-15">
                                        <Col xs={5} md={5} lg={5} style={{lineHeight: '18px', textAlign: 'end' }}><b>Status:</b></Col>
                                        <Col xs={1} md={1} lg={1} />
                                        <Col xs={14} md={14} lg={14}>
                                            <Progress percent={progress} size="small" status="active"/> 
                                        </Col>
                                        <Col xs={2} md={2} lg={2} style={{ textAlign: 'end'}}>
                                            { trangThai === 1 ? ' Unpaid' : ' Completed' }
                                        </Col>
                                        <Col xs={2} md={2} lg={2} />
                                    </Row>      
                                </Card>                     
                   
                            </Form>  
                        </Col>
                        <Col xs={1} md={1} lg={1} />
                    </Row>
                    <Row className="mb-20">
                        <Col xs={1} md={1} lg={1} />
                        <Col xs={22} md={22} lg={22}>
                            <Form>
                                <Card size="small" style={{padding: '0 5vw 2vh'}}>
                                    <Row style={{ fontFamily: 'Georgia' }}>
                                        <Col xs={24} md={24} lg={24} style={{ textAlign: 'center', padding: '0'}}><h1><b>ROOM RENTAL CONTRACT</b></h1></Col>
                                    </Row>
                                    <Divider style={{margin: '0'}} />
                                    <Row className="mb-20 mt-20">
                                        <Col xs={5} md={5} lg={5} style={{lineHeight: '32px', textAlign: 'end' }}><b>ID booking room:</b></Col>
                                        <Col xs={1} md={1} lg={1} />
                                        <Col xs={16} md={16} lg={16}>
                                            <Select value={idDDP} onChange={(value) => setIdDDP(value)} style={{width: '100%'}} placeholder="Choose booking room">
                                                <Select.Option value="-1">All</Select.Option>
                                                { 
                                                    dataDDP.map((item, index) => <>
                                                        <Select.Option key={index} value={item.idDDP}>{'#' + item.idDDP}_{format(new Date(item.ngayDatPhong), 'dd/MM/yyyy')}</Select.Option>
                                                    </>)
                                                }
                                            </Select>
                                        </Col>
                                        <Col xs={2} md={2} lg={2} />
                                    </Row>
                                    <Divider style={{margin: '0 0 20px 0'}} />
                                    <Row style={{height: '140px', overflow: 'scroll'}}>
                                        <Col xs={24} md={24} lg={24} style={{ textAlign:'center' }}>
                                            <Checkbox.Group onChange={(checkedValues) => {setChooseDataRRC(checkedValues)}} style={{marginTop: '6px'}}>
                                                <Row className="mb-15">
                                                    {
                                                        (dataRRC.length === 0) && (
                                                            <Empty description = {
                                                                    <span>
                                                                        You must select customer booking!
                                                                    </span>
                                                                } 
                                                            />
                                                        )
                                                    }
                                                    {
                                                        (dataRRC.length === 1) && (
                                                            dataRRC.map((item, index) => 
                                                                <Col xs={24} md={24} lg={24} style={{textAlign:'center'}} className="mb-15">
                                                                    <Checkbox key={index} value={item.idPTP}>
                                                                        {"[#" + item.idPTP + " | Booking: " + item.idDDP + " | Room: " + item.maPhong + "]" }
                                                                    </Checkbox>
                                                                </Col> 
                                                            )
                                                        ) 
                                                    }
                                                    {
                                                        ((dataRRC.length === 2) || (dataRRC.length === 3)) && (
                                                            dataRRC.map((item, index) => 
                                                                <Col xs={24} md={12} lg={12} style={{textAlign:'center', width: '100%'}} className="mb-15">
                                                                    <Checkbox key={index} value={item.idPTP}>
                                                                        {"[#" + item.idPTP + " | Booking: " + item.idDDP + " | Room: " + item.maPhong + "]" }
                                                                    </Checkbox>
                                                                </Col> 
                                                            )
                                                        ) 
                                                    }
                                                    {
                                                        (dataRRC.length > 3) &&  (
                                                            dataRRC.map((item, index) => 
                                                                <Col xs={24} md={12} lg={8} style={{textAlign:'center'}} className="mb-15">
                                                                    <Checkbox key={index} value={item.idPTP}>
                                                                        {"[#" + item.idPTP + " | Booking: " + item.idDDP + " | Room: " + item.maPhong + "]" }
                                                                    </Checkbox>
                                                                </Col> 
                                                            )
                                                        )
                                                    }
                                                </Row>
                                            </Checkbox.Group>
                                        </Col>
                                    </Row>
                                </Card>
                            </Form>  
                        </Col>
                        <Col xs={1} md={1} lg={1} />
                    </Row>
                    <Row className="mb-15">
                        <Col xs={1} md={1} lg={1} />                          
                        <Col xs={22} md={22} lg={22}>
                            <Row className="mb-20">
                                <Col xs={24} md={24} lg={24}>
                                    <Table 
                                        className="tbl-choose-service-admin"
                                        bordered
                                        columns={ columns } 
                                        dataSource={ dataService } 
                                        pagination={{ pageSize: 4, position: ['topRight', 'none'] }}    
                                        footer={() => 
                                            <>
                                                <Row>
                                                    <Col xs={18} md={18} lg={18} style={{textAlign:'end', fontWeight:'bolder'}}>Number service chosen: </Col>
                                                    <Col xs={2} md={2} lg={2} />
                                                    <Col xs={4} md={4} lg={4}>
                                                        {chooseDataService.length || 0} services
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs={18} md={18} lg={18} style={{textAlign:'end', fontWeight:'bolder'}}>Total cost per rrc: </Col>
                                                    <Col xs={2} md={2} lg={2} />
                                                    <Col xs={4} md={4} lg={4}>
                                                        <CurrencyFormat value={tongThanhTien || 0} displayType={'text'} thousandSeparator={true} prefix={'$'} /> per rrc
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs={18} md={18} lg={18} style={{textAlign:'end', fontWeight:'bolder'}}>Number room rental contract: </Col>
                                                    <Col xs={2} md={2} lg={2} />
                                                    <Col xs={4} md={4} lg={4}>
                                                        { chooseDataRRC.length || 0} rrc
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
                                </Col>
                            </Row>
                            <Row className="mb-20">
                                <Col xs={24} md={24} lg={24} style={{ textAlign:'center' }}>
                                {
                                    isCreateSuccess ? (
                                        <Row>
                                            <Col xs={11} md={11} lg={11} style={{textAlign:'right'}}>
                                                <Popconfirm
                                                    title={"Customer accept paid for this bill with $" + cash}
                                                    onConfirm={ processPaid }
                                                    okText="Yes"
                                                    cancelText="No"
                                                >
                                                    <Button className="btn-create">CASH SETTLE</Button>
                                                </Popconfirm>
                                            </Col>
                                            <Col xs={2} md={2} lg={2} />
                                            <Col xs={11} md={11} lg={11} style={{textAlign:'left'}}>
                                                <Paypal total={ cash } onResultPay={ onResultPay } />
                                            </Col>
                                        </Row>
                                    ) : (

                                        <Button size="large" onClick={ onCreate } className="btn-create">Create & Paid now</Button>
                                    )
                                }
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

export default BookingServiceAdd