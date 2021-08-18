import React from 'react'
import { BackTop, Col, Row } from 'antd';
import { RiFacebookCircleLine } from "react-icons/ri";
import { SiInstagram } from "react-icons/si";
import { AiOutlineTwitter } from "react-icons/ai";
import { TiSocialLinkedinCircular } from "react-icons/ti";
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
    return (
        <>
            <Row>
                <img src="/assets/images/IMG_footer.png" alt="not found" style={{ width: "100vw" }} />
            </Row>
            <Row style={{backgroundColor: 'black', color: 'white', paddingTop: "10vh"}}>
                <Col xs={1} md={3} lg={3} />
                <Col xs={22} md={18} lg={18}>
                    <Row>
                        <Col xs={24} md={8} lg={8}>
                            <Row>
                                <img style={{padding: '5%', paddingBottom: '2vh' }} src='/assets/images/IMG_footer_native.png' alt="footer logo"/>
                            </Row>
                            <Row className="navbar-text-footer">
                                <span style={{ paddingLeft: '1.7vw', paddingBottom: '7vh', fontSize: '2.4vh' }}>nativehotelct@gmail.com</span>
                            </Row>
                            <Row>
                                <RiFacebookCircleLine style={{color:'white', fontSize: '47', margin: '2px 20px 0 0'}}/>
                                <SiInstagram style={{color:'white', fontSize: '40', margin: '5px 20px 0 0'}}/>
                                <AiOutlineTwitter style={{color:'white', fontSize: '50', margin: '2px 18px 0 0'}}/>
                                <TiSocialLinkedinCircular style={{color:'white', fontSize: '50', margin: '0px 5px 0 0'}}/>
                            </Row>
                            <Row style={{ marginTop: '1vh', paddingTop: '9vh'  }}>
                                <BackTop />
                            </Row>
                        </Col>
                        <Col xs={24} md={8} lg={8}>
                            <Row><Link to="/" className="navbar-text nav-link navbar-text-footer arrow-right-footer"><span>Stay</span><div></div></Link></Row>
                            <Row><Link to="/about" className="navbar-text nav-link navbar-text-footer arrow-right-footer"><span>About</span><div></div></Link></Row>
                            <Row><Link to="/rates" className="navbar-text nav-link navbar-text-footer arrow-right-footer"><span>Room Rates</span><div></div></Link></Row>
                            <Row><Link to="/" className="navbar-text nav-link navbar-text-footer arrow-right-footer"><span>Rooms</span><div></div></Link></Row>
                            <Row style={{ color: 'whitesmoke', marginTop: '1vh', paddingBottom: '6vh', paddingTop: '9vh' }}>
                                <Col >© 2020 Native</Col>
                                <Col>T&Cs</Col>
                                <Col>Privacy</Col>
                            </Row>
                        </Col>
                        <Col xs={24} md={8} lg={8} className="info-footer">
                            <Row>
                                <Col><Link to="" className="navbar-text nav-link navbar-text-footer"><i>BLOG</i></Link></Col>
                                <Col xs={10} md={10} lg={10}></Col>
                                <Col><Link to="" className="navbar-text nav-link navbar-text-footer"><i>CORPORATE</i></Link></Col>
                            </Row>
                            <Row>
                                <Col><Link to="" className="navbar-text nav-link navbar-text-footer"><i>FA2S</i></Link></Col>
                                <Col xs={10} md={10} lg={10}></Col>
                                <Col><Link to="" className="navbar-text nav-link navbar-text-footer"><i>NATIVE</i></Link></Col>
                            </Row>
                            <Row>
                                <Col><Link to="" className="navbar-text nav-link navbar-text-footer"><i>CAREERS</i></Link></Col>
                                <Col xs={8} md={8} lg={8}></Col>
                                <Col><Link to="" className="navbar-text nav-link navbar-text-footer"><i>CONTACT</i></Link></Col>
                            </Row>
                            <Row>
                                <Col><Link to="" className="navbar-text nav-link navbar-text-footer"><i>SUSTAINABILITY</i></Link></Col>
                                <Col xs={4} md={4} lg={4}></Col>
                                <Col><Link to="" className="navbar-text nav-link navbar-text-footer"><i>INVESTORS</i></Link></Col>
                            </Row>
                            <Row style={{ marginBottom: "15px" }}>
                                <Col></Col>
                                <Col>
                                    <img src="https://www.nativeplaces.com/wp-content/themes/native/dist/img/asap-logo.png" alt="not found" width="100" height="70" />
                                </Col>
                            </Row>
                        </Col>                        
                    </Row>
                    <Row style={{ borderTop: "1px solid white" }}></Row>
                    <Row justify="center" style={{padding: "3vh 0"}}>
                        <Col className="navbar-text-footer">
                            <span>Made with ❤️ by Peter and Adrian</span>
                        </Col>
                    </Row>
                </Col>
                <Col xs={1} md={3} lg={3} />
            </Row>
        </>
    )
}
