import React from 'react'
import NavbarTop from '../../../Common/Navigation/NavbarTop';
import { Col, Row } from 'antd';
import Sidebar from '../../../Common/Sidebar/Sidebar';
import RoomTypeImageAdd from 'Components/Admin/Common/RoomTypeImage/RoomTypeImageAdd';

function PageRoomTypeImageAdd(props) {
    return (
        <>
            <NavbarTop props={props}/>
            <Row>
                <Col span={5}>
                    <Sidebar />
                </Col>
                <Col span={19}>
                    {/* Container */}
                    <RoomTypeImageAdd />
                </Col>
            </Row>  
        </>
    )
}

export default PageRoomTypeImageAdd

