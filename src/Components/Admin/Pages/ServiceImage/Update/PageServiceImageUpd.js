import React from 'react'
import { Col, Row } from 'antd';
import NavbarTop from '../../../Common/Navigation/NavbarTop';
import Sidebar from '../../../Common/Sidebar/Sidebar';
import ServiceImageUpd from 'Components/Admin/Common/ServiceImage/ServiceImageUpd';

export default function PageServiceImageUpd(props) {
    return (
        <>
            <NavbarTop props={props}/>
            <Row>
                <Col span={5}>
                    <Sidebar />
                </Col>
                <Col span={19}>
                    {/* Container */}
                    <ServiceImageUpd propsParent={props} idHinhDV={props.match.params.id}  />
                </Col>
            </Row>  
        </>
    )
}
