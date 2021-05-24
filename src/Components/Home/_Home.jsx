import { Col, Row } from 'antd';
import React from 'react'
import Navbar from '../Navigation/Navbar';
import SliderItem from 'Components/SliderItem/SliderItem';
import Footer from 'Components/Footer/Footer';
import CarouselQC from 'Components/CarouselQC/CarouselQC';


export default function Home() {


    return (
        <div style={{ overflow: "hidden", width: "100vw" }}>
            <Navbar />
            <CarouselQC height="92" />
            <Row style={{ marginTop: "8vh", height: "82vh" }}>
                <Col xs={1} md={3} lg={3}></Col>
                <Col xs={20} md={18} lg={18}>
                    <SliderItem />
                </Col>
                <Col xs={1} md={3} lg={3}></Col>
            </Row>

            <Row style={{ marginTop: "8vh", minHeight: "92vh" }}>
                <Col>
                    <Footer />
                </Col>
            </Row>
        </div>
    )
}
