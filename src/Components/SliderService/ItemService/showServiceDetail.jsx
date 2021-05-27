import React from 'react'
import { Row, Col, Image } from 'antd';


export default function showServiceDetail(props) {
    return (
        <Row style={{fontSize:'16px', textAlign:'justify'}}>
            <Col span={14}>
                <Row>
                    <Col span={2}>
                        <b>${props.donGia}</b>
                    </Col>
                    <Col span={22}>
                        {
                            props.hinhThuc === 1 ? 'per booking' : (props.hinhThuc === 2 ? 'per person per date' : 'free')
                        }
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col span={20}>
                        <b>{props.moTaTD}</b>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col span={20}>
                        {props.moTaCT}
                    </Col>
                </Row>
            </Col>
            <Col span={10}>
                <Image
                    width={350}
                    src={props.hinhAnhDV[0].hinhAnh}
                />
                <Row style={{paddingTop:'2%'}}>
                    {
                        props.hinhAnhDV.map((item, index) => 
                            <Col span={4}>
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

