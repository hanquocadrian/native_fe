import { Button, Col, Input, Row, Switch } from 'antd'
import React, { useEffect, useState } from 'react'
import { firAuth, firAuthFB, firAuthGG } from 'FirebaseConfig';
import { StyledFirebaseAuth } from 'react-firebaseui';
import { Link } from 'react-router-dom';
import { loginUser } from 'Redux/Actions/user';
import { useDispatch } from 'react-redux';

function Login(props) {
    const [useSignin, setuseSignin] = useState(true);
    const dispatch = useDispatch();

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const [username, setusername] = useState('');

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
                const userLogin = {
                    email: user.email,
                    displayName: user.displayName,
                    isLogin: true,
                    isSocialLogin: true
                };
                const actionLogin = loginUser(userLogin);
                dispatch(actionLogin);
                return props.history.push('/');
            }
        })
    })

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
                                        <StyledFirebaseAuth
                                            uiConfig={ uiConfig }
                                            firebaseAuth={ firAuth }
                                        />
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
                                            <Col xs={24} md={7} lg={7} style={{ lineHeight: '32px' }}>Email: </Col>
                                            <Col xs={0} md={1} lg={1} />
                                            <Col xs={24} md={16} lg={16}><Input value={ email } onChange={ e => setemail(e.target.value)} placeholder="Input your email" /></Col>
                                        </Row>
                                        <Row style={{ margin: '15px 0px' }}>
                                            <Col xs={24} md={7} lg={7} style={{ lineHeight: '32px' }}>Password: </Col>
                                            <Col xs={0} md={1} lg={1} />
                                            <Col xs={24} md={16} lg={16}><Input.Password value={ password } onChange={ e => setpassword(e.target.value)} placeholder="Input your password" /></Col>
                                        </Row>
                                        {
                                            useSignin ? (
                                                <>
                                                    <Row style={{ margin: '15px 0px' }}>
                                                        <Col xs={24} md={7} lg={7} style={{ lineHeight: '32px' }}>Confirm Pass: </Col>
                                                        <Col xs={0} md={1} lg={1} />
                                                        <Col xs={24} md={16} lg={16}><Input.Password value={confirmPassword} onChange={ e => setconfirmPassword(e.target.value)} placeholder="Confirm your password" /></Col>
                                                    </Row>
                                                    <Row style={{ margin: '15px 0px' }}>
                                                        <Col xs={24} md={7} lg={7} style={{ lineHeight: '32px' }}>Username: </Col>
                                                        <Col xs={0} md={1} lg={1} />
                                                        <Col xs={24} md={16} lg={16}><Input value={ username } onChange={ e => setusername(e.target.value)} placeholder="Input your username" /></Col>
                                                    </Row>
                                                    <Row>
                                                        <Col xs={24} md={24} lg={24} className="text-center mt-10">
                                                            <Button shape="round">SIGN IN</Button>
                                                        </Col>
                                                    </Row>
                                                </>
                                            ) : ( 
                                                <>
                                                    <Row>
                                                        <Col xs={24} md={24} lg={24} className="text-center mt-10">
                                                            <Button shape="round">LOG IN</Button>
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

