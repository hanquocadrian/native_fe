import React from 'react'
import NavbarTop from '../../../Common/Navigation/NavbarTop';
import { Row, Col } from 'antd';
import Sidebar from '../../../Common/Sidebar/Sidebar';
import RoomTypeAdd from 'Components/Admin/Common/RoomType/RoomTypeAdd';

export default function PageRoomTypeAdd(props) {
    return (
        <>
            <NavbarTop props={props}/>
            <Row>
                <Col span={5}>
                    <Sidebar />
                </Col>
                <Col span={19}>
                    {/* Container */}
                    <RoomTypeAdd />
                </Col>
            </Row>  
        </>
    )
}
