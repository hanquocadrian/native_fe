import { Col, Row } from 'antd'
import CustomerStayUpd from 'Components/Admin/Common/CustomerStay/CustomerStayUpd'
import NavbarTop from 'Components/Admin/Common/Navigation/NavbarTop'
import Sidebar from 'Components/Admin/Common/Sidebar/Sidebar'
import React from 'react'

function PageCustomerStayUpd(props) {
    return (
        <>
            <NavbarTop props={props}/>
            <Row>
                <Col span={5}>
                    <Sidebar />
                </Col>
                <Col span={19}>
                    {/* Container */}
                    <CustomerStayUpd  propsParent={props} idKHO={props.match.params.id} />
                </Col>
            </Row>       
        </>
    )
}

export default PageCustomerStayUpd

