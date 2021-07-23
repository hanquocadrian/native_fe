import React, { useState } from 'react'
import { Button, Col, Input, Row, message } from 'antd'
import { Link } from 'react-router-dom';
import { postData } from 'Api/api';
import { url } from 'Api/url';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [emailSent, setEmailSent] = useState(false);

    const onSubmitGetResetLink = () => {
        const data = {
            email
        }
        var uri = url + '/api/reset-pass/';
        postData(uri, data)
        .then((res) => {
            console.log('forgot pass: ', res.data);
            if (res.data) {
                setEmailSent(true);
            }
            else {
                message.error("Invalid email!!!");
                return;
            }
        })
    }

    if (emailSent) {
        return (
            <div  className="bg-hotel" style={{ overflow: "hidden", width: "100vw" }}>
            <Row>
                <Col xs={3} md={5} lg={7}></Col>
                <Col xs={18} md={14} lg={10}>
                    <div id="login-form">
                        <Row justify="center">
                            <Col xs={2} md={2} lg={2} />
                            <Col xs={20} md={20} lg={20} className="text-center">
                                <Link to="/">
                                    <h1>NATIVE HOTEL</h1>
                                </Link>
                            </Col>
                            <Col xs={2} md={2} lg={2} />
                        </Row>
                        <hr />
                        <Row style={{ margin: '15px 0px' }}>
                            <Col xs={24} md={24} lg={24} className="text-right">
                                <Row>
                                    <Col xs={24} md={24} lg={24}>
                                        <Row>
                                            <Col xs={2} md={2} lg={2} />
                                            <Col xs={20} md={20} lg={20} style={{textAlign:"center", fontFamily:'Georgia', fontSize:'20px'}}>
                                                <span>An email with reset password instructions is on its way.</span>
                                                <hr/>
                                            </Col>
                                            <Col xs={2} md={2} lg={2} />
                                        </Row>
                                        <Row>
                                            <Col xs={2} md={2} lg={2} />
                                            <Col xs={20} md={20} lg={20} style={{textAlign:"center", fontFamily:'Georgia', fontSize:'20px'}}>
                                                <span>Please check your email.</span>
                                            </Col>
                                            <Col xs={2} md={2} lg={2} />
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                    </div>
                </Col>
                <Col xs={3} md={5} lg={7}></Col>
            </Row>
        </div>
        )
    }
    return (
        <div  className="bg-hotel" style={{ overflow: "hidden", width: "100vw" }}>
            <Row>
                <Col xs={3} md={5} lg={7}></Col>
                <Col xs={18} md={14} lg={10}>
                    <div id="login-form">
                        <Row justify="center">
                            <Col xs={2} md={2} lg={2} />
                            <Col xs={20} md={20} lg={20} className="text-center">
                                <Link to="/">
                                    <h1>NATIVE HOTEL</h1>
                                </Link>
                            </Col>
                            <Col xs={2} md={2} lg={2} />
                        </Row>
                        <hr />
                        <Row style={{ margin: '15px 0px' }}>
                            <Col xs={24} md={24} lg={24} className="text-right">
                                <Row>
                                    <Col xs={24} md={24} lg={24}>
                                        <Row style={{ margin: '15px 0px' }}>
                                            <Col xs={5} md={5} lg={5} style={{ lineHeight: '32px' }}>Email: </Col>
                                            <Col xs={1} md={1} lg={1} />
                                            <Col xs={16} md={16} lg={16}><Input value={ email } onChange={ e => setEmail(e.target.value)} placeholder="Enter your email to reset password" /></Col>
                                            <Col xs={2} md={2} lg={2} />
                                        </Row>
                                        <Row>
                                            <Col xs={24} md={24} lg={24} className="text-center mt-10">
                                                <Button shape="round" onClick={ onSubmitGetResetLink }>GET RESET LINK</Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                    </div>
                </Col>
                <Col xs={3} md={5} lg={7}></Col>
            </Row>
        </div>
    )
}