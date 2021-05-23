import React from 'react'
import { Carousel, Row, Col, Image, Collapse } from 'antd';

import { GiNewspaper, GiMeal, GiCoffeeCup, GiWineBottle } from "react-icons/gi";
import { MdSmokeFree, MdRoomService } from "react-icons/md";
import { FaWheelchair } from "react-icons/fa";
import { AiOutlinePhone, AiFillCar } from "react-icons/ai";
import { RiHandHeartLine, RiLuggageCartLine } from "react-icons/ri";
import { CgSmartHomeWashMachine } from "react-icons/cg";

import Navbar from '../Navigation/Navbar';
import { http } from '../../link';
import axios from 'axios';
import { useState, useEffect } from 'react';
import CarouselQC from 'Components/CarouselQC/CarouselQC';

export default function Service() {
    const [slideQuangCao, setSlideQuangCao] = useState([]);
    const { Panel } = Collapse;

    useEffect(() => {
        try {
            const getSlideQuangCao = async () => {
                var url = http + '/api/slider';
                const result = await axios.get(url)
                .then((res) => res.data)
                .catch((err) => console.log(err));

                setSlideQuangCao(result);
            }      

            getSlideQuangCao();      
        } catch (error) {
            console.log(error);
        }
    }, [])

    return (
        <div style={{ overflow: "hidden", width: "100vw" }}>
            <Navbar />
            <CarouselQC height='67'/>
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
                <Row gutter={20}>
                    <Col span={3}></Col>
                    <Col span={6}>
                        <Image
                            width={'auto'}
                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                        />
                        <span style={{fontSize:'19px', fontWeight:'bold', textAlign:'center'}}>International newspapers and magazines</span>
                        <p>Public Art Gallery Science Gallery London, Great Maze Pond, London, SE1 9GU</p>
                        <Collapse accordion expandIconPosition='right'>
                            <Panel header="More Details" key="1" >
                                <Row>
                                    <Col span={10}>
                                        <p>
                                            Tucked away under an arch, this brilliant little restaurant is one of the best places in the city for a touch of Tel Aviv. Sit at the bar to feel the flames on your face, and don’t hold back on the delicious cocktails. We tried most of the menu and there wasn’t a dud one among them.
                                        </p>
                                    </Col>
                                    <Col span={14}>
                                        <Image
                                            width={'auto'}
                                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                        />
                                    </Col>
                                </Row>
                            </Panel>
                        </Collapse>
                    </Col>
                    <Col span={6}>
                        <Image
                            width={'auto'}
                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                        />
                        <span style={{fontSize:'19px', fontWeight:'bold', textAlign:'center'}}>Handicap entrance</span>
                        <p>Public Art Gallery Science Gallery London, Great Maze Pond, London, SE1 9GU</p>
                        <Collapse accordion expandIconPosition='right'>
                            <Panel header="More Details" key="1">
                                <Row>
                                    <Col span={10}>
                                        <p>
                                            Tucked away under an arch, this brilliant little restaurant is one of the best places in the city for a touch of Tel Aviv. Sit at the bar to feel the flames on your face, and don’t hold back on the delicious cocktails. We tried most of the menu and there wasn’t a dud one among them.
                                        </p>
                                    </Col>
                                    <Col span={14}>
                                        <Image
                                            width={'auto'}
                                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                        />
                                    </Col>
                                </Row>
                            </Panel>
                        </Collapse>
                    </Col>
                    <Col span={6}>
                        <Image
                            width={'auto'}
                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                        />
                        <span style={{fontSize:'19px', fontWeight:'bold', textAlign:'center'}}>Luggage room</span>
                        <p>Public Art Gallery Science Gallery London, Great Maze Pond, London, SE1 9GU</p>
                        <Collapse accordion expandIconPosition='right'>
                            <Panel header="More Details" key="1">
                                <Row>
                                    <Col span={10}>
                                        <p>
                                            Tucked away under an arch, this brilliant little restaurant is one of the best places in the city for a touch of Tel Aviv. Sit at the bar to feel the flames on your face, and don’t hold back on the delicious cocktails. We tried most of the menu and there wasn’t a dud one among them.
                                        </p>
                                    </Col>
                                    <Col span={14}>
                                        <Image
                                            width={'auto'}
                                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                        />
                                    </Col>
                                </Row>
                            </Panel>
                        </Collapse>
                    </Col>
                    <Col span={3}></Col>
                </Row>
            </div>
        </div>
    )
}


