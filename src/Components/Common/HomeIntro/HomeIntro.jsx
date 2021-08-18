import React from 'react'
import { Row, Col, Divider } from 'antd';

import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { BiSwim } from 'react-icons/bi';

export default function HomeIntro() {    
    AOS.init();
    var aos_right = {
        'data-aos': "fade-right",
        'data-aos-offset': "400",
        'data-aos-duration': "750"
    };
    
    var aos_left = {
        'data-aos': "fade-left",
        'data-aos-offset': "350",
        'data-aos-duration': "750"
    };

    var aos_up = {
        'data-aos': "fade-up",
        'data-aos-anchor-placement': "top-bottom",
        'data-aos-offset': "350",
        'data-aos-duration': "750"
    }
    return (
        <>
            <Row { ...aos_right } style={{ minHeight: "82vh", paddingBottom: '3vh' }}>
                <Divider />
                <Row className="mb-15">
                    <Col xs={1} md={2} lg={4}/>
                    <Col xs={22} md={20} lg={16}style={{ textAlign: "center"}}>
                        <span style={{ fontSize:'43px', fontWeight:'bolder' }}>Dining and drinks</span>
                        <p style={{textAlign:'center', fontSize:'20px'}}>A destination for local foodies, our restaurants serve bold flavors with sweeping city views. Join us in Baptiste & Bottle for a Midwestern spin on American fare and Noyane for a fusion of Japanese and Peruvian flavors.</p>
                    </Col>
                    <Col xs={1} md={2} lg={4}/>
                </Row>
                <Row>
                    <Row>
                        <Col><img style={{ width: '100vw', height: 'auto' }} src='https://firebasestorage.googleapis.com/v0/b/fir-nativecity.appspot.com/o/local%2Fbar.jpg?alt=media&token=036a8a0c-df18-4af8-ac17-95576b5260b4'  alt="hotel bar" /></Col> 
                    </Row>
                </Row>
            </Row>
            <Row { ...aos_left } style={{ minHeight: "82vh", paddingBottom: '3vh' }}>
                <Divider />
                <Row className="mb-15">
                    <Col xs={1} md={1} lg={1}/>
                    <Col xs={22} md={22} lg={7} style={{textAlign:'center', paddingTop:'10%'}}>
                        <span style={{fontSize:'43px', fontWeight:'bolder'}}>Swim pool why not ?</span>
                        <p style={{fontSize:'20px', marginLeft:'5%', paddingTop:'8%'}}>Near Chaweng Beach on Thailand’s idyllic Koh Samui island, the Red Pool at Native hotel beckons guests with its mesmerizing mosaic of yellow, orange, and red tiles.</p>
                        <BiSwim style={{width:'70px', height:'auto'}}/>
                    </Col>
                    <Col xs={1} md={1} lg={1}/>
                    <Col xs={24} md={24} lg={6} style={{ textAlign: "center"}}>
                        <img style={{ width: '58vw', height: 'auto' }} src='https://firebasestorage.googleapis.com/v0/b/fir-nativecity.appspot.com/o/local%2Fswimpool.jpg?alt=media&token=b66568a6-8647-46b1-8003-42f806d8771a' alt="hotel swim pool"/>
                    </Col>
                    <Col xs={0} md={0} lg={4}/>
                </Row>
            </Row>
            <Row { ...aos_up } style={{ minHeight: "20vh", paddingBottom: '5vh' }}>
                <Divider />
                <Row className="mb-15">
                    <Col xs={8} md={8} lg={8}/>
                    <Col xs={8} md={8} lg={8} style={{ textAlign: "center"}}>
                        <img style={{ width: '58vw', height: 'auto' }} src='https://firebasestorage.googleapis.com/v0/b/fir-nativecity.appspot.com/o/local%2Fcovid-confident.png?alt=media&token=f606ca37-b115-4216-b565-c61ad0585bda' alt="hotel swim pool"/>
                    </Col>
                    <Col xs={8} md={8} lg={8}/>
                </Row>
            </Row>
        </>
    )
}
