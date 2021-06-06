import React from 'react'
import NavbarTop from '../../../Common/Navigation/NavbarTop';
import { Col, Row } from 'antd';
import Sidebar from '../../../Common/Sidebar/Sidebar';
import RoomTypeUpd from '../../../Common/RoomType/RoomTypeUpd';

export default function PageRoomTypeUpd(props) {
    return (
        <>
            <NavbarTop props={props}/>
            <Row>
                <Col span={5}>
                    <Sidebar />
                </Col>
                <Col span={19}>
                    <RoomTypeUpd propsParent={props} idLP={props.match.params.id} />
                </Col>
            </Row>  
        </>
    )
}
