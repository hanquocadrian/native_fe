import { Col, Row } from 'antd';
import React from 'react'
import { useEffect } from 'react';
import Navbar from '../Navigation/Navbar';
import SliderItem from '../SliderItem/SliderItem';
import Footer from '../Footer/Footer';
import CarouselQC from '../CarouselQC/CarouselQC';


export default function Home() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

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
