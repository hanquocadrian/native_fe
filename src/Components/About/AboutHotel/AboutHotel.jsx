import React from 'react'
import { Col, Row } from 'antd';import { MdKitchen } from "react-icons/md";
import { GiPerfumeBottle } from "react-icons/gi";
import { GiBroom } from "react-icons/gi";
import { BiWifi } from "react-icons/bi";
import { IoIosBed } from "react-icons/io";
import { CgSmartHomeWashMachine } from "react-icons/cg";
import { GiSofa } from "react-icons/gi";
import { SiClockify } from "react-icons/si";


export default function AboutHotel() {
    
    return (
        <>
            <Row style={{ paddingTop:'3%', paddingBottom:'2%', backgroundColor:'#F3F1EF' }}>
                <Col xs={1} md={3} lg={3}></Col>
                <Col xs={20} md={18} lg={18}>
                    <p style={{fontFamily:'Cambria', fontSize:'20px', textAlign:'center'}}>Hello there, we are Native. Here’s what makes us tick. Unique apartments where guests have space and freedom to feel right at home right away. Eclectic buildings of all styles, shapes and sizes and authentic local experiences. We love to share our local knowledge so our guests are always in the know. Our Natives always go that extra mile.</p> 
                </Col>
                <Col xs={1} md={3} lg={3}></Col>
            </Row>
            <Row>
                <Col xs={3} md={3} lg={3} />
                <Col xs={18} md={18} lg={8} style={{ paddingTop:'15%', paddingBottom:'15%' }}>
                    <h1 style={{textAlign:'center', fontWeight:'revert'}}>Experience.</h1>
                    <p style={{textAlign:'center', fontSize:'18px'}}>If you haven’t booked one of our apartments before, then prepare to transform the way you stay. If you’re looking to break free from the shackles of hotel rules and don’t want to run the risk of an unresponsive host or lack of privacy then we’re right up your street. While not every property has a concierge, we have a full-time team available 24/7 to be on-site to help with any issue big or small.</p>
                </Col>
                <Col xs={3} md={3} lg={1} />
                <Col xs={0} md={0} lg={12}>
                    <img style={{ width: '50vw', height: '92vh' }} src='./assets/images/IMG_about_1.jpg'  alt="about hotel 1" />
                </Col>
                <Col xs={24} md={24} lg={0}>
                    <img style={{ width: '100vw', height: 'auto' }} src='./assets/images/IMG_about_1.jpg'  alt="about hotel 1" />
                </Col>
            </Row>
            <Row>
                <Col xs={0} md={0} lg={12}>
                    <img style={{ width: '50vw', height: '92vh' }} src='./assets/images/IMG_about_3.jpg'  alt="about hotel 3" />
                </Col>
                <Col xs={3} md={3} lg={1} />
                <Col xs={18} md={18} lg={8} style={{ paddingTop:'15%', paddingBottom:'15%' }}>
                    <h1 style={{textAlign:'center', fontWeight:'revert'}}>People.</h1>
                    <p style={{textAlign:'center', fontSize:'18px'}}>We call ourselves Natives. We’ve been independent spirits for over 20 years when our founder Guy Nixon spotted a gap in the market to offer extended stay travellers all the benefits of apartment living coupled with the service and flexibility of a hotel.</p>
                </Col>
                <Col xs={3} md={3} lg={3} />
                <Col xs={24} md={24} lg={0}>
                    <img style={{ width: '100vw', height: 'auto' }} src='./assets/images/IMG_about_3.jpg'  alt="about hotel 3" />
                </Col>
            </Row>
            <Row>
                <Col xs={3} md={3} lg={3} />
                <Col xs={18} md={18} lg={8} style={{ paddingTop:'15%', paddingBottom:'15%' }}>
                    <h1 style={{textAlign:'center', fontWeight:'revert'}}>Places.</h1>
                    <p style={{textAlign:'center', fontSize:'18px'}}>Old historic warehouses, striking modern developments and tucked away mews houses are just some of the places we call home – and no two of our apartments are the same meaning that you can choose a size and budget to suit you.</p>
                </Col>
                <Col xs={3} md={3} lg={1} />
                <Col xs={0} md={0} lg={12}>
                    <img style={{ width: '50vw', height: '92vh' }} src='./assets/images/IMG_about_2.jpg'  alt="about hotel 2" />
                </Col>
                <Col xs={24} md={24} lg={0}>
                    <img style={{ width: '100vw', height: 'auto' }} src='./assets/images/IMG_about_2.jpg'  alt="about hotel 2" />
                </Col>
            </Row>
            <Row style={{ paddingTop:'5%', backgroundColor:'#F3F1EF'}}>
                <Col xs={5} md={5} lg={5}></Col>
                <Col xs={14} md={14} lg={14}>
                    <h1 style={{textAlign:'center', fontWeight:'revert'}}>The Fine Details</h1>
                    <p style={{fontFamily:'Cambria', fontSize:'20px', textAlign:'center'}}>Our Native places come with fully equipped kitchens, right down to a corkscrew and frying pan. Banish hotel room service – it doesn’t get much more authentic than shopping in local markets and bringing back fresh ingredients to your apartment. Whether you want to whip up a delicious meal or simply boil a fresh egg for breakfast, the choice is yours. We even provide you with the detergent to do the washing up so you don’t have to think about a thing!</p>        
                </Col>
                <Col xs={5} md={5} lg={5}></Col>
            </Row>
            <Row style={{ paddingTop:'5%', backgroundColor:'#F3F1EF'}}>
                <Col xs={2} md={2} lg={2}></Col>
                <Col xs={10} md={10} lg={10}>
                    <Row>
                        <Col xs={24} md={12} lg={12} style={{ height:"125px" }}>
                            <div style={{textAlign:'center'}}><MdKitchen style={{width:'30px', height:'30px'}}/></div>
                            <div style={{padding:'5%'}}><p style={{textAlign:'center', fontWeight:'revert'}}>FULLY EQUIPPED KITCHEN WITH DINING AREA</p></div>
                        </Col>
                        <Col xs={24} md={12} lg={12} style={{ height:"125px" }}>
                            <div style={{textAlign:'center'}}><GiPerfumeBottle style={{width:'30px', height:'30px'}}/></div>
                            <div style={{padding:'5%'}}><p style={{textAlign:'center', fontWeight:'revert'}}>LUXURY TOILETRIES, HAIRDRYER AND IRONING FACILITIES</p></div> 
                        </Col>
                    </Row>
                </Col>
                <Col xs={10} md={10} lg={10}>
                    <Row>
                        <Col xs={24} md={12} lg={12} style={{ height:"125px" }}>
                            <div style={{textAlign:'center'}}><GiBroom style={{width:'30px', height:'30px'}}/></div>
                            <div style={{padding:'5%'}}><p style={{textAlign:'center', fontWeight:'revert'}}>WEEKLY CLEANING</p></div>
                        </Col>
                        <Col xs={24} md={12} lg={12} style={{ height:"125px" }}>
                            <div style={{textAlign:'center'}}><BiWifi style={{width:'30px', height:'30px'}}/></div>
                            <div style={{padding:'5%'}}><p style={{textAlign:'center', fontWeight:'bold'}}>FREE WIFI</p></div>
                        </Col>
                    </Row>
                </Col>
                <Col xs={2} md={2} lg={2}></Col>
            </Row>            
            <Row style={{ paddingTop:'5%', backgroundColor:'#F3F1EF'}}>
                <Col xs={2} md={2} lg={2}></Col>
                <Col xs={10} md={10} lg={10}>
                    <Row>
                        <Col xs={24} md={12} lg={12} style={{ height:"125px" }}>
                            <div style={{textAlign:'center'}}><IoIosBed style={{width:'30px', height:'30px'}}/></div>
                            <div style={{padding:'5%'}}><p style={{textAlign:'center', fontWeight:'revert'}}>FRESH BED LINEN AND FLUFFY TOWELS</p></div>
                        </Col>
                        <Col xs={24} md={12} lg={12} style={{ height:"125px" }}>
                            <div style={{textAlign:'center'}}><CgSmartHomeWashMachine style={{width:'30px', height:'30px'}}/></div>
                            <div style={{padding:'5%'}}><p style={{textAlign:'center', fontWeight:'revert'}}>WASHING MACHINE</p></div>
                        </Col>
                    </Row>
                </Col>
                <Col xs={10} md={10} lg={10}>
                    <Row>
                        <Col xs={24} md={12} lg={12} style={{ height:"125px" }}>
                            <div style={{textAlign:'center'}}><GiSofa style={{width:'30px', height:'30px'}}/></div>
                            <div style={{padding:'5%'}}><p style={{textAlign:'center', fontWeight:'revert'}}>COMFY SOFAS AND A TV</p></div>
                        </Col>
                        <Col xs={24} md={12} lg={12} style={{ height:"125px" }}>
                            <div style={{textAlign:'center'}}><SiClockify style={{width:'30px', height:'30px'}}/></div>
                            <div style={{padding:'5%'}}><p style={{textAlign:'center', fontWeight:'bold'}}>24/7 GUEST SUPPORT</p></div>
                        </Col>
                    </Row>
                </Col>
                <Col xs={2} md={2} lg={2}></Col>
            </Row>
            <Row style={{ paddingBottom: '2%', backgroundColor:'#F3F1EF'}}>
                <Col xs={6} md={6} lg={6}></Col>
                <Col xs={12} md={12} lg={12}>
                    <p style={{fontFamily:'Cambria', fontSize:'18px', textAlign:'center'}}>All of our apartments are unique so check individual apartments for exact specifications.</p>
                </Col>
                <Col xs={6} md={6} lg={6}></Col>
            </Row>
        </>
    )
}
