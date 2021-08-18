import { Col, Row } from 'antd';
import React from 'react'
import { useEffect } from 'react';
import Navbar from 'Components/Common/Navigation/Navbar';
import SliderItem from 'Components/Common/SliderItem/SliderItem';
import Footer from 'Components/Common/Footer/Footer';
import CarouselQC from 'Components/Common/CarouselQC/CarouselQC';
import HomeIntro from 'Components/Common/HomeIntro/HomeIntro';


export default function Home() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <div style={{ overflow: "hidden", width: "100vw" }}>
            <Navbar />
            <CarouselQC height="92" />
            <Row style={{ marginTop: "8vh", height: "72vh" }}>
                <Col xs={1} md={3} lg={3}></Col>
                <Col xs={20} md={18} lg={18}>
                    <SliderItem />
                </Col>
                <Col xs={1} md={3} lg={3}></Col>
            </Row>
            <HomeIntro />
            <Row style={{ marginTop: "8vh", minHeight: "92vh" }}>
                <Col>
                    <Footer />
                </Col>
            </Row>
        </div>
    )
}
