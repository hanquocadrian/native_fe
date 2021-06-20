import React from 'react'
import NavbarTop from '../../../Common/Navigation/NavbarTop';
import { Row, Col } from 'antd';
import Sidebar from '../../../Common/Sidebar/Sidebar';
import AdminAdd from 'Components/Admin/Common/AdminAccount/AdminAdd';

export default function PageServiceAdd(props) {
    return (
        <>
            <NavbarTop props={props}/>
            <Row>
                <Col span={5}>
                    <Sidebar />
                </Col>
                <Col span={19}>
                    {/* Container */}
                    <AdminAdd />
                </Col>
            </Row>  
        </>
    )
}
