import { Button, Col, Input, message, Popconfirm, Row, Select, Tooltip, Switch } from 'antd'
import Form from 'antd/lib/form/Form'
import { Option } from 'antd/lib/mentions'
import { putData } from 'Api/api'
import { getData } from 'Api/api'
import { url } from 'Api/url'
import { urnRoomTypeID } from 'Api/urn'
import { urnRoomID } from 'Api/urn'
import { urnRoomType } from 'Api/urn'
import React, { useEffect, useState } from 'react'
import { ImCancelCircle } from 'react-icons/im'
import { Link } from 'react-router-dom'

function RoomUpd(props) {
    const [dataRoomTypes, setdataRoomTypes] = useState([]);

    const maPhong= props.maPhong;
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
        try {
            var uri = url + urnRoomID(maPhong);

            getData(uri)
            .then(res => {
                setsoNguoi(res.data.soNguoi);
                settrangThai(res.data.trangThai);
                setidLP(res.data.idLP);
            })
            .catch(err => console.error(err));
        } catch (error) {
            console.error(error);
        }
    },[maPhong])

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
        try {
            var uri = url + urnRoomID(maPhong);

            getData(uri)
            .then(res => {
                setsoNguoi(res.data.soNguoi);
                setidLP(res.data.idLP);
            })
            .catch(err => console.error(err));
        } catch (error) {
            console.error(error);
        }
    }

    const onUpdate = () => {
        var data = {
            maPhong,
            soNguoi,
            trangThai,
            idLP
        }
        console.log(data);
        var uri = url + urnRoomID(maPhong);
        putData(uri, data)
        .then(res => {
            console.log('res: ', res);
            if(res.data !== undefined){
                console.log("res upd: ", res);
                message.success("Update successfully, this page will redirect a few moments later", 3)
                .then(()=>{
                    return props.propsParent.history.push('/admin/room/');
                })
            }
            if(typeof res.response.data !== undefined){
                console.log("res.response.data: ", res.response.data);
                res.response.data.map(err => {
                    return message.error(err.message);
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
                                <Link to="/admin/room">
                                    <Button className="btn-close" id="btnAdd">
                                        <ImCancelCircle style={{ color: 'black' }} className="icon-top" />
                                    </Button>
                                </Link>
                            </Tooltip>
                        </Col>
                        <Col xs={20} md={20} lg={20}>
                            <h1 className="text-center"><b>UPDATE A ROOM</b></h1>
                        </Col>
                        <Col xs={2} md={2} lg={2} />
                    </Row>
                    <Form>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>ID room:</b></Col>
                            <Col xs={18} md={18} lg={18}><Input name="maPhong" placeholder="ID room" value={maPhong} disabled /></Col>
                        </Row>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>Number of guest(s):</b></Col>
                            <Col xs={18} md={18} lg={18}><Input min={0} type="number" name="giaMoiTuan" value={soNguoi} disabled /></Col>
                        </Row>

                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>Status:</b></Col>
                            <Col xs={18} md={18} lg={18}>
                                <Switch checkedChildren="Can use" unCheckedChildren="Busy" checked={trangThai === 2 ? true: false} onChange={ (checked) => {settrangThai(checked ? 2 : 1)} } />
                            </Col>
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

export default RoomUpd

