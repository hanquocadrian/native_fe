import { Button, Col, Input, Radio, Row, Switch, Popconfirm, message } from 'antd';
import { getData, putData } from 'Api/api';
import { url } from 'Api/url';
import { urnKhdID } from 'Api/urn';
import { urnUserID } from 'Api/urn';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { firAuth } from 'FirebaseConfig';
import { actLogout, actUpdateLogin } from 'ReduxConfig/Actions/customerAccount';

export default function Profile(props) {
    //  variable support
    const dispatch = useDispatch();
    const isSocialLogin = useSelector(state => state.customerAccountReducer.isSocialLogin);
    const idTK = useSelector(state => state.customerAccountReducer.idTK);
    const [isUpdatePassword, setisUpdatePassword] = useState(false);

    const [oldLoaiTaiKhoan, setoldLoaiTaiKhoan] = useState('');
    const [oldPassword, setoldPassword] = useState('');
    const [newPassword, setnewPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');

    //  USER
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [displayName, setdisplayName] = useState('');
    const [title, settitle] = useState('Mr');
    const [loaiTaiKhoan, setloaiTaiKhoan] = useState(0);

    //  KHD
    const [idKHD, setidKHD] = useState(-1);
    const [tenKH, settenKH] = useState('');
    const [sdt, setsdt] = useState('');

    useEffect(() => {
        var uri = url + urnUserID(idTK);
        getData(uri)
        .then((resUser) => {
            //  variable support
            setoldLoaiTaiKhoan(resUser.data[0].loaiTaiKhoan);

            //  USER
            setemail(resUser.data[0].email);
            setpassword(resUser.data[0].password);
            setdisplayName(resUser.data[0].displayName);
            settitle(resUser.data[0].title || 'Mr');
            setloaiTaiKhoan(resUser.data[0].loaiTaiKhoan);
            setidKHD(resUser.data[0].idKHD);

            uri = url + urnKhdID(resUser.data[0].idKHD);
            getData(uri)
            .then((resKHD) => {
                //  KHD
                settenKH(resKHD.data[0].tenKH);
                setsdt(resKHD.data[0].sdt);
            })
        });
    },[])

    const onReset = () => {
        var uri = url + urnUserID(idTK);
        getData(uri)
        .then((resUser) => {
            //  USER
            setemail(resUser.data[0].email);
            setpassword(resUser.data[0].password);
            setdisplayName(resUser.data[0].displayName);
            settitle(resUser.data[0].title || 'Mr');
            setloaiTaiKhoan(resUser.data[0].loaiTaiKhoan);
            setidKHD(resUser.data[0].idKHD);

            uri = url + urnKhdID(resUser.data[0].idKHD);
            getData(uri)
            .then((resKHD) => {
                //  KHD
                settenKH(resKHD.data[0].tenKH);
                setsdt(resKHD.data[0].sdt);
            })
        });
    }

    const onSubmitUpdate = () => {
        // settenKH(displayName);
        // if(!isUpdatePassword || loaiTaiKhoan == 1){  
        //     console.log('update non pass: ', dataKHD, dataUser);
        // }
        // else{
        //     console.log('update pass: ', dataKHD, dataUser);
        // }
        var socialLogin = isSocialLogin;

        if(oldLoaiTaiKhoan !== loaiTaiKhoan && oldLoaiTaiKhoan == 1){
            if(isSocialLogin){
                firAuth.signOut();
            }
            socialLogin = !socialLogin;
        }
        
        if(sdt < 10 || email == "" || displayName == "" ){
            message.error("Please, fill out all the fields!");
            return;
        }
        if (oldPassword !== '' && newPassword !== '' && confirmPassword !== '') {
            var dataKHD = {
                tenKH,
                sdt,
                email,
                password: oldPassword,
                newPassword,
                displayName,
                isChangePass: 1
            }
        }
        else {
            var dataKHD = {
                tenKH,
                sdt,
                email,
                displayName,
                isChangePass: 0
            }
        }
        var uri1 = url + '/api/khd/' + idKHD;
        putData(uri1, dataKHD)
        .then(res=>{
            if (res.data !== undefined) {
                if (oldPassword !== '' && newPassword !== '' && confirmPassword !== '') {
                    if (newPassword === confirmPassword) {
                        var dataUser = {
                            tenKH,
                            sdt,
                            email,
                            displayName,
                            title,
                            password: newPassword,
                            oldPassword,
                            loaiTaiKhoan,
                            idKHD,
                            isChangePass: 1
                        }   
                    }
                    else {
                        message.error("Your new password and confirm password fields do not match!!!");
                        return;
                    }
                }
                else {
                    var dataUser = {
                        tenKH,
                        sdt,
                        email,
                        displayName,
                        title,
                        password,
                        loaiTaiKhoan,
                        idKHD,
                        isChangePass: 0
                    }
                }
                const uri2 = url + '/api/user/update_cus_acc/' + idTK;
                putData(uri2, dataUser)
                .then( res => {
                    if (res.data) {
                        console.log("res add: ", res.data);
                        message.success("Updated successfully, wait a few seconds", 3).then(()=>{
                            // Update nav and logout 
                            let customerAccount = {
                                email,
                                displayName,
                                loaiTaiKhoan,
                                isSocialLogin: socialLogin
                            }
                            const actionUpdateLogin = actUpdateLogin(customerAccount);
                            dispatch(actionUpdateLogin);

                            onReset();
                            // var objCus = {
                            //     idTK,
                            //     idKHD,
                            //     email,
                            //     displayName,
                            //     loaiTaiKhoan,
                            //     isLogin: true,
                            // }
                            // sessionStorage.setItem('customerAccount',JSON.stringify(objCus));
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
                        message.error(err.message);
                    })                    
                } 
                else {
                    message.error(res.response.data);
                }
                return;
            }
        })
    }

    const onLogout = () => {
        if(isSocialLogin){
            firAuth.signOut();
        }

        var actionLogout = actLogout();
        dispatch(actionLogout);
        return props.propsParent.history.push('/');
    }

    return (
        <>
            <Row>
                <Col xs={24} md={24} lg={24}>
                    <h1 className="text-center"><b>CUSTOMER INFORMATION</b></h1> 
                    <Row className="mb-15 mt-15">
                        <Col xs={6} md={6} lg={6} />
                        <Col xs={12} md={12} lg={12} className="text-center">
                            <hr style={{ color: 'black'}} />
                        </Col>
                        <Col xs={6} md={6} lg={6} />
                    </Row>
                    <Row className="mb-15 mt-15">
                        <Col xs={6} md={6} lg={6} />
                        <Col xs={3} md={3} lg={3} style={{ lineHeight: '32px' }}>
                            <b>Your name:</b>
                        </Col>
                        <Col xs={9} md={9} lg={9} >
                            <Row>
                                <Col xs={3} md={3} lg={3} >
                                    <Input placeholder="Mr" value={ title } onChange={(e) => settitle( e.target.value )} />
                                </Col>
                                <Col xs={21} md={21} lg={21} >
                                    <Input value={ tenKH } onChange={ e => settenKH(e.target.value) } required/>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={6} md={6} lg={6} />
                    </Row>
                    <Row className="mb-15 mt-15">
                        <Col xs={6} md={6} lg={6} />
                        <Col xs={3} md={3} lg={3} style={{ lineHeight: '32px' }}>
                            <b>Display name:</b>
                        </Col>
                        <Col xs={9} md={9} lg={9} >
                            <Input value={ displayName } onChange={(e) => setdisplayName( e.target.value )} required/>
                        </Col>
                        <Col xs={6} md={6} lg={6} />
                    </Row>
                    <Row className="mb-15">
                        <Col xs={6} md={6} lg={6} />
                        <Col xs={3} md={3} lg={3} style={{ lineHeight: '32px' }}>
                            <b>Email:</b>
                        </Col>
                        <Col xs={9} md={9} lg={9} >
                            <Input value={ email } onChange={(e) => setemail( e.target.value )} /> 
                        </Col>
                        <Col xs={6} md={6} lg={6} />
                    </Row>
                    <Row className="mb-15">
                        <Col xs={6} md={6} lg={6} />
                        <Col xs={3} md={3} lg={3} style={{ lineHeight: '32px' }}>
                            <b>Phone number:</b>
                        </Col>
                        <Col xs={9} md={9} lg={9} >
                            <Input value={ sdt } onChange={(e) => setsdt( e.target.value )} placeholder="Enter your phone number"/> 
                        </Col>
                        <Col xs={6} md={6} lg={6} />
                    </Row>
                    <Row className="mb-15">
                        <Col xs={6} md={6} lg={6} />
                        <Col xs={3} md={3} lg={3} style={{ lineHeight: '32px' }}>
                            <b>Account type:</b>
                        </Col>
                        <Col xs={9} md={9} lg={9} >
                            {
                                loaiTaiKhoan == 1 ? (
                                    <>
                                        <Radio.Group onChange={(e) => setloaiTaiKhoan( e.target.value )} value={ loaiTaiKhoan }>
                                            <Radio value={1}>Social account</Radio>
                                            <Radio value={2}>Native account</Radio>
                                        </Radio.Group>
                                    </>
                                ) : (
                                    <>
                                        <Radio.Group value={2}>
                                            <Radio value={1} disabled>Social account</Radio>
                                            <Radio value={2} disabled>Native account</Radio>
                                        </Radio.Group>
                                    </>
                                )
                            }
                        </Col>
                        <Col xs={6} md={6} lg={6} />
                    </Row>
                    {
                        loaiTaiKhoan == 2 && (
                            <>
                                <Row className="mb-15">
                                    <Col xs={6} md={6} lg={6} />
                                    <Col xs={3} md={3} lg={3} style={{ lineHeight: '32px' }}>
                                        <b>Update password:</b>
                                    </Col>
                                    <Col xs={9} md={9} lg={9} >
                                        <Switch checkedChildren="Yes" unCheckedChildren="No" onChange={(checked)=>{ setisUpdatePassword(checked) }} />
                                    </Col>
                                    <Col xs={6} md={6} lg={6} />
                                </Row>
                                {
                                    isUpdatePassword && (
                                        <>
                                            {
                                                oldLoaiTaiKhoan != 1 && (
                                                    <>
                                                        <Row className="mb-15">
                                                            <Col xs={6} md={6} lg={6} />
                                                            <Col xs={3} md={3} lg={3} style={{ lineHeight: '32px' }}>
                                                                <b>Old Password:</b>
                                                            </Col>
                                                            <Col xs={9} md={9} lg={9} >
                                                                <Input.Password value={oldPassword } onChange={(e) => setoldPassword( e.target.value )} placeholder="Enter your old pass" /> 
                                                            </Col>
                                                            <Col xs={6} md={6} lg={6} />
                                                        </Row> 
                                                    </>
                                                )
                                            }
                                            <Row className="mb-15">
                                                <Col xs={6} md={6} lg={6} />
                                                <Col xs={3} md={3} lg={3} style={{ lineHeight: '32px' }}>
                                                    <b>New Password:</b>
                                                </Col>
                                                <Col xs={9} md={9} lg={9} >
                                                    <Input.Password value={newPassword } onChange={(e) => setnewPassword( e.target.value )} placeholder="Enter your new pass" /> 
                                                </Col>
                                                <Col xs={6} md={6} lg={6} />
                                            </Row> 
                                            <Row className="mb-50">
                                                <Col xs={6} md={6} lg={6} />
                                                <Col xs={3} md={3} lg={3} style={{ lineHeight: '32px' }}>
                                                    <b>Confirm password:</b>
                                                </Col>
                                                <Col xs={9} md={9} lg={9} >
                                                    <Input.Password value={ confirmPassword } onChange={(e) => setconfirmPassword( e.target.value )} placeholder="Enter confirm the new pass" /> 
                                                </Col>
                                                <Col xs={6} md={6} lg={6} />
                                            </Row>                                         
                                        </>
                                    )
                                }
                            </>
                        )
                    }
                    <Row className="mb-15 mt-30">
                        <Col xs={6} md={6} lg={6} />
                        <Col xs={4} md={4} lg={4} className="text-center">
                            <Popconfirm
                                title="Are you sure to reload form?"
                                onConfirm={ onReset }
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button size="large" shape="round" className="btn-reset"><b>Reset data</b></Button>
                            </Popconfirm>
                        </Col>
                        <Col xs={4} md={4} lg={4} className="text-center">
                            <Button onClick={ onSubmitUpdate } size="large" shape="round" className="btn-update"><b>Update data</b></Button>
                        </Col>
                        <Col xs={4} md={4} lg={4} className="text-center">
                            <Link to="/">
                                <Button size="large" shape="round" className="btn-back"><b>Home Page</b></Button>
                            </Link>
                        </Col>
                        <Col xs={6} md={6} lg={6} />
                    </Row>
                    <Row className="mb-15">
                        <Col xs={6} md={6} lg={6} />
                        <Col xs={12} md={12} lg={12} className="text-center">
                            <hr />
                        </Col>
                        <Col xs={6} md={6} lg={6} />
                    </Row>
                    <Row className="mb-15">
                        <Col xs={6} md={6} lg={6} />
                        <Col xs={12} md={12} lg={12} className="text-center">
                            <Popconfirm
                                title="Are you sure to logout?"
                                onConfirm={ onLogout }
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button size="large" shape="round"><b>LOGOUT</b></Button>
                            </Popconfirm>
                        </Col>
                        <Col xs={6} md={6} lg={6} />
                    </Row>                   
                </Col>
            </Row>
        </>
    )
}