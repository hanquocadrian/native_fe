import React from 'react'
import NavbarTop from '../../Common/Navigation/NavbarTop';
import { Row, Col } from 'antd';
import Sidebar from '../../Common/Sidebar/Sidebar';
import ChartBooking from 'Components/Admin/Common/Chart/ChartBooking';
import ChartBill from 'Components/Admin/Common/Chart/ChartBill';
import ChartNumRTBooking from 'Components/Admin/Common/Chart/ChartNumRTBooking';
import './Home.css';
import ChartBookingService from 'Components/Admin/Common/Chart/ChartBookingService';
import ChartCusStay from 'Components/Admin/Common/Chart/ChartCusStay';
import { useSelector } from 'react-redux';
export default function Home(props) {
    const phanQuyen = useSelector(state => state.adminAccountReducer.phanQuyen);
    return (
        <div style={{ overflow: 'hidden', height: '100%' }}>
            <NavbarTop props={props}/>
            <Row>
                <Col span={5}>
                    <Sidebar />
                </Col>
                <Col span={19}>
                    <Row className="container" justify="center" style={{height: '90vh', overflow: 'scroll' }}>
                        <Col xs={24} md={24} lg={24}>
                        {
                            (phanQuyen === 2) && (<>
                                <section>
                                    <Row>
                                        <Col xs={2} md={2} lg={2} />
                                        <Col xs={20} md={20} lg={20}>
                                            <h1 style={{ fontSize: '35px' }} className="text-center mt-30"><b>QUARTERLY REPORT</b></h1>
                                        </Col>
                                        <Col xs={2} md={2} lg={2} />
                                    </Row>
                                    <Row>
                                        <Col xs={2} md={2} lg={2} />
                                        <Col xs={20} md={20} lg={20}>
                                                <ChartBooking />
                                        </Col>
                                        <Col xs={2} md={2} lg={2} />
                                    </Row>
                                </section>
                                <section>
                                    <Row>
                                        <Col xs={2} md={2} lg={2} />
                                        <Col xs={20} md={20} lg={20}>
                                            <div style={{ height: '3vh' }} />
                                            <ChartBookingService />
                                        </Col>
                                        <Col xs={2} md={2} lg={2} />
                                    </Row>
                                </section>
                                <section>
                                    <Row>
                                        <Col xs={2} md={2} lg={2} />
                                        <Col xs={20} md={20} lg={20}>
                                            <div style={{ height: '3vh' }} />
                                            <ChartBill />
                                        </Col>
                                        <Col xs={2} md={2} lg={2} />
                                    </Row>
                                </section>
                            </>)
                        }
                            <section>
                                <Row>
                                    <Col xs={2} md={2} lg={2} />
                                    <Col xs={20} md={20} lg={20}>
                                        <div style={{ height: '3vh' }} />
                                        <ChartNumRTBooking />
                                    </Col>
                                    <Col xs={2} md={2} lg={2} />
                                </Row>
                            </section>
                            <section>
                                <Row>
                                    <Col xs={2} md={2} lg={2} />
                                    <Col xs={20} md={20} lg={20}>
                                        <div style={{ height: '3vh' }} />
                                        <ChartCusStay />
                                    </Col>
                                    <Col xs={2} md={2} lg={2} />
                                </Row>
                            </section>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}
