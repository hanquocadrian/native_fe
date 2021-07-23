import React, { useState } from 'react';
import auth from "../../../../Auth/auth";
import { Form, Input, Button, Row, Col, message } from 'antd';
import { BsLock } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import './Login.css';
import { postData } from 'Api/api';
import { url } from 'Api/url';
import { getData } from 'Api/api';
import { urnAdminID } from 'Api/urn';
import { actLogin } from 'ReduxConfig/Actions/adminAccount';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Login(props) {
    const dispatch = useDispatch();
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    function onReset() {
        setemail('');
        setpassword('');
    }

    const onLogin = () => {
        if (email === '' || password === '') {
            message.error("Please, fill out all the fields!");
            return;
        }
        const data = {
            email,
            password
        }
        const uri = url + '/api/user/login';
        postData(uri, data)
        .then( res => {
            if (res.data) {
                console.log("res: ", res.data);
                
                getData(url + urnAdminID(res.data.results[0].idAdmin))
                .then(resAdmin => {
                    console.log("resAdmin", resAdmin);
                    message.success("Login successfully, wait a few seconds", 3).then(() => {
                        onReset();
                        var objAdmin = {
                            idTK: res.data.results[0].idTK,
                            idAdmin: res.data.results[0].idAdmin,
                            email: res.data.results[0].email,
                            phanQuyen:  resAdmin.data[0].phanQuyen,
                            displayName: res.data.results[0].displayName,
                            loaiTaiKhoan: res.data.results[0].loaiTaiKhoan,

                            isLogin: true,
                        }
                        const action = actLogin(objAdmin);
                        dispatch(action);
                        auth.login(() => {
                            props.history.push("/admin/home/");
                        });
                    })
                })
            }
            else {
                message.error("Login fail, please try again!!!", 3)
            }
        })
    }

    return (
        <>
            <Row className="bg-hotel">
                <Col xs={3} md={5} lg={7}></Col>
                <Col xs={18} md={14} lg={10}>
                    <div id="login-form">
                        <Row>
                            <Col xs={11} md={11} lg={11}></Col>
                            <Col xs={2} md={2} lg={2}>
                                <img 
                                    style={{ width: 'auto', height: '6vh' }} 
                                    src="../assets/images/NativeLogo.png" 
                                    alt="logo"
                                />
                            </Col>
                            <Col xs={11} md={11} lg={11}></Col>
                        </Row>
                        
                        <h2 style={{textAlign:'center', paddingTop:'2%'}}><b>ADMIN LOGIN</b></h2>
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{
                                remember: true,
                            }}
                        >
                            <Row>
                                <Col xs={1} md={2} lg={2}></Col>
                                <Col xs={22} md={20} lg={20}>
                                    <Form.Item
                                        className="login-form-input"
                                        name="email"
                                        rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Email!',
                                        },
                                        ]}
                                    >
                                        <Input 
                                            prefix={<HiOutlineMail className="site-form-item-icon" />} 
                                            placeholder="Email" 
                                            size="large"
                                            type="email"
                                            value={ email } 
                                            onChange={ e => setemail(e.target.value)}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={1} md={2} lg={2}></Col>
                            </Row>
                            <Row>
                                <Col xs={1} md={2} lg={2}></Col>
                                <Col xs={22} md={20} lg={20}>
                                    <Form.Item
                                        className="login-form-input"
                                        name="password"
                                        rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Password!',
                                        },
                                        ]}
                                    >
                                        <Input.Password
                                            prefix={<BsLock className="site-form-item-icon" />}
                                            type="password"
                                            placeholder="Password"
                                            size="large"
                                            value={ password } 
                                            onChange={ e => setpassword(e.target.value)}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={1} md={2} lg={2}></Col>
                            </Row>
                            <Row>
                                <Col xs={1} md={2} lg={2}></Col>
                                <Col xs={22} md={20} lg={20}>
                                    <Form.Item className="login-form-button">
                                        <Button type="primary" htmlType="submit" size="large" onClick={ onLogin }>
                                            <b>Log in</b>
                                        </Button>
                                    </Form.Item>
                                </Col>
                                <Col xs={1} md={2} lg={2}></Col>
                            </Row>
                            <Row>
                                <Col xs={1} md={2} lg={2}></Col>
                                <Col xs={22} md={20} lg={20}>
                                    <Form.Item className="login-form-forgot">
                                        <Link to="/forgot-password/"><span>Forgot password</span></Link>
                                    </Form.Item>
                                </Col>
                                <Col xs={1} md={2} lg={2}></Col>
                            </Row>
                        </Form>
                    </div>
                </Col>
                <Col xs={3} md={5} lg={7}></Col>
            </Row>
        </>
    )
}
