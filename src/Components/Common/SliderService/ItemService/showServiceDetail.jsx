import React from 'react'
import { Row, Col, Image } from 'antd';


export default function showServiceDetail(props) {
    return (
        <Row style={{fontSize:'16px', textAlign:'justify'}}>
            <Col xs={24} md={13} lg={14}>
                <Row>
                    <Col xs={2} md={2} lg={2}>
                        <b>${props.donGia}</b>
                    </Col>
                    <Col xs={22} md={22} lg={22}>
                        {
                            props.hinhThuc === 1 ? 'per booking' : (props.hinhThuc === 2 ? 'per person per date' : 'free')
                        }
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col xs={22} md={22} lg={20}>
                        <b>{props.moTaTD}</b>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col xs={22} md={22} lg={20}>
                        {props.moTaCT}
                    </Col>
                </Row>
            </Col>
            <Col xs={24} md={1} lg={0} style={{height: '15px'}} />
            <Col xs={0} md={0} lg={10}>
                <Image
                    style={{width: "26vw"}}
                    src={props.hinhAnhDV[0].hinhAnh}
                />
                <Row style={{paddingTop:'2%'}}>
                    {
                        props.hinhAnhDV.map((item, index) => 
                            <Col xs={0} md={0} lg={5}>
                                <Image
                                    key={index}
                                    width={60}
                                    src={item.hinhAnh}
                                />
                            </Col>
                        )
                    }
                </Row>
            </Col>
            <Col xs={0} md={10} lg={0}>
                <Image
                    style={{width: "35vw"}}
                    src={props.hinhAnhDV[0].hinhAnh}
                />
                <Row style={{paddingTop:'2%'}}>
                    {
                        props.hinhAnhDV.map((item, index) => 
                            <Col xs={0} md={5} lg={0}>
                                <Image
                                    key={index}
                                    width={60}
                                    src={item.hinhAnh}
                                />
                            </Col>
                        )
                    }
                </Row>
            </Col>
            <Col xs={24} md={0} lg={0}>
                <Image
                    style={{width: "60vw"}}
                    src={props.hinhAnhDV[0].hinhAnh}
                />
                <Row style={{paddingTop:'2%'}}>
                    {
                        props.hinhAnhDV.map((item, index) => 
                            <Col xs={4} md={0} lg={0}>
                                <Image
                                    key={index}
                                    width={60}
                                    src={item.hinhAnh}
                                />
                            </Col>
                        )
                    }
                </Row>
            </Col>
        </Row>
    )
}

