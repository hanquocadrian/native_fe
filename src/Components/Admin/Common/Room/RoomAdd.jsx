import { Button, Col, DatePicker, Input, message, Radio, Row, Select, Tooltip } from 'antd'
import Form from 'antd/lib/form/Form'
import { Option } from 'antd/lib/mentions'
import { postData } from 'Api/api'
import { getData } from 'Api/api'
import { url } from 'Api/url'
import { urnRoomTypeID } from 'Api/urn'
import { urnRoom } from 'Api/urn'
import { urnRoomType } from 'Api/urn'
import React, { useEffect, useState } from 'react'
import { ImCancelCircle } from 'react-icons/im'
import { Link } from 'react-router-dom'

function RoomAdd(props) {
    const [dataRoomTypes, setdataRoomTypes] = useState([]);

    const [maPhong, setmaPhong] = useState("");
    const [soNguoi, setsoNguoi] = useState(0);
    const [trangThai, settrangThai] = useState(1);
    const [idLP, setidLP] = useState("");
    
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

    useEffect(() => {
        var uri = url + urnRoomTypeID(idLP);
        getData(uri)
        .then(res => setsoNguoi(res.data.soNguoi));
    }, [idLP])
    
    useEffect(()=>{
        setsoNguoi(typeof dataRoomTypes[0] !== 'undefined' ? dataRoomTypes[0].soNguoi : 2)
        setidLP(typeof dataRoomTypes[0] !== 'undefined' ? dataRoomTypes[0].idLP : "");
    }, [dataRoomTypes])

    function onReset() {
        settrangThai(1);
        setsoNguoi(typeof dataRoomTypes[0] !== 'undefined' ? dataRoomTypes[0].soNguoi : 2)
        setidLP(typeof dataRoomTypes[0] !== 'undefined' ? dataRoomTypes[0].idLP : "");
    }

    const onCreate = () => {
        var data = {
            maPhong,
            soNguoi,
            trangThai,
            idLP
        }
        console.log(data);
        var uri = url + urnRoom;
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
                                <Link to="/admin/room">
                                    <Button className="btn-close" id="btnAdd">
                                        <ImCancelCircle style={{ color: 'black' }} className="icon-top" />
                                    </Button>
                                </Link>
                            </Tooltip>
                        </Col>
                        <Col xs={20} md={20} lg={20}>
                            <h1 className="text-center"><b>CREATE A ROOM</b></h1>
                        </Col>
                        <Col xs={2} md={2} lg={2} />
                    </Row>
                    <Form>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>ID room:</b></Col>
                            <Col xs={18} md={18} lg={18}><Input name="maPhong" placeholder="ID room" value={maPhong} onChange={ e => setmaPhong(e.target.value)} /></Col>
                        </Row>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>Number of guest(s):</b></Col>
                            <Col xs={18} md={18} lg={18}><Input min={0} type="number" name="giaMoiTuan" value={soNguoi} disabled /></Col>
                        </Row>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>Room type:</b></Col>
                            <Col xs={18} md={18} lg={18}>
                                <Select value={idLP } style={{ width: 225}} onChange={value => setidLP(value)}>
                                    {
                                        typeof dataRoomTypes !== 'undefined' && dataRoomTypes.map((item, index) => 
                                        <>  
                                            <Option key={index} value={item.idLP}>{item.idLP} - {item.tenLP}</Option>
                                        </>)
                                    }
                                </Select>
                            </Col>
                        </Row>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>Status room:</b></Col>
                            <Col xs={18} md={18} lg={18}>
                                <Radio.Group onChange={ e => settrangThai(e.target.value) } value={trangThai}>
                                    <Radio value={1}>Empty</Radio>
                                    <Radio value={2}>Non Empty</Radio>
                                </Radio.Group>
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

export default RoomAdd

