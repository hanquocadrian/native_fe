import { Col, Dropdown, Menu, Row } from 'antd'
import React from 'react'
import '../Navbar.css'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { url } from 'Api/url';
import axios from 'axios';

const { SubMenu } = Menu;

export default function NavProfile() {
    const [roomTypes, setRoomTypes] = useState([]);

    useEffect(() => {
        try {
            const getRoomType = async () => {
                var uri = url + '/api/roomtype/';
                const result = await axios.get(uri)
                .then((res) => res.data)
                .catch((err) => console.log(err));
                console.log("Nabar, RT: ", result);
                setRoomTypes(result);
            }
            getRoomType();
        } catch (error) {
            console.log(error);
        }
    }, []);

    function showRoomTypes(){
        console.log(roomTypes);                                                                                                               
        const lst = typeof roomTypes !== 'undefined' ? roomTypes.map((item, index) =>
            <Menu.Item key={index} className="LinkNavCus">
                <Link to={'/roomtype/' + item.idLP}  style={{textDecorationLine:'none', color: 'black'}}>
                    <span>{item.tenLP}</span>
                </Link>
            </Menu.Item>
        ) : (<></>);
        return lst;
    };
    
    const dd_booking = (
        <Menu style={{marginTop: '3vh'}}>
            <Menu.Item  className="LinkNavCus">
                <Link to="/user/your-booking-room"><span style={{fontSize:"15px"}}>Booking Room</span></Link>
            </Menu.Item>
            <Menu.Item className="LinkNavCus">
                <Link to="/about"><span style={{fontSize:"15px"}}>Booking Service</span></Link>
            </Menu.Item>
        </Menu>
    );

    return (
        <>
            <Row id="fixNav" align="middle" style={{ height: "8vh" }}>
                <Col xs={2} md={6} lg={9}>
                    <Menu mode="horizontal">
                        <SubMenu  style={{fontSize:"15px"}} title="Room Type">
                            { showRoomTypes() }
                        </SubMenu>
                        <Menu.Item className="LinkNavCus">
                            <Link to="/service"><span style={{fontSize:"15px"}}>Service</span></Link>
                        </Menu.Item>
                        <Menu.Item className="LinkNavCus">
                            <span className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                <span style={{fontSize:"15px"}}>Search</span>
                            </span>
                        </Menu.Item>
                    </Menu>
                </Col>
                <Col xs={20} md={12} lg={6} style={{ textAlign: "center", borderBottom: "1px solid #F0F0F0", height: "48px" }}>
                    <span className="LogoNavCus">
                        <Link to="/">   
                            <div style={{ display: "inline-block", fontSize: "3.7vh", fontFamily: 'Georgia' }}><b>NATIVE HOTEL</b></div>
                        </Link>                        
                    </span>
                </Col>
                <Col xs={0} md={4} lg={0} style={{ borderBottom: "1px solid #F0F0F0", height: "48px" }} />
                <Col xs={2} md={2} lg={9} style={{ textAlign: "right" }}>
                    <Row>
                        <Menu mode="horizontal" style={{width: '100%', textAlign:'end'}}>
                            <Menu.Item>
                                <Dropdown overlay={ dd_booking }>
                                    <span className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                        <span style={{fontSize:"15px"}}>Booking</span>
                                    </span>
                                </Dropdown>
                            </Menu.Item>
                            <Menu.Item>
                                <Link to="/user/bills"><span style={{fontSize:"15px"}}>Bills</span></Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link to="/user/room-rental-contract"><span style={{fontSize:"15px"}}>Room Rental Contract</span></Link>
                            </Menu.Item>
                        </Menu>
                    </Row>
                </Col>
            </Row>
            <Row style={{ height: '8vh' }}></Row>
        </>
    )
}
