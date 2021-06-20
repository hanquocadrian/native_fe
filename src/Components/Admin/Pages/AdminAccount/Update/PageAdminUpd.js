import React from 'react'
import NavbarTop from '../../../Common/Navigation/NavbarTop';
import { Col, Row } from 'antd';
import Sidebar from '../../../Common/Sidebar/Sidebar';
import AdminUpd from '../../../Common/AdminAccount/AdminUpd';

export default function PageAdminUpd(props) {
    return (
        <>
            <NavbarTop props={props}/>
            <Row>
                <Col span={5}>
                    <Sidebar />
                </Col>
                <Col span={19}>
                    <AdminUpd propsParent={props} idAdmin={props.match.params.id} />
                </Col>
            </Row>  
        </>
    )
}
