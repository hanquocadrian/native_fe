import React from 'react'
import NavbarTop from '../../../Common/Navigation/NavbarTop';
import { Row, Col } from 'antd';
import Sidebar from '../../../Common/Sidebar/Sidebar';
import CreateBooking from 'Components/Admin/Common/Booking/CreateBooking';

export default function PageBookingDetail(props) {
    return (
        <>
            <NavbarTop props={props}/>
            <Row>
                <Col span={5}>
                    <Sidebar />
                </Col>
                <Col span={19}>
                    <CreateBooking propsParent={props}/>
                </Col>
            </Row>  
        </>
    )
}