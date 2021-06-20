import React from 'react'
import NavbarTop from '../../Common/Navigation/NavbarTop';
import { Row, Col } from 'antd';
import Sidebar from '../../Common/Sidebar/Sidebar';
import ChartBooking from 'Components/Admin/Common/Chart/ChartBooking';
import ChartBill from 'Components/Admin/Common/Chart/ChartBill';

export default function Home(props) {
    return (
        <>
            <NavbarTop props={props}/>
            <Row>
                <Col span={5}>
                    <Sidebar />
                </Col>
                <Col span={19}>
                    <div style={{ height: '3vh' }} />
                    <Row>
                        <Col xs={2} md={2} lg={2} />
                        <Col xs={20} md={20} lg={20}>
                            <h1 className="text-center"><b>DASH BOARD</b></h1>
                        </Col>
                        <Col xs={2} md={2} lg={2} />
                    </Row>
                    <Row justify="center">
                        <Col xs={2} md={2} lg={2} />
                        <Col xs={20} md={20} lg={20}>
                            <div style={{ height: '3vh' }} />
                            <ChartBooking />
                            <div style={{ height: '5vh' }} />
                            <ChartBill />
                        </Col>
                        <Col xs={2} md={2} lg={2} />
                    </Row>
                </Col>
            </Row>
        </>
    )
}
