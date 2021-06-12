import { Col, Row } from 'antd'
import DailyRateUpd from 'Components/Admin/Common/DailyRate/DailyRateUpd'
import NavbarTop from 'Components/Admin/Common/Navigation/NavbarTop'
import Sidebar from 'Components/Admin/Common/Sidebar/Sidebar'
import React from 'react'

function PageDailyRateUpd(props) {
    return (
        <>
            <NavbarTop props={props}/>
            <Row>
                <Col span={5}>
                    <Sidebar />
                </Col>
                <Col span={19}>
                    {/* Container */}
                    <DailyRateUpd propsParent={props} idGTN={props.match.params.id} />
                </Col>
            </Row>     
        </>
    )
}

export default PageDailyRateUpd

