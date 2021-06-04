import React from 'react'
import NavbarTop from '../../../Common/Navigation/NavbarTop';
import { Col, Row } from 'antd';
import Sidebar from '../../../Common/Sidebar/Sidebar';
import ServiceUpd from '../../../Common/Service/ServiceUpd';

export default function PageServiceUpd(props) {
    return (
        <>
            <NavbarTop props={props}/>
            <Row>
                <Col span={5}>
                    <Sidebar />
                </Col>
                <Col span={19}>
                    <ServiceUpd propsParent={props} idDV={props.match.params.id} />
                </Col>
            </Row>  
        </>
    )
}
