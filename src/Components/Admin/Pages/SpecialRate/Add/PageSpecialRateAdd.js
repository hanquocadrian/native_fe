import { Col, Row } from 'antd'
import NavbarTop from 'Components/Admin/Common/Navigation/NavbarTop'
import Sidebar from 'Components/Admin/Common/Sidebar/Sidebar'
import SpecialRateAdd from 'Components/Admin/Common/SpecialRate/SpecialRateAdd'
import React from 'react'

function PageSpecialRateAdd(props) {
    return (
        <>
            <NavbarTop props={props}/>
            <Row>
                <Col span={5}>
                    <Sidebar />
                </Col>
                <Col span={19}>
                    {/* Container */}
                    <SpecialRateAdd />
                </Col>
            </Row>  
        </>
    )
}

export default PageSpecialRateAdd

