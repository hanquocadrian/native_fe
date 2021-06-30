import { Button, Col, Input, Row, Switch, message, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { firAuth, firAuthFB, firAuthGG } from 'FirebaseConfig';
import { StyledFirebaseAuth } from 'react-firebaseui';
import { Link } from 'react-router-dom';
import { actLogin } from 'ReduxConfig/Actions/customerAccount';
import { useDispatch } from 'react-redux';
import { postData } from 'Api/api';
import { url } from 'Api/url';
import authCus from 'Auth/authCus';
import { getData } from 'Api/api';

function Login(props) {
    const [useSignin, setuseSignin] = useState(true);
    const dispatch = useDispatch();

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const [username, setusername] = useState('');
    const [tenKH, setTenKH] = useState('');
    const [phone, setPhone] = useState('');

    const [isLoading, setisLoading] = useState(false);

    const uiConfig = {
        signInFlow: "popup",
        signInOptions: [
            firAuthGG,
            firAuthFB,
        ],
        callbacks: {
            signInSuccess: () => false
        }
    }

    useEffect(()=>{
        firAuth.onAuthStateChanged(user => {
            if(!!user){
                setisLoading(true);
                //để hàm xử lý onSubmitFirebase
                //khi đã có tài khoản r sẽ chạy mấy dòng dưới
                const data1 = {
                    loaiTaiKhoan: 1,
                    tenKH: user.displayName
                }
                const uri1 = url + '/api/khd';
                postData(uri1, data1)
                .then( res => {
                    console.log("res add KHD: ", res.data);
                    const data2 ={
                        email: user.email,
                        displayName: user.displayName,
                        loaiTaiKhoan: 1,
                        idKHD: res.data
                    }
                    const uri2 = url + '/api/user/register';
                    // console.log('data2:', data2);
                    postData(uri2, data2)
                    .then(res => {
                        console.log("res add FB: ", res.data);
                        message.success("Login successfully, wait a few seconds 2", 3).then(() => {
                            getData(url + '/api/user/' + res.data)
                            .then (res => {
                                const customerAccount = {
                                    idTK: res.data[0].idTK,
                                    idKHD: res.data[0].idKHD,
                                    email: res.data[0].email,
                                    displayName: res.data[0].displayName,
                                    loaiTaiKhoan: res.data[0].loaiTaiKhoan,
    
                                    isLogin: true,
                                    isSocialLogin: true
                                };
                
                                const actionLogin = actLogin(customerAccount);
                                dispatch(actionLogin);
                                setisLoading(false);
    
                                authCus.login(() => {
                                    return props.history.push('/');
                                });
                            })
                        })
                    })
                })
                
            }
        })
    })

    function onReset() {
        setemail('');
        setpassword('');
        setconfirmPassword('');
        setusername('');
        setTenKH('');
        setPhone('');
    }

    const onSubmitSignIn = () => {
        if (email === '' || password === '' || confirmPassword === '' || username === '' || tenKH === '' || phone.length < 10) {
            message.error("Please, fill out all the fields!");
            return;
        }
        if (password !== confirmPassword) {
            message.error("Password and confirm password does not match!!!");
            return;
        }
        const data1 = {
            loaiTaiKhoan: 2,
            email,
            password,
            displayName: username,
            tenKH,
            sdt: phone
        }
        const uri1 = url + '/api/khd';
        postData(uri1, data1)
        .then( res => {
            if (res.data !== undefined) {
                console.log("res add KHD: ", res.data);
                const data2 ={
                    email,
                    password,
                    displayName: username,
                    loaiTaiKhoan: 2,
                    idKHD: res.data,
                    tenKH,
                    sdt: phone
                }
                const uri2 = url + '/api/user/register';
                postData(uri2, data2)
                .then( res => {
                    if (res.data) {
                        console.log("res add TK: ", res.data);
                        message.success("SignIn successfully, wait a few seconds", 3).then(() => {
                            onReset();
                            setuseSignin(false);
                        })
                    }
                    else {
                        message.error("SignIn fail, wait a few seconds", 3)
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

    const onSubmitLogin = () => {
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
                message.success("Login successfully, wait a few seconds", 3).then(() => {
                    onReset();
                    var objUser = {
                        idTK:  res.data.results[0].idTK,
                        email:  res.data.results[0].email,
                        displayName:  res.data.results[0].displayName,
                        idKHD:  res.data.results[0].idKHD,
                        loaiTaiKhoan:  res.data.results[0].loaiTaiKhoan,

                        isLogin: true,
                        isSocialLogin: false
                    }

                    var action = actLogin(objUser);
                    dispatch(action);
                    
                    authCus.login(() => {
                        return props.history.push('/');
                    });
                })
            }
            else {
                message.error("Login fail, please try again!!!", 3)
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
                            <Col xs={24} md={24} lg={24} className="text-center">
                                <Row justify="center">
                                    <Col xs={24} md={24} lg={24}>
                                        <i>Login with</i>
                                    </Col>
                                </Row>
                                <Row justify="center">
                                    <Col xs={2} md={2} lg={2} />
                                    <Col xs={20} md={20} lg={20}>
                                        {
                                            isLoading ? (
                                                <>
                                                    <div className="mt-15" />
                                                    <Spin size="large" />
                                                </>
                                            ) : (
                                                <>        
                                                    <StyledFirebaseAuth
                                                        uiConfig={ uiConfig }
                                                        firebaseAuth={ firAuth }
                                                    />
                                                </>
                                            )
                                        }
                                    </Col>
                                    <Col xs={2} md={2} lg={2} />
                                </Row>
                            </Col>
                        </Row>
                        
                        <hr />
                        <Row style={{ margin: '15px 0px' }}>
                            <Col xs={24} md={24} lg={24} className="text-right">
                                <Row>
                                    <Col xs={24} md={24} lg={24} className="text-center mb-10">
                                        <Switch checkedChildren="SIGN IN" unCheckedChildren="LOG IN" defaultChecked onChange={ checked => setuseSignin(checked) } />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={24} md={24} lg={24}>
                                        <Row style={{ margin: '15px 0px' }}>
                                            <Col xs={7} md={7} lg={7} style={{ lineHeight: '32px' }}>Email: </Col>
                                            <Col xs={1} md={1} lg={1} />
                                            <Col xs={16} md={16} lg={16}><Input value={ email } onChange={ e => setemail(e.target.value)} placeholder="Input your email" /></Col>
                                        </Row>
                                        <Row style={{ margin: '15px 0px' }}>
                                            <Col xs={7} md={7} lg={7} style={{ lineHeight: '32px' }}>Password: </Col>
                                            <Col xs={1} md={1} lg={1} />
                                            <Col xs={16} md={16} lg={16}><Input.Password value={ password } onKeyDown={e => { if(e.key == "Enter" && !useSignin) onSubmitLogin() }} onChange={ e => setpassword(e.target.value)} placeholder="Input your password" /></Col>
                                        </Row>
                                        {
                                            useSignin ? (
                                                <>
                                                    <Row style={{ margin: '15px 0px' }}>
                                                        <Col xs={7} md={7} lg={7} style={{ lineHeight: '32px' }}>Confirm Pass: </Col>
                                                        <Col xs={1} md={1} lg={1} />
                                                        <Col xs={16} md={16} lg={16}><Input.Password value={confirmPassword} onChange={ e => setconfirmPassword(e.target.value)} placeholder="Confirm your password" /></Col>
                                                    </Row>
                                                    <Row style={{ margin: '15px 0px' }}>
                                                        <Col xs={7} md={7} lg={7} style={{ lineHeight: '32px' }}>Username: </Col>
                                                        <Col xs={1} md={1} lg={1} />
                                                        <Col xs={16} md={16} lg={16}><Input value={ username } onChange={ e => setusername(e.target.value)} placeholder="Input your username" /></Col>
                                                    </Row>
                                                    <Row style={{ margin: '15px 0px' }}>
                                                        <Col xs={7} md={7} lg={7} style={{ lineHeight: '32px' }}>Full Name: </Col>
                                                        <Col xs={1} md={1} lg={1} />
                                                        <Col xs={16} md={16} lg={16}><Input value={ tenKH } onChange={ e => setTenKH(e.target.value)} placeholder="Input your fullname" /></Col>
                                                    </Row>
                                                    <Row style={{ margin: '15px 0px' }}>
                                                        <Col xs={7} md={7} lg={7} style={{ lineHeight: '32px' }}>Phone Number: </Col>
                                                        <Col xs={1} md={1} lg={1} />
                                                        <Col xs={16} md={16} lg={16}><Input value={ phone } onChange={ e => setPhone(e.target.value)} placeholder="Input your phone number" /></Col>
                                                    </Row>
                                                    <Row>
                                                        <Col xs={24} md={24} lg={24} className="text-center mt-10">
                                                            <Button shape="round" onClick={ onSubmitSignIn }>SIGN IN</Button>
                                                        </Col>
                                                    </Row>
                                                </>
                                            ) : ( 
                                                <>
                                                    <Row>
                                                        <Col xs={24} md={24} lg={24} className="text-center mt-10">
                                                            <Button shape="round" onClick={ onSubmitLogin }>LOG IN</Button>
                                                        </Col>
                                                    </Row>
                                                </>
                                            )
                                        }
                                        
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

export default Login

