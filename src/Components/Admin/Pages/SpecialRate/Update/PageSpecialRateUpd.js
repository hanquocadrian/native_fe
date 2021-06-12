import { Col, Row } from 'antd'
import NavbarTop from 'Components/Admin/Common/Navigation/NavbarTop'
import Sidebar from 'Components/Admin/Common/Sidebar/Sidebar'
import SpecialRateUpd from 'Components/Admin/Common/SpecialRate/SpecialRateUpd'
import React from 'react'

function PageSpecialRateUpd(props) {
    return (
        <>
            <NavbarTop props={props}/>
            <Row>
                <Col span={5}>
                    <Sidebar />
                </Col>
                <Col span={19}>
                    {/* Container */}
                    <SpecialRateUpd propsParent={props} idGTT={props.match.params.id} />
                </Col>
            </Row>  
        </>
    )
}

export default PageSpecialRateUpd

