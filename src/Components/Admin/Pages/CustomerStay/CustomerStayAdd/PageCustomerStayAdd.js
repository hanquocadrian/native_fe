import { Col, Row } from 'antd'
import CustomerStayAdd from 'Components/Admin/Common/CustomerStay/CustomerStayAdd'
import NavbarTop from 'Components/Admin/Common/Navigation/NavbarTop'
import Sidebar from 'Components/Admin/Common/Sidebar/Sidebar'
import React from 'react'

function PageCustomerStayAdd(props) {
    return (
        <>
            <NavbarTop props={props}/>
            <Row>
                <Col span={5}>
                    <Sidebar />
                </Col>
                <Col span={19}>
                    {/* Container */}
                    <CustomerStayAdd />
                </Col>
            </Row>       
        </>
    )
}

export default PageCustomerStayAdd

