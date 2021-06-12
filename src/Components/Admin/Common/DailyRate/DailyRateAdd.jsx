import { Button, Col, DatePicker, Input, message, Row, Select, Tooltip } from 'antd'
import Form from 'antd/lib/form/Form'
import { Option } from 'antd/lib/mentions'
import { postData } from 'Api/api'
import { getData } from 'Api/api'
import { url } from 'Api/url'
import { urnDailyRate } from 'Api/urn'
import { urnRoomType } from 'Api/urn'
import { format } from 'date-fns'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { ImCancelCircle } from 'react-icons/im'
import { Link } from 'react-router-dom'

function DailyRateAdd(props) {
    const [dataRoomTypes, setdataRoomTypes] = useState([]);

    const [ngayBatDau, setngayBatDau] = useState(new Date());
    const [giaMoiTuan, setgiaMoiTuan] = useState(0);
    const [idLP, setidLP] = useState('');
    
    useEffect(() => {
        try {
            var uri = url + urnRoomType;

            getData(uri)
            .then(res => setdataRoomTypes(res.data))
            .catch(err => console.error(err));
        } catch (error) {
            console.error(error);
        }
    }, []);
    
    useEffect(()=>{
        setidLP(typeof dataRoomTypes[0] !== 'undefined' ? dataRoomTypes[0].idLP : "");
    }, [dataRoomTypes])
    
    function onReset() {
        setngayBatDau(new Date());
        setgiaMoiTuan(0)
        setidLP(typeof dataRoomTypes[0] !== 'undefined' ? dataRoomTypes[0].idLP : "");
    }

    const onCreate = () => {
        var data = {
            ngayBatDau: format(new Date(ngayBatDau), 'yyyy-MM-dd') ,
            giaMoiTuan: parseFloat(giaMoiTuan),
            idLP
        }
        console.log(data);
        var uri = url + urnDailyRate;
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
                res.response.data.map(err => {
                    message.error(err.message);
                })
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
                                <Link to="/admin/daily-rate">
                                    <Button className="btn-close" id="btnAdd">
                                        <ImCancelCircle style={{ color: 'black' }} className="icon-top" />
                                    </Button>
                                </Link>
                            </Tooltip>
                        </Col>
                        <Col xs={20} md={20} lg={20}>
                            <h1 className="text-center"><b>CREATE DAILY RATE</b></h1>
                        </Col>
                        <Col xs={2} md={2} lg={2} />
                    </Row>
                    <Form>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>ID daily rate:</b></Col>
                            <Col xs={18} md={18} lg={18}><Input name="idGTN" placeholder="ID daily rate" disabled /></Col>
                        </Row>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>Rate:</b></Col>
                            <Col xs={18} md={18} lg={18}><Input  min={0} type="number" prefix="$" suffix="USD" name="giaMoiTuan" value={giaMoiTuan} onChange={ e => setgiaMoiTuan(e.target.value) } placeholder="Rate of room type in week" /></Col>
                        </Row>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>Room type title:</b></Col>
                            <Col xs={18} md={18} lg={18}>
                                <DatePicker value={ moment(ngayBatDau, 'YYYY/MM/DD') } onChange={ (date, dateString) => setngayBatDau(dateString? dateString: new Date()) } />
                            </Col>
                        </Row>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>Room type:</b></Col>
                            <Col xs={18} md={18} lg={18}>
                                <Select value={idLP}  style={{ width: 225}} onChange={value => setidLP(value)}>
                                    {
                                        typeof dataRoomTypes !== 'undefined' && dataRoomTypes.map((item, index) => 
                                        <>  
                                            <Option key={index} value={item.idLP}>{item.idLP} - {item.tenLP}</Option>
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

export default DailyRateAdd

