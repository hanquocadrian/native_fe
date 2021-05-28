import React from 'react'
import { Row, Col, Image } from 'antd';

import { GiNewspaper, GiMeal, GiCoffeeCup, GiWineBottle } from "react-icons/gi";
import { MdSmokeFree, MdRoomService } from "react-icons/md";
import { FaWheelchair } from "react-icons/fa";
import { AiOutlinePhone, AiFillCar } from "react-icons/ai";
import { RiHandHeartLine, RiLuggageCartLine } from "react-icons/ri";
import { CgSmartHomeWashMachine } from "react-icons/cg";

import './Service.css';
import SliderService from '../SliderService/SliderService';

export default function Service() {
    return (
        <div style={{ overflow: "hidden", width: "100vw" }}>
            <div>
                <Row style={{paddingTop:'3%', paddingBottom:'-5%', backgroundColor:'#E5E5E5'}}>
                    <Col span={10}>
                        <div style={{padding:'4% 0 0 40%'}}>
                            <GiNewspaper style={{width:'5vw', height:'5vh', color:'black'}}/>
                            <RiLuggageCartLine style={{width:'5vw', height:'5vh', color:'black'}}/>
                            <GiMeal style={{width:'5vw', height:'5vh', color:'black'}}/>
                            <GiWineBottle style={{width:'5vw', height:'5vh', color:'black'}}/>
                        </div>
                    </Col>
                    <Col span={4}>
                        <p style={{fontFamily:'Cambria', fontSize:'20px', textAlign:'center'}}>
                            AT YOUR DISPOSAL
                        </p>
                        <p style={{fontFamily:'Cambria', fontSize:'40px', textAlign:'center', fontWeight:'bold'}}>
                            Services
                        </p>
                    </Col>
                    <Col span={10}>
                        <div style={{padding:'4% 0 0 15%'}}>
                            <MdRoomService style={{width:'5vw', height:'5vh', color:'black'}}/>
                            <AiOutlinePhone style={{width:'5vw', height:'5vh', color:'black'}}/>
                            <RiHandHeartLine style={{width:'5vw', height:'5vh', color:'black'}}/>
                            <GiCoffeeCup style={{width:'5vw', height:'5vh', color:'black'}}/>
                        </div>
                    </Col>
                </Row>
                <Row style={{paddingTop:'2%'}}>
                    <Col span={8}></Col>
                    <Col span={8}>
                        <p style={{fontFamily:'Cambria', fontSize:'20px', textAlign:'center'}}>
                            Besides the services offered by the hotel, our staff is here to answer your needs 24/7. Please ask the frontdesk for any request.
                        </p>
                    </Col>
                    <Col span={8}></Col>
                </Row>
            </div>
            <div style={{paddingTop:'2%'}}>
                <Row>
                    <Col span={3}></Col>
                    <Col span={9}>
                        <span style={{fontFamily:'Cambria', fontSize:'30px',fontWeight:'bold'}}>Meet our services</span>
                        <p style={{fontFamily:'Cambria', fontSize:'18px',fontWeight:'revert', padding:'3% 0 3% 0'}}>
                            When you stay with us you'll get more services than you expected, we'll be sure you'll feel comfortable and love it. So now let check it out in below!!!
                        </p>
                    </Col>
                    <Col span={9}></Col>
                    <Col span={3}></Col>
                </Row>
                <Row style={{ marginTop: "0vh", height: "92vh" }}>
                    <Col xs={1} md={3} lg={3}></Col>
                    <Col xs={20} md={18} lg={18}>
                        <SliderService />
                    </Col>
                    <Col xs={1} md={3} lg={3}></Col>
                </Row>
            </div>
        </div>
    )
}


