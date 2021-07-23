import { Col, Row } from 'antd'
import NavbarTop from 'Components/Admin/Common/Navigation/NavbarTop'
import RRCAdd from 'Components/Admin/Common/RoomRentalContract/RRCAdd'
import Sidebar from 'Components/Admin/Common/Sidebar/Sidebar'
import React from 'react'

function PageRRCAdd(props) {
    return (
        <>
            <NavbarTop props={props}/>
            <Row>
                <Col span={5}>
                    <Sidebar />
                </Col>
                <Col span={19}>
                    {/* Container */}
                    <RRCAdd />
                </Col>
            </Row>       
        </>
    )
}

export default PageRRCAdd

