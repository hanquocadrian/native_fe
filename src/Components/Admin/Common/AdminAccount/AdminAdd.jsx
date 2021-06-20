import React from 'react'
import { Row, Col, Form, Input, Tooltip, Button, message, Radio } from 'antd';
import { Link } from 'react-router-dom';
import { ImCancelCircle } from 'react-icons/im';
import { useState } from 'react';
import { url } from '../../../../Api/url';
import { postData } from 'Api/api';

export default function AdminAdd() {
    const [tenAdmin, settenAdmin] = useState('');
    const [phanQuyen, setPhanQuyen] = useState(3);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    function onReset(){
        settenAdmin('');
        setPhanQuyen(3);
        setEmail('');
        setPassword('');
        setUsername('');
    }

    const onCreate = () => {
        if(tenAdmin == "" || email == "" || password == "" || username == "" ){
            message.error("Please, fill out all the fields!");
            return;
        }
        const data1 = {
            phanQuyen,
            tenAdmin,
            email,
            password,
            displayName: username
        }
        var uri1 = url + '/api/admin';
        postData(uri1, data1)
        .then(res=>{
            if (res.data !== undefined) {
                const data2 = {
                    phanQuyen,
                    tenAdmin,
                    email,
                    password,
                    displayName: username,
                    loaiTaiKhoan: 3,
                    idAdmin: res.data
                }
                const uri2 = url + '/api/user';
                postData(uri2, data2)
                .then( res => {
                    if (res.data) {
                        console.log("res add: ", res.data);
                        message.success("Create successfully, wait a few seconds", 3).then(()=>{
                            onReset();
                        })
                    }
                    else {
                        message.error("Create fail, please try again!!!", 3)
                    }
                })
            }
            else if(typeof res.response.data !== undefined){
                console.log("res.response.data: ", res.response.data);
                res.response.data.map(err => {
                    message.error(err.message);
                })
                return;
            }
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
                                <Link to="/admin/adminacc">
                                    <Button className="btn-close" id="btnAdd">
                                        <ImCancelCircle style={{ color: 'black' }} className="icon-top" />
                                    </Button>
                                </Link>
                            </Tooltip>
                        </Col>
                        <Col xs={20} md={20} lg={20}>
                            <h1 className="text-center"><b>CREATE STAFF ACCOUNT</b></h1>
                        </Col>
                        <Col xs={2} md={2} lg={2} />
                    </Row>
                    <Form>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>Admin name:</b></Col>
                            <Col xs={18} md={18} lg={18}>
                                <Input name="tenAdmin" value={tenAdmin} onChange={ e => settenAdmin(e.target.value) } placeholder="Admin name" />
                            </Col>
                        </Row>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>Position:</b></Col>
                            <Col xs={18} md={18} lg={18}>
                                <Radio.Group onChange={ e => setPhanQuyen(e.target.value) } value={phanQuyen}>
                                    <Radio value={2}>Manager</Radio>
                                    <Radio value={3}>Receptionist</Radio>
                                </Radio.Group>
                            </Col>
                        </Row>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>Email:</b></Col>
                            <Col xs={18} md={18} lg={18}>
                                <Input name="email" value={email} onChange={ e => setEmail(e.target.value) } placeholder="Email" />
                            </Col>
                        </Row>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>Password:</b></Col>
                            <Col xs={18} md={18} lg={18}>
                                <Input.Password
                                    // prefix={<BsLock className="site-form-item-icon" />}
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    onChange={ e => setPassword(e.target.value) }
                                    value={password}
                                />
                            </Col>
                        </Row>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>Username:</b></Col>
                            <Col xs={18} md={18} lg={18}>
                                <Input name="username" value={username} onChange={ e => setUsername(e.target.value) } placeholder="Username" />
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
