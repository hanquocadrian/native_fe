import { Button, Col, Input, message, Row, Select, Tooltip, Popconfirm } from 'antd'
import Form from 'antd/lib/form/Form'
import { Option } from 'antd/lib/mentions'
import { putData } from 'Api/api'
import { getData } from 'Api/api'
import { url } from 'Api/url'
import { urnSpecialRateID } from 'Api/urn'
import { urnSpecialRate } from 'Api/urn'
import { urnDailyRate } from 'Api/urn'
import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { ImCancelCircle } from 'react-icons/im'
import { Link } from 'react-router-dom'

function SpecialRateUpd(props) {
    const [dataDailyRates, setdataDailyRates] = useState([]);
    const dayOfWeek = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];

    const [idGTT, setidGTT] = useState(props.idGTT);
    const [thu, setthu] = useState(0);
    const [giaTheoThu, setgiaTheoThu] = useState(0);
    const [idGTN, setidGTN] = useState(0);
    
    useEffect(() => {
        try {
            var uri = url + urnDailyRate;

            getData(uri)
            .then(res => setdataDailyRates(res.data))
            .catch(err => console.error(err));
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        try {
            var uri = url + urnSpecialRateID(idGTT);

            getData(uri)
            .then(res => {
                console.log(res.data);
                setthu(res.data.thu);
                setgiaTheoThu(res.data.giaTheoThu);
                setidGTN(res.data.idGTN)
            })
            .catch(err => console.error(err));
        } catch (error) {
            console.error(error);
        }
    }, []);
    
    function onReset() {
        try {
            var uri = url + urnSpecialRateID(idGTT);

            getData(uri)
            .then(res => {
                setthu(res.data.thu);
                setgiaTheoThu(res.data.giaTheoThu);
                setidGTN(res.data.idGTN)
            })
            .catch(err => console.error(err));
        } catch (error) {
            console.error(error);
        }
    }

    const onUpdate = () => {
        var data = {
            thu,
            giaTheoThu: parseFloat(giaTheoThu),
            idGTN
        }
        console.log(data);
        var uri = url + urnSpecialRateID(idGTT);
        putData(uri, data)
        .then(res => {
            console.log('res: ', res);
            if(res.data !== undefined){
                console.log("res upd: ", res);
                message.success("Update successfully, this page will redirect a few moments later", 3)
                .then(()=>{
                    return props.propsParent.history.push('/admin/special-rate/');
                })
            }
            if(typeof res.response.data !== undefined){
                console.log("res.response.data: ", res.response.data);
                if(Array.isArray(res.response.data)){
                    res.response.data.map(err => {
                        message.error(err.message);
                    })
                } else {
                    message.error(res.response.data);
                }
                return;
            }
        })
        .catch(err => console.log(err));
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
                                <Link to="/admin/special-rate">
                                    <Button className="btn-close" id="btnAdd">
                                        <ImCancelCircle style={{ color: 'black' }} className="icon-top" />
                                    </Button>
                                </Link>
                            </Tooltip>
                        </Col>
                        <Col xs={20} md={20} lg={20}>
                            <h1 className="text-center"><b>UPDATE SPECIAL RATE</b></h1>
                        </Col>
                        <Col xs={2} md={2} lg={2} />
                    </Row>
                    <Form>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>ID special rate:</b></Col>
                            <Col xs={18} md={18} lg={18}><Input value={ idGTT } name="idGTT" placeholder="ID special rate" disabled /></Col>
                        </Row>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>Rate:</b></Col>
                            <Col xs={18} md={18} lg={18}><Input type="number" min={0} prefix="$" suffix="USD" name="giaTheoThu" value={giaTheoThu} onChange={ e => setgiaTheoThu(e.target.value) } placeholder="Rate of room type in a day of the week" /></Col>
                        </Row>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>For day of the week:</b></Col>
                            <Col xs={18} md={18} lg={18}>
                                <Select value={thu}  style={{ width: 225}} onChange={value => setthu(value)}>
                                    {
                                        dayOfWeek.map((item, index) => 
                                        <>  
                                            <Option key={index} value={index}>{ item }</Option>
                                        </>)
                                    }
                                </Select>
                            </Col>
                        </Row>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>For daily rate:</b></Col>
                            <Col xs={18} md={18} lg={18}>
                                <Select value={ idGTN }  style={{ width: 225}} onChange={value => setidGTN(value)}>
                                    {
                                        typeof dataDailyRates !== undefined && dataDailyRates.map((item, index) => 
                                        <>  
                                            <Option key={index} value={item.idGTN}>#{ item.idGTN } - { format(new Date(item.ngayBatDau), 'dd/MM/yyyy') } - IDLP: { item.idLP }</Option>
                                        </>)
                                    }
                                </Select>
                            </Col>
                        </Row>
                        
                        <Row justify="end">
                            <Col xs={2} md={2} lg={2}>
                                <Popconfirm
                                    title="Are you sure to reload form?"
                                    onConfirm={ onReset }
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button size="large" className="btn-reset">Reset</Button>
                                </Popconfirm>
                            </Col>
                            <Col xs={2} md={2} lg={2}>
                                <Button size="large" onClick={ onUpdate } className="btn-update">Update</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
                <Col xs={2} md={2} lg={2} />
            </Row>
        </>
    )
}

export default SpecialRateUpd

