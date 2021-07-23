import React from 'react'
import NavbarTop from '../../../Common/Navigation/NavbarTop';
import { Row, Col } from 'antd';
import Sidebar from '../../../Common/Sidebar/Sidebar';
import BookingDetail from 'Components/Admin/Common/Booking/BookingDetail';

export default function PageBookingDetail(props) {
    return (
        <>
            <NavbarTop props={props}/>
            <Row>
                <Col span={5}>
                    <Sidebar />
                </Col>
                <Col span={19}>
                    <BookingDetail propsParent={props} idDDP={props.match.params.id} />
                </Col>
            </Row>  
        </>
    )
}