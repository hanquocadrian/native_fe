import React from 'react'
import NavbarTop from '../../../Common/Navigation/NavbarTop';
import { Row, Col } from 'antd';
import Sidebar from '../../../Common/Sidebar/Sidebar';
import SurchargePriceAdd from 'Components/Admin/Common/SurchargePrice/SurchargePriceAdd';

export default function PageSurchargePriceAdd(props) {
    return (
        <>
            <NavbarTop props={props}/>
            <Row>
                <Col span={5}>
                    <Sidebar />
                </Col>
                <Col span={19}>
                    {/* Container */}
                    <SurchargePriceAdd />
                </Col>
            </Row>  
        </>
    )
}
