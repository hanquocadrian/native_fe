import React from 'react'
import NavbarTop from '../../../Common/Navigation/NavbarTop';
import { Row, Col } from 'antd';
import Sidebar from '../../../Common/Sidebar/Sidebar';
import ServiceDetail from 'Components/Admin/Common/Service/ServiceDetail';

export default function PageServiceDetail(props) {
    return (
        <>
            <NavbarTop props={props}/>
            <Row>
                <Col span={5}>
                    <Sidebar />
                </Col>
                <Col span={19}>
                    <ServiceDetail propsParent={props} idDV={props.match.params.id} />
                </Col>
            </Row>  
        </>
    )
}
