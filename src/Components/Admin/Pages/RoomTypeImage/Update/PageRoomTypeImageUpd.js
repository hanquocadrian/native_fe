import React from 'react'
import { Col, Row } from 'antd';
import NavbarTop from '../../../Common/Navigation/NavbarTop';
import Sidebar from '../../../Common/Sidebar/Sidebar';
import RoomTypeImageUpd from 'Components/Admin/Common/RoomTypeImage/RoomTypeImageUpd';

function PageRoomTypeImageUpd(props) {
    return (
        <>
            <NavbarTop props={props}/>
            <Row>
                <Col span={5}>
                    <Sidebar />
                </Col>
                <Col span={19}>
                    {/* Container */}
                    <RoomTypeImageUpd propsParent={props} idHinhLP={props.match.params.id}  />
                </Col>
            </Row>  
        </>
    )
}

export default PageRoomTypeImageUpd

