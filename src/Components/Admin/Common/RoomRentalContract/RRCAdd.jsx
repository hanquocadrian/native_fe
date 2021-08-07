import { Button, Col, DatePicker, Input, Row, Select, Tooltip, Progress, message, Card, Divider, Checkbox, Empty } from 'antd'
import Form from 'antd/lib/form/Form'
import { getData } from 'Api/api'
import { url } from 'Api/url'
import { urnRoomByIdBooking } from 'Api/urn'
import { urnCustomerStay } from 'Api/urn'
import moment from 'moment'
import React, { useState, useEffect} from 'react'
import { ImCancelCircle } from 'react-icons/im'
import { Link } from 'react-router-dom'
import { format } from 'date-fns';
import { urnBookingWasDepositOrPaid } from 'Api/urn'
import { urnRRC } from 'Api/urn'
import { postData } from 'Api/api'
import { urnCustomerStayByDateSave } from 'Api/urn'

const { RangePicker } = DatePicker;

function RRCAdd(props) {
    const [dataBooking, setDataBooking] = useState([]);
    const [idDDP, setIdDDP] = useState();
    const [dataRooms, setDataRooms] = useState([]);
    const [maPhong, setMaPhong] = useState("");
    const [soNguoi, setSoNguoi] = useState(0);
    const [dataCusStay, setDataCusStay] = useState([]);
    const [dateA, setDateA] = useState(new Date());
    const [dateB, setDateB] = useState(new Date());
    const [trangThai, setTrangThai] = useState(0);

    const [chooseDataCusStay, setChooseDataCusStay] = useState([]);

    useEffect(() => {
        var uri = url + urnBookingWasDepositOrPaid;
        getData(uri).then((res) => setDataBooking(res.data));
            
        uri = url + urnCustomerStayByDateSave;
        postData(uri,{ date: format(new Date(), 'yyyy/MM/dd') }).then(res => setDataCusStay(res.data));
    },[]);

    useEffect(() => {
        var uri = url + urnRoomByIdBooking(idDDP);
        getData(uri).then((res) => setDataRooms(res.data));

        var booking = dataBooking.find(item => item.idDDP === idDDP);
        // console.log(booking);
        if(typeof booking !== 'undefined'){
            setDateA(new Date(booking.ngayDen));
            setDateB(new Date(booking.ngayDi));
            setTrangThai(booking.tinhTrang === 2 ? 2 : 1);
        }

        setMaPhong('');
        setSoNguoi(0);
    },[idDDP, dataBooking]);

    useEffect(() => {
        var room = dataRooms.find(item => item.maPhong === maPhong);
        // console.log(room);
        if(typeof room !== 'undefined'){
            setSoNguoi(room.soNguoi);
        }
    },[maPhong, dataRooms]);

    const preventChooseCus = (value) => {
        if(chooseDataCusStay.length === soNguoi){
            if(chooseDataCusStay.includes(value)){
                return false;
            } else {
                return true;
            }
        }
    }

    const onReset = () => {
        setDataRooms([]);
        setIdDDP();
        setMaPhong("");
        setSoNguoi(0);
        setDateA(new Date());
        setDateB(new Date());
        setTrangThai(0);
        setChooseDataCusStay([]);
    }

    const onCreate = () => {
        if(trangThai === 0 || maPhong === "" || idDDP === undefined || chooseDataCusStay.length === 0)
        {
            return message.error("Please, fill out all the fields!");
        }   
        chooseDataCusStay.map((item, i) => {
            const data = {
                idPTP: null,
                ngayDen: format(new Date(dateA), 'yyyy/MM/dd'),
                ngayDi: format(new Date(dateB), 'yyyy/MM/dd'),
                trangThai,
                maPhong,
                idDDP,
                idKHO: item
            };
            // console.log(data);
            var uri = url + urnRRC;
            postData(uri, data)
            .then(res => {
                if(res.data){    
                    if(i === (chooseDataCusStay.length - 1)){
                        message.success("Add completed, wait a few seconds the fields are reset");
                        onReset();
                    }    
                }
                else if(res.response.data) {
                    message.error(res.response.data);
                }
            })
        })
    }

    return (
        <>
            <div style={{ height: '3vh' }} />
            <Row>
                <Col xs={2} md={2} lg={2} />
                <Col xs={20} md={20} lg={20}>
                    <Row>
                        <Col xs={2} md={2} lg={2}>
                            <Tooltip placement="right" title="Back">
                                <Link to="/admin/rrc">
                                    <Button className="btn-close" id="btnAdd">
                                        <ImCancelCircle style={{ color: 'black' }} className="icon-top" />
                                    </Button>
                                </Link>
                            </Tooltip>
                        </Col>
                        <Col xs={20} md={20} lg={20}>
                            <h1 className="text-center"><b>CREATE A ROOM RENTAL CONTRACT</b></h1>
                        </Col>
                        <Col xs={2} md={2} lg={2} />
                    </Row>
                    <Form>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>ID booking:</b></Col>
                            <Col xs={18} md={18} lg={18}>
                                <Select value={idDDP} style={{width: '100%'}} onChange={value => setIdDDP(value)}>
                                {
                                    dataBooking.map((item, index) => 
                                        <Select.Option key={index} value={item.idDDP}>{item.idDDP}</Select.Option>
                                    )
                                }
                                </Select>
                            </Col>
                        </Row>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>ID room:</b></Col>
                            <Col xs={18} md={18} lg={18}>
                                <Select value={maPhong} style={{width: '100%'}} onChange={value => {setMaPhong(value);}}>
                                {
                                    dataRooms.map((item, index) => 
                                        <Select.Option key={index} value={item.maPhong}>{item.maPhong}</Select.Option>
                                    )
                                }
                                </Select>
                            </Col>
                        </Row>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>Dates:</b></Col>
                            <Col xs={18} md={18} lg={18}>
                                <RangePicker value={[moment(dateA, 'DD/MM/YYYY'), moment(dateB, 'DD/MM/YYYY')]} disabled />
                            </Col>
                        </Row>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>Number of guest(s):</b></Col>
                            <Col xs={4} md={4} lg={4}><Input type="number" value={soNguoi} disabled /></Col>
                        </Row>
                        <Row className="mb-30">
                            <Col xs={6} md={6} lg={6}><b>Status:</b></Col>
                            <Col xs={18} md={18} lg={18}>
                                <Row>
                                    <Col xs={10} md={0} lg={0}>
                                        <Progress percent={ trangThai === 2 ? 30 : trangThai === 1 ? 75 : trangThai === 3 ? 100 : 0 } steps={3} showInfo={false} />
                                    </Col>
                                    <Col xs={0} md={14} lg={18}>
                                        <Progress
                                            strokeColor={{
                                                '0%': '#108ee9',
                                                '100%': '#87d068',
                                            }}
                                            percent={ trangThai === 2 ? 30 : trangThai === 1 ? 60 : trangThai === 3 ? 100 : 0 }
                                            status="active"
                                            showInfo={false}
                                        />
                                    </Col>
                                    <Col xs={14} md={10} lg={6} style={{textAlign: 'end'}}>
                                        { trangThai === 1 ? 'Payment completed' : trangThai === 2 ? 'Deposit completed' : trangThai === 3 ? 'Went' : 'Undefined' } 
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="mb-20">
                        <Col xs={24} md={24} lg={24}>
                            <Card size="small" style={{padding: '0 5vw 2vh'}}>
                                <Row style={{ fontFamily: 'Georgia' }}>
                                    <Col xs={24} md={24} lg={24} style={{ textAlign: 'center', padding: '0'}}>
                                        <h1><b>CUSTOMER STAY (new)</b></h1>
                                    </Col>
                                </Row>
                                <Divider style={{margin: '0 0 15px 0'}} />
                                <Row style={{maxHeight: '255px', overflow: 'scroll'}}>
                                    <Col xs={24} md={24} lg={24} style={{ textAlign:'center' }}>
                                        <Checkbox.Group value={chooseDataCusStay} onChange={(checkedValues) => {setChooseDataCusStay(checkedValues)}} style={{marginTop: '6px'}}>
                                            <Row className="mb-15">
                                                {
                                                    (dataCusStay.length === 0) && (
                                                        <Empty description = {
                                                                <span>
                                                                    No more customer stay today
                                                                </span>
                                                            } 
                                                        />
                                                    )
                                                }
                                                {
                                                    dataCusStay.map((item, index) => 
                                                        <Col xs={24} md={12} lg={8} style={{textAlign:'center'}} className="mb-15">
                                                            <Checkbox key={index} value={item.idKHO} disabled={preventChooseCus(item.idKHO)}>
                                                                <p>
                                                                    {item.idKHO}_{item.tenKH} <br />
                                                                    CMND: {item.CMND} <br />
                                                                    Passport: {item.Passport} <br />
                                                                </p>
                                                            </Checkbox>
                                                        </Col> 
                                                    )
                                                }
                                            </Row>
                                        </Checkbox.Group>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                        <Row justify="end">
                            <Col xs={6} md={4} lg={2}>
                                <Button size="large" onClick={ onReset } className="btn-reset">Reset</Button>
                            </Col>
                            <Col xs={6} md={4} lg={2}>
                                <Button size="large" onClick={ onCreate } className="btn-create">Create</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
                <Col xs={2} md={2} lg={2} />
            </Row>
        </>
    )
}

export default RRCAdd

