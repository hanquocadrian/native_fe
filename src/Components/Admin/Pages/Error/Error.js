import React from 'react'
import { Row, Col } from 'antd';
import Sidebar from '../../Common/Sidebar/Sidebar';
import Error from '../../Common/Error/Error';

export default function index() {
    return (
        <div>
            {/* <Navbar /> */}
            <Row>
                <Col span={5}>
                    <Sidebar />
                </Col>
                <Col span={19}>
                    <Error />
                </Col>
            </Row>
        </div>
    )
}
