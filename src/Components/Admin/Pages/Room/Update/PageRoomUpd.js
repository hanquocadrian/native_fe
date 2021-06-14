import { Col, Row } from 'antd'
import NavbarTop from 'Components/Admin/Common/Navigation/NavbarTop'
import RoomUpd from 'Components/Admin/Common/Room/RoomUpd'
import Sidebar from 'Components/Admin/Common/Sidebar/Sidebar'
import React from 'react'

function PageRoomUpd(props) {
    return (
        <>
            <NavbarTop props={props}/>
            <Row>
                <Col span={5}>
                    <Sidebar />
                </Col>
                <Col span={19}>
                    {/* Container */}
                    <RoomUpd propsParent={props} maPhong={props.match.params.id} />
                </Col>
            </Row>     
        </>
    )
}

export default PageRoomUpd

