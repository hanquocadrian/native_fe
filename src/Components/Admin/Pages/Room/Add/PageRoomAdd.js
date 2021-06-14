import { Col, Row } from 'antd'
import NavbarTop from 'Components/Admin/Common/Navigation/NavbarTop'
import RoomAdd from 'Components/Admin/Common/Room/RoomAdd'
import Sidebar from 'Components/Admin/Common/Sidebar/Sidebar'
import React from 'react'

function PageRoomAdd(props) {
    return (
        <>
            <NavbarTop props={props}/>
            <Row>
                <Col span={5}>
                    <Sidebar />
                </Col>
                <Col span={19}>
                    {/* Container */}
                    <RoomAdd />
                </Col>
            </Row>     
        </>
    )
}

export default PageRoomAdd

