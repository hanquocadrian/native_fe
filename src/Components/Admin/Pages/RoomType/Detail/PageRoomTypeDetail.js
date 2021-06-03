import React from 'react'
import NavbarTop from '../../../Common/Navigation/NavbarTop';
import { Row, Col } from 'antd';
import Sidebar from '../../../Common/Sidebar/Sidebar';
import RoomTypeDetail from 'Components/Admin/Common/RoomType/RoomTypeDetail';

export default function PageRoomTypeDetail(props) {
    return (
        <>
            <NavbarTop props={props}/>
            <Row>
                <Col span={5}>
                    <Sidebar />
                </Col>
                <Col span={19}>
                    <RoomTypeDetail propsParent={props} idLP={props.match.params.id} />
                </Col>
            </Row>  
        </>
    )
}
