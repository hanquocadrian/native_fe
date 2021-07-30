import { Col,  Row } from 'antd';
import BookingServiceDetail from 'Components/Admin/Common/BookingService/BookingServiceDetail';
import NavbarTop from 'Components/Admin/Common/Navigation/NavbarTop';
import Sidebar from 'Components/Admin/Common/Sidebar/Sidebar';
import React from 'react';

function PageBookingServiceDetail(props) {
    return (
        <>
            <NavbarTop props={props}/>
            <Row>
                <Col span={5}>
                    <Sidebar />
                </Col>
                <Col span={19}>
                    <BookingServiceDetail propsParent={props} idDDDV={props.match.params.id} />
                </Col>
            </Row>  
        </>
    )
}

export default PageBookingServiceDetail

