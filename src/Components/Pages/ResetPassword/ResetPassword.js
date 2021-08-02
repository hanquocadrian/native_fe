import React, { useState } from 'react'
import { Button, Col, Input, Row, message } from 'antd'
import { Link } from 'react-router-dom';
import { patchData } from 'Api/api';
import { url } from 'Api/url';

export default function ResetPassword(props) {
    const [newPass, setNewPass] = useState('');
    const idTK = props.match.params.id;

    const onSubmitSaveNewPassword = () => {
        if (newPass === '') {
            message.error("Please, fill out the field!");
            return;
        }
        if (newPass.length < 6) {
            message.error("Password at least 6 characters!");
            return;
        }
        const data = {
            password: newPass
        }
        var uri = url + '/api/user/reset-password/' + idTK;
        patchData(uri, data)
        .then(res => {
            if (res.data) {
                props.history.push("/login");
            }
            else {
                message.error("Sorry your request is expired!!!");
                return;
            }
        })
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
                                            <Col xs={7} md={7} lg={7} style={{ lineHeight: '32px' }}>New Password: </Col>
                                            <Col xs={1} md={1} lg={1} />
                                            <Col xs={15} md={15} lg={15}><Input.Password value={ newPass } onChange={ e => setNewPass(e.target.value)} placeholder="Enter your new password" /></Col>
                                            <Col xs={1} md={1} lg={1} />
                                        </Row>
                                        <Row>
                                            <Col xs={24} md={24} lg={24} className="text-center mt-10">
                                                <Button shape="round" onClick={ onSubmitSaveNewPassword }>SAVE</Button>
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
