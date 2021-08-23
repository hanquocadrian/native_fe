import { Button, Col, DatePicker, Input, message, Row, Select, Tooltip, Popconfirm } from 'antd'
import Form from 'antd/lib/form/Form'
import { Option } from 'antd/lib/mentions'
import { putData } from 'Api/api'
import { getData } from 'Api/api'
import { url } from 'Api/url'
import { urnCustomerStayID } from 'Api/urn'
import { format } from 'date-fns'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { ImCancelCircle } from 'react-icons/im'
import { Link } from 'react-router-dom'

const initialization = {
    nationals: ['America', 'Paris', 'Netherlands', 'England', 'Singapore', 'VietNam', 'ThaiLand', 'other']
}

function CustomerStayUpd(props) {
    const nationals = initialization.nationals;
    const [selectNational, setSelectNational] = useState('Paris');
    const [idKHO, setIdKHO] = useState(-1);
    const [CMND, setCMND] = useState('');
    const [Passport, setPassport] = useState('');
    const [sdt, setSdt] = useState('');
    const [quocGia, setQuocGia] = useState('Paris');
    const [title, setTitle] = useState('Mr');
    const [tenKH, setTenKH] = useState('');
    const [ngaySinh, setNgaySinh] = useState(new Date());

    useEffect(() => {
        var uri = url + urnCustomerStayID(props.idKHO);
        getData(uri)
        .then(res => {
            setIdKHO(res.data.idKHO);
            setCMND(res.data.CMND);
            setPassport(res.data.Passport);
            setSdt(res.data.sdt);
            setQuocGia(res.data.quocGia);
            setTitle(res.data.title);
            setTenKH(res.data.tenKH);
            setNgaySinh(new Date(res.data.ngaySinh));
            setSelectNational(nationals.includes(res.data.quocGia) ? res.data.quocGia : 'other');
        });
    }, [nationals ,props.idKHO]);
    
    function onReset() {
        var uri = url + urnCustomerStayID(props.idKHO);
        getData(uri)
        .then(res => {
            setIdKHO(res.data.idKHO);
            setCMND(res.data.CMND);
            setPassport(res.data.Passport);
            setSdt(res.data.sdt);
            setQuocGia(res.data.quocGia);
            setTitle(res.data.title);
            setTenKH(res.data.tenKH);
            setNgaySinh(new Date(res.data.ngaySinh));
            setSelectNational(res.data)
        });
    }

    const onUpdate = () => {
        var data = {
            idKHO,
            CMND,
            Passport,
            sdt,
            quocGia,
            title,
            tenKH,
            ngaySinh: format(new Date(ngaySinh), 'yyyy-MM-dd'),
            ngayTao: format(new Date(), 'yyyy-MM-dd')
        }
        console.log(data);
        var uri = url + urnCustomerStayID(idKHO);
        putData(uri, data)
        .then(res => {
            if(res.data !== undefined){
                console.log("res upd: ", res);
                message.success("Update successfully, this page will redirect a few moments later", 3)
                .then(()=>{
                    return props.propsParent.history.push('/admin/customer-stay');
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
                                <Link to="/admin/customer-stay">
                                    <Button className="btn-close" id="btnAdd">
                                        <ImCancelCircle style={{ color: 'black' }} className="icon-top" />
                                    </Button>
                                </Link>
                            </Tooltip>
                        </Col>
                        <Col xs={20} md={20} lg={20}>
                            <h1 className="text-center"><b>UPDATE CUSTOMER STAY</b></h1>
                        </Col>
                        <Col xs={2} md={2} lg={2} />
                    </Row>
                    <Form>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>ID customer stay:</b></Col>
                            <Col xs={18} md={18} lg={18}><Input value={ idKHO } placeholder="ID customer stay" disabled /></Col>
                        </Row>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>Identity card:</b></Col>
                            <Col xs={18} md={18} lg={18}><Input value={CMND} onChange={ e => setCMND(e.target.value) } placeholder="Identity card of customer stay" /></Col>
                        </Row>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>Passport:</b></Col>
                            <Col xs={18} md={18} lg={18}>
                                <Input value={Passport} onChange={ e => setPassport(e.target.value) } placeholder="Passport of customer stay" />
                            </Col>
                        </Row>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>Phone num:</b></Col>
                            <Col xs={18} md={18} lg={18}>
                                <Input value={sdt} onChange={ e => setSdt(e.target.value) } placeholder="Phone number of customer stay" />
                            </Col>
                        </Row>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>National:</b></Col>
                            <Col xs={4} md={4} lg={4}>
                                <Select value={ selectNational }  style={{width: '100%'}}
                                    onChange={value => {
                                        setSelectNational(value);
                                        value !== "other" ? setQuocGia(value) : setQuocGia('')
                                    } } 
                                >
                                    <Option value="America">America</Option>
                                    <Option value="Paris">Paris</Option>
                                    <Option value="Netherlands">Netherlands</Option>
                                    <Option value="England">England</Option>
                                    <Option value="Singapore">Singapore</Option>
                                    <Option value="VietNam">VietNam</Option>
                                    <Option value="ThaiLand">ThaiLand</Option>
                                    <Option value="other">other</Option>
                                </Select>
                            </Col>
                            {
                                (selectNational === "other") && (
                                    <>
                                        <Col xs={14} md={14} lg={14}>
                                            <Input value={ quocGia } onChange={ e => setQuocGia(e.target.value) } placeholder="National of customer stay" />
                                        </Col>
                                    </>
                                )
                            }
                           
                        </Row>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>Name:</b></Col>
                            <Col xs={2} md={2} lg={2}>
                                <Input value={title} onChange={ e => setTitle(e.target.value) } placeholder="Sir, Mr, Mrs, Ms,  ...for customer stay" />
                            </Col>
                            <Col xs={16} md={16} lg={16}>
                                <Input value={tenKH} onChange={ e => setTenKH(e.target.value) } placeholder="customer name" />
                            </Col>
                        </Row>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>Date of birth:</b></Col>
                            <Col xs={18} md={18} lg={18}>
                                <DatePicker value={ moment(ngaySinh, 'YYYY/MM/DD') } onChange={ (date, dateString) => setNgaySinh(dateString? dateString: new Date()) } />
                            </Col>
                        </Row>
                        
                        <Row justify="end">
                            <Col xs={2} md={2} lg={2}>
                                <Popconfirm
                                    title="Are you sure to reset this form?"
                                    onConfirm={ () => onReset() }
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

export default CustomerStayUpd

