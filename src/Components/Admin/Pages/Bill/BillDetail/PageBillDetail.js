import { Col,  Row } from 'antd';
import BillDetail from 'Components/Admin/Common/Bill/BillDetail/BillDetail';
import NavbarTop from 'Components/Admin/Common/Navigation/NavbarTop';
import Sidebar from 'Components/Admin/Common/Sidebar/Sidebar';
import React from 'react';


function PageBillDetail(props) {
    return (
        <>
            <NavbarTop props={props}/>
            <Row>
                <Col span={5}>
                    <Sidebar />
                </Col>
                <Col span={19}>
                    <BillDetail propsParent={props} idPTT={props.match.params.id} />
                </Col>
            </Row>  
        </>
    )
}

export default PageBillDetail

