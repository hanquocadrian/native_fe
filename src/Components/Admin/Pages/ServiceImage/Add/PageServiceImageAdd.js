import React from 'react'
import NavbarTop from '../../../Common/Navigation/NavbarTop';
import { Col, Row } from 'antd';
import Sidebar from '../../../Common/Sidebar/Sidebar';
import ServiceImageAdd from 'Components/Admin/Common/ServiceImage/ServiceImageAdd';

export default function PageServiceImageAdd(props) {
    return (
        <>
            <NavbarTop props={props}/>
            <Row>
                <Col span={5}>
                    <Sidebar />
                </Col>
                <Col span={19}>
                    {/* Container */}
                    <ServiceImageAdd />
                </Col>
            </Row>  
        </>
    )
}
