import React from 'react'
import { Carousel, Row, Col, Rate, Image, Select, Collapse, Tooltip, DatePicker, Space } from 'antd';

import { HiOutlineUserGroup } from "react-icons/hi";
import { IoIosBed } from "react-icons/io";
import { FaBath, FaHotel, FaRegHandshake } from "react-icons/fa";
import { AiOutlineCheck, AiFillQuestionCircle, AiOutlineWifi } from "react-icons/ai";
import { SiClockify } from "react-icons/si";
import { BsBucket } from "react-icons/bs";
import { GrObjectUngroup } from "react-icons/gr";
import { GiPerfumeBottle } from "react-icons/gi";
import { CgSmartHomeWashMachine } from "react-icons/cg";

import Navbar from '../Navigation/Navbar';
import { http } from '../../link';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './RoomDetail.css'
import CarouselQC from 'Components/CarouselQC/CarouselQC';

export default function RoomDetail() {
    const { Option } = Select;
    const { Panel } = Collapse;
    const { RangePicker } = DatePicker;
    const [slideQuangCao, setSlideQuangCao] = useState([]);

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
        <div>
            <Navbar />
            <CarouselQC height='72'/>
            <div>
                <Row style={{padding:'3%'}}>
                    <Col span={6}></Col>
                    <Col span={12}>
                        <p style={{fontFamily:'Cambria', fontSize:'18px', textAlign:'center'}}>
                            Nestled in the heart of Edinburgh’s New Town, a UNESCO World Heritage Site, you’ll find us. Native Edinburgh’s enviable location on Queen Street means you’re walking distance from world-famous sights like Edinburgh Castle and Princes Street Gardens, as well as both Haymarket and Waverley Stations. If you’re looking for a city centre hotel in Edinburgh then our aparthotel offers everything you need and more!
                        </p>
                    </Col>
                    <Col span={6}></Col>
                </Row>
            </div>
            <div>
                <Row>
                    <Col span={3}></Col>
                    <Col span={6}>
                        <span style={{fontFamily:'Cambria', fontSize:'30px', fontWeight:'revert'}}>Premium Room</span>
                    </Col>
                    <Col span={6}>
                        <Rate style={{fontSize:'25px'}} disabled defaultValue={5} />
                    </Col>
                    <Col span={9}></Col>
                </Row>
                <Row style={{padding:'2% 0 2% 0'}} gutter={20}>
                    <Col span={3}></Col>
                    <Col span={6}>
                        <Image
                            width={350}
                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                        />
                    </Col>
                    <Col span={7}>
                        <Row>
                            <Col span={6} style={{borderRight:'1px solid #CECECE'}}>
                                <HiOutlineUserGroup style={{width:'4vw', height:'4vh'}}/><span style={{fontSize:'20px'}}>2</span>
                            </Col>
                            <Col span={6} style={{borderRight:'1px solid #CECECE'}}>
                                <IoIosBed style={{width:'4vw', height:'4vh'}}/><span style={{fontSize:'20px'}}>1</span>
                            </Col>
                            <Col span={6} style={{borderRight:'1px solid #CECECE'}}>
                                <FaBath style={{width:'4vw', height:'4vh'}}/><span style={{fontSize:'20px'}}>1</span>
                            </Col>
                            <Col span={6} style={{paddingLeft:'2%'}}>
                                <Select defaultValue="1 room" name="slPhong" style={{height:'4vh', width: 100 }}>
                                    <Option value="1">1 room</Option>
                                    <Option value="2">2 rooms</Option>
                                    <Option value="3">3 rooms</Option>
                                    <Option value="4">4 rooms</Option>
                                    <Option value="5">5 rooms</Option>
                                </Select>
                            </Col>
                        </Row>
                        <hr style={{color:'#D9D9D9'}}/>
                        <Row>
                            <Col span={24}>
                                <Collapse defaultActiveKey={['1']} expandIconPosition='right'>
                                    <Panel style={{fontFamily:'Cambria', fontSize:'15px', fontWeight:'bold'}} header="MORE DETAILS" key="1">
                                        <p style={{fontFamily:'Cambria', fontSize:'15px', fontWeight:'normal'}}>Small but perfectly formed, if you’re looking for a stylish pit stop on your travels then these studios are a great option. Packed full of quirky and original features, all come with a stunning shower room, modern kitchen and big comfy bed to clock some zzzz.</p>
                                        <Row style={{paddingTop:'3%', paddingBottom:'3%'}} >
                                            <Col>
                                                <span style={{fontFamily:'Cambria', fontSize:'15px', fontWeight:'bold'}}>WHAT INCLUDES?</span>
                                            </Col>
                                        </Row>
                                        <Row  style={{fontFamily:'Cambria', fontSize:'15px', fontWeight:'normal'}}>
                                            <Col span={12}>
                                                <Row>
                                                    <Col><AiOutlineCheck/> Weekly cleaning</Col>
                                                </Row>
                                                <Row>
                                                    <Col><AiOutlineCheck/> Toiletries</Col>
                                                </Row>
                                                <Row>
                                                    <Col><AiOutlineCheck/> Washer/Dryer</Col>
                                                </Row>
                                                <Row>
                                                    <Col><AiOutlineCheck/> Oven</Col>
                                                </Row>
                                                <Row>
                                                    <Col><AiOutlineCheck/> Fridge</Col>
                                                </Row>
                                            </Col>
                                            <Col span={12}>
                                                <Row>
                                                    <Col><AiOutlineCheck/> Dishwasher</Col>
                                                </Row>
                                                <Row>
                                                    <Col><AiOutlineCheck/> Iron & ironing board</Col>
                                                </Row>
                                                <Row>
                                                    <Col><AiOutlineCheck/> Crockery & Cutlery</Col>
                                                </Row>
                                                <Row>
                                                    <Col><AiOutlineCheck/> Fresh bed & towels</Col>
                                                </Row>
                                                <Row>
                                                    <Col><AiOutlineCheck/> Hairdryer</Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Panel>
                                </Collapse>
                                <Row style={{padding:'3% 0 3% 0'}}>
                                    <Col span={24}>
                                        <span style={{fontFamily:'Cambria'}}>Minimum stay from 1 nights. Price per night</span>
                                        <Tooltip placement="right"  title="Minimum night stay and average price per night vary depending on dates selected.">
                                            <span style={{paddingLeft:'2%'}} id="question"><AiFillQuestionCircle style={{width:'1vw', height:'auto'}}/></span>
                                        </Tooltip>
                                    </Col>
                                </Row>
                                <Row style={{ backgroundColor:'#F3F1EF', padding:'3%' }}>
                                    <Col>
                                        <span style={{fontFamily:'Cambria', fontSize:'20px', fontWeight:'bold'}}>Price: 5000 USD</span>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={5}>
                        <Row>
                            <Col style={{border:'1px solid #B27440', height: 'vh', width: '17.5vw'}} span={24}>
                                <Row style={{padding:'5%'}}>
                                    <Col span={3}></Col>
                                    <Col style={{textAlign:'center'}} span={18}>
                                        <span style={{fontFamily:'Cambria', fontSize:'20px', fontWeight:'bold'}}>Stay Native</span>
                                    </Col>
                                    <Col span={3}></Col>
                                </Row>
                                <Row style={{padding:'5%'}}>
                                    <Col span={3}></Col>
                                    <Col style={{textAlign:'center'}} span={18}>
                                        <div className='date-start-picker'>
                                            <DatePicker/>
                                        </div>
                                    </Col>
                                    <Col span={3}></Col>
                                </Row>
                                <Row style={{padding:'5%'}}>
                                    <Col span={3}></Col>
                                    <Col style={{textAlign:'center'}} span={18}>
                                        <div className='date-end-picker'>
                                            <DatePicker/>
                                        </div>
                                    </Col>
                                    <Col span={3}></Col>
                                </Row>
                                <Row style={{padding:'5%'}}>
                                    <Col span={3}></Col>
                                    <Col style={{textAlign:'center'}} span={18}>
                                        <button style={{backgroundColor:'#B27440', border:'none', width:'10vw', height:'auto'}}>
                                            <b style={{color:'white'}}>Add to cart</b>
                                        </button>
                                    </Col>
                                    <Col span={3}></Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={3}></Col>
                </Row>
                <hr style={{color:'#D9D9D9'}}/>
                <Row style={{paddingTop:'3%', paddingBottom:'3%'}}>
                    <Col span={24} style={{textAlign:'center'}}>
                        <span style={{fontFamily:'Cambria', fontSize:'30px', fontWeight:'revert'}}>What you get when you stay with us.</span>
                    </Col>
                </Row>
                <div>
                    <Row>
                        <Col span={4}></Col>
                        <Col span={4} style={{borderRight:'1px solid #CECECE'}}>
                            <div>
                                <div style={{textAlign:'center'}}><FaHotel style={{width:'4vw', height:'4vh'}}/></div>
                                <div style={{padding:'5%'}}><p style={{textAlign:'center', fontWeight:'revert'}}>CHECK IN 15:00 / CHECK OUT 11:00</p></div>
                            </div>
                        </Col>
                        <Col span={4} style={{borderRight:'1px solid #CECECE'}}>
                            <div>
                                <div style={{textAlign:'center'}}><SiClockify style={{width:'4vw', height:'4vh'}}/></div>
                                <div style={{padding:'5%'}}><p style={{textAlign:'center', fontWeight:'revert'}}>24/7 SUPPORT</p></div>
                            </div>
                        </Col>
                        <Col span={4} style={{borderRight:'1px solid #CECECE'}}>
                            <div>
                                <div style={{textAlign:'center'}}><BsBucket style={{width:'4vw', height:'4vh'}}/></div>
                                <div style={{padding:'5%'}}><p style={{textAlign:'center', fontWeight:'revert'}}>WEEKLY HOUSEKEEPING</p></div>
                            </div>
                        </Col>
                        <Col span={4}>
                            <div>
                                <div style={{textAlign:'center'}}><AiOutlineWifi style={{width:'4vw', height:'4vh'}}/></div>
                                <div style={{padding:'5%'}}><p style={{textAlign:'center', fontWeight:'revert'}}>FREE WIFI</p></div>
                            </div>
                        </Col>
                        <Col span={4}></Col>
                    </Row>
                    <Row style={{paddingBottom:'5%'}}>
                        <Col span={4}></Col>
                        <Col span={4} style={{borderRight:'1px solid #CECECE'}}>
                            <div>
                                <div style={{textAlign:'center'}}><GrObjectUngroup style={{width:'4vw', height:'4vh'}}/></div>
                                <div style={{padding:'5%'}}><p style={{textAlign:'center', fontWeight:'revert'}}>SOCIAL SPACES</p></div>
                            </div>
                        </Col>
                        <Col span={4} style={{borderRight:'1px solid #CECECE'}}>
                            <div>
                                <div style={{textAlign:'center'}}><GiPerfumeBottle style={{width:'4vw', height:'4vh'}}/></div>
                                <div style={{padding:'5%'}}><p style={{textAlign:'center', fontWeight:'revert'}}>LUXURY TOILETRIES</p></div>
                            </div>
                        </Col>
                        <Col span={4} style={{borderRight:'1px solid #CECECE'}}>
                            <div>
                                <div style={{textAlign:'center'}}><CgSmartHomeWashMachine style={{width:'4vw', height:'4vh'}}/></div>
                                <div style={{padding:'5%'}}><p style={{textAlign:'center', fontWeight:'revert'}}>WASHER DRYER</p></div>
                            </div>
                        </Col>
                        <Col span={4}>
                            <div>
                                <div style={{textAlign:'center'}}><FaRegHandshake style={{width:'4vw', height:'4vh'}}/></div>
                                <div style={{padding:'5%'}}><p style={{textAlign:'center', fontWeight:'revert'}}>24/7 RECEPTION</p></div>
                            </div>
                        </Col>
                        <Col span={4}></Col>
                    </Row>
                </div>
                
            </div>
        </div>
    )
}


