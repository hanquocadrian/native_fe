import { Col, Row } from 'antd'
import BookingServiceAdd from 'Components/Admin/Common/BookingService/BookingServiceAdd'
import NavbarTop from 'Components/Admin/Common/Navigation/NavbarTop'
import Sidebar from 'Components/Admin/Common/Sidebar/Sidebar'
import React from 'react'

function PageBookingServiceAdd(props) {
    return (
        <>
            <NavbarTop props={props}/>
            <Row>
                <Col span={5}>
                    <Sidebar />
                </Col>
                <Col span={19}>
                    {/* Container */}
                    <BookingServiceAdd propsParent={props}/>
                </Col>
            </Row> 
        </>
    )
}

export default PageBookingServiceAdd

