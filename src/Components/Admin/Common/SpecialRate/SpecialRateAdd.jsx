import { Button, Col, Input, message, Row, Select, Tooltip } from 'antd'
import Form from 'antd/lib/form/Form'
import { Option } from 'antd/lib/mentions'
import { postData } from 'Api/api'
import { getData } from 'Api/api'
import { url } from 'Api/url'
import { urnSpecialRate } from 'Api/urn'
import { urnDailyRate } from 'Api/urn'
import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { ImCancelCircle } from 'react-icons/im'
import { Link } from 'react-router-dom'

function SpecialRateAdd(props) {
    const [dataDailyRates, setdataDailyRates] = useState([]);
    const dayOfWeek = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];

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
    
    useEffect(()=>{
        setidGTN(typeof dataDailyRates[0] !== 'undefined' ? dataDailyRates[0].idGTN : "");
    }, [dataDailyRates])
    
    function onReset() {
        setthu(0);
        setgiaTheoThu(0);
        setidGTN(typeof dataDailyRates[0] !== 'undefined' ? dataDailyRates[0].idGTN : 0);
    }

    const onCreate = () => {
        var data = {
            thu,
            giaTheoThu: parseFloat(giaTheoThu),
            idGTN
        }
        console.log(data);
        var uri = url + urnSpecialRate;
        postData(uri, data)
        .then(res => {
            console.log('res: ', res);
            if(res.data !== undefined){
                message.success("Create successfully #"+res.data);
                onReset();
                return;
            }
            if(typeof res.response.data !== undefined){
                console.log("res.response.data: ", res.response.data);
                if(Array.isArray(res.response.data)){
                    res.response.data.map(err => {
                        return message.error(err.message);
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
                            <h1 className="text-center"><b>CREATE SPECIAL RATE</b></h1>
                        </Col>
                        <Col xs={2} md={2} lg={2} />
                    </Row>
                    <Form>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>ID special rate:</b></Col>
                            <Col xs={18} md={18} lg={18}><Input name="idGTT" placeholder="ID special rate" disabled /></Col>
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
                                <Select value={idGTN}  style={{ width: 225}} onChange={value => setidGTN(value)}>
                                    {
                                        typeof dataDailyRates !== 'undefined' && dataDailyRates.map((item, index) => 
                                        <>  
                                            <Option key={index} value={item.idGTN}>#{ item.idGTN } - { format(new Date(item.ngayBatDau), 'dd/MM/yyyy') } - IDLP: { item.idLP }</Option>
                                        </>)
                                    }
                                </Select>
                            </Col>
                        </Row>
                        
                        <Row justify="end">
                            <Col xs={2} md={2} lg={2}>
                                <Button size="large" onClick={ onReset } className="btn-reset">Reset</Button>
                            </Col>
                            <Col xs={2} md={2} lg={2}>
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

export default SpecialRateAdd

