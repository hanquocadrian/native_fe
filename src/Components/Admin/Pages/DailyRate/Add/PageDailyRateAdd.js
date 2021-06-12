import { Col, Row } from 'antd'
import DailyRateAdd from 'Components/Admin/Common/DailyRate/DailyRateAdd'
import NavbarTop from 'Components/Admin/Common/Navigation/NavbarTop'
import Sidebar from 'Components/Admin/Common/Sidebar/Sidebar'
import React from 'react'

export default function PageDailyRateAdd(props) {
    return (
        <>
            <NavbarTop props={props}/>
            <Row>
                <Col span={5}>
                    <Sidebar />
                </Col>
                <Col span={19}>
                    {/* Container */}
                    <DailyRateAdd />
                </Col>
            </Row>     
        </>
    )
}
