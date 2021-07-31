import React from 'react'
import NavbarTop from '../../../Common/Navigation/NavbarTop';
import { Col, Row } from 'antd';
import Sidebar from '../../../Common/Sidebar/Sidebar';
import SurchargePriceUpd from 'Components/Admin/Common/SurchargePrice/SurchargePriceUpd';

export default function PageSurchargePriceUpd(props) {
    return (
        <>
            <NavbarTop props={props}/>
            <Row>
                <Col span={5}>
                    <Sidebar />
                </Col>
                <Col span={19}>
                    <SurchargePriceUpd propsParent={props} idGPT={props.match.params.id} />
                </Col>
            </Row>  
        </>
    )
}
