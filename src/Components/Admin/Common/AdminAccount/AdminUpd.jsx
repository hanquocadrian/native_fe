import React from 'react'
import { Row, Col, Form, Input, Tooltip, Button, message, Radio, Switch } from 'antd';
import { Link } from 'react-router-dom';
import { ImCancelCircle } from 'react-icons/im';
import { useState, useEffect } from 'react';
import { url } from '../../../../Api/url';
import { putData, getData } from 'Api/api';

export default function AdminUpd(props) {
    const [changePass, setChangePass] = useState(false);
    const idAdmin = props.idAdmin;
    const [idTK, setidTK] = useState('');
    const [tenAdmin, settenAdmin] = useState('');
    const [phanQuyen, setPhanQuyen] = useState(3);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [currentPass, setCurrentPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [oldPass, setoldPass] = useState('');

    useEffect(() => {
        var admin = sessionStorage.getItem('adminAccount') ? JSON.parse(sessionStorage.getItem('adminAccount')) : '';
        setidTK(admin.idTK);
    }, []);

    useEffect(() => {
        const uri = url + '/api/admin/' + props.idAdmin;
        getData(uri)
        .then(res => {
            console.log('update admin: ',res.data[0].tenAdmin);
            settenAdmin(res.data[0].tenAdmin);
            setPhanQuyen(res.data[0].phanQuyen);
        })
        .catch(err => console.log(err));
    }, [props.idAdmin])

    useEffect(() => {
        const uri = url + '/api/user/get_by_idadmin/' + props.idAdmin;
        getData(uri)
        .then(res => {
            console.log('update user: ', res.data);
            setEmail(res.data[0].email);
            setoldPass(res.data[0].password);
            setUsername(res.data[0].displayName);
        })
        .catch(err => console.log(err));
    }, [props.idAdmin])

    function onReset(){
        var uri =  url + '/api/user/get_by_idadmin/' + props.idAdmin;
        getData(uri)
        .then(res => {
            settenAdmin(tenAdmin);
            setPhanQuyen(phanQuyen);
            setEmail(res.data[0].email);
            setoldPass(res.data[0].password);
            setCurrentPass('');
            setNewPass('');
            setUsername(res.data[0].displayName);
        })
        .catch(err => console.log(err));
    }

    const onUpdate = () => {
        if(tenAdmin === "" || email === "" || username === "" ){
            message.error("Please, fill out all the fields!");
            return;
        }
        // if (currentPass.length < 6) {
        //     message.error("Current password at least 6 characters!");
        //     return;
        // }
        // if (newPass.length < 6) {
        //     message.error("New password at least 6 characters!");
        //     return;
        // }
        var data1 = null;
        if (currentPass !== '' && newPass !== '') {
            data1 = {
                tenAdmin,
                phanQuyen,
                email,
                password: currentPass,
                newPass,
                displayName: username,
                isChangePass: 1
            }
        }
        else {
            data1 = {
                tenAdmin,
                phanQuyen,
                email,
                displayName: username,
                isChangePass: 0
            }
        }
        var uri1 = url + '/api/admin/' + props.idAdmin;
        putData(uri1, data1)
        .then(res=>{
            if (res.data !== undefined) {
                var data2 = null;
                if (currentPass !== '' && newPass !== '') {
                    data2 = {
                        tenAdmin,
                        phanQuyen,
                        email,
                        password: newPass,
                        currentPass,
                        displayName: username,
                        loaiTaiKhoan: 3,
                        idAdmin,
                        isChangePass: 1
                    }
                }
                else {
                    data2 = {
                        tenAdmin,
                        phanQuyen,
                        email,
                        password: oldPass,
                        displayName: username,
                        loaiTaiKhoan: 3,
                        idAdmin,
                        isChangePass: 0
                    }
                }
                const uri2 = url + '/api/user/update_admin_acc/' + idTK;
                putData(uri2, data2)
                .then( res => {
                    if (res.data) {
                        console.log("res add: ", res.data);
                        message.success("Updated successfully, wait a few seconds", 3).then(()=>{
                            onReset();
                            var objAdmin = {
                                idTK,
                                idAdmin,
                                email,
                                phanQuyen,
                                displayName: username,
                                loaiTaiKhoan: 3,
                                isLogin: true,
                            }
                            sessionStorage.setItem('adminAccount',JSON.stringify(objAdmin));
                        })
                    }
                    else {
                        message.error("Update fail, please try again!!!", 3)
                    }
                })
            }
            else if(typeof res.response.data !== undefined){
                console.log("res.response.data: ", res.response.data);
                if(Array.isArray(res.response.data)){
                    res.response.data.map(err => {
                        return message.error(err.message);
                    })                    
                } 
                else {
                    message.error(res.response.data);
                }
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
                            <h1 className="text-center"><b>UPDATE STAFF ACCOUNT</b></h1>
                        </Col>
                        <Col xs={2} md={2} lg={2} />
                    </Row>
                    <Form>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>ID Admin:</b></Col>
                            <Col xs={18} md={18} lg={18}><Input name="idAdmin" value={idAdmin} placeholder="ID Admin" disabled /></Col>
                        </Row>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>Admin name:</b></Col>
                            <Col xs={18} md={18} lg={18}>
                                <Input name="tenAdmin" value={tenAdmin} onChange={ e => settenAdmin(e.target.value) } disabled />
                            </Col>
                        </Row>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>Position:</b></Col>
                            <Col xs={18} md={18} lg={18}>
                                <Radio.Group onChange={ e => setPhanQuyen(e.target.value) } value={phanQuyen} disabled>
                                    <Radio value={2}>Manager</Radio>
                                    <Radio value={3}>Receptionist</Radio>
                                </Radio.Group>
                            </Col>
                        </Row>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>Username:</b></Col>
                            <Col xs={18} md={18} lg={18}>
                                <Input name="username" value={username} onChange={ e => setUsername(e.target.value) } placeholder="Username" />
                            </Col>
                        </Row>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>Email:</b></Col>
                            <Col xs={18} md={18} lg={18}>
                                <Input name="email" value={email} onChange={ e => setEmail(e.target.value) } placeholder="Email" />
                            </Col>
                        </Row>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>Change password:</b></Col>
                            <Col xs={18} md={18} lg={18}>
                                <Switch checkedChildren="ON" unCheckedChildren="OFF" onChange={ checked => setChangePass(checked) } />
                            </Col>
                        </Row>
                        {
                            changePass ? (
                                <>
                                    <Row className="mb-15">
                                        <Col xs={6} md={6} lg={6}><b>Current password:</b></Col>
                                        <Col xs={18} md={18} lg={18}>
                                            <Input.Password
                                                type="password"
                                                name="currentPass"
                                                placeholder="Enter your current password"
                                                onChange={ e => setCurrentPass(e.target.value) }
                                                value={currentPass}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="mb-15">
                                        <Col xs={6} md={6} lg={6}><b>New password:</b></Col>
                                        <Col xs={18} md={18} lg={18}>
                                            <Input.Password
                                                type="password"
                                                name="newPass"
                                                placeholder="Enter your new password"
                                                onChange={ e => setNewPass(e.target.value) }
                                                value={newPass}
                                            />
                                        </Col>
                                    </Row>
                                </>
                            ) : ( <> </> )
                        }
                        <Row justify="end">
                            <Col xs={2} md={2} lg={2}>
                                <Button size="large" onClick={ onReset } className="btn-reset">Reset</Button>
                            </Col>
                            <Col xs={2} md={2} lg={2}>
                                <Button size="large" onClick={ onUpdate } className="btn-create">Update</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
                <Col xs={2} md={2} lg={2} />
            </Row>
        </>
    )
}