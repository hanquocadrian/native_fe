import { Col, Dropdown, Menu, Row } from 'antd'
import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom';
import { CgShoppingCart } from 'react-icons/cg';
import { RiPhoneLine } from 'react-icons/ri';
import { useState, useEffect } from 'react';

import { url } from '../../../Api/url';
import axios from 'axios';

const { SubMenu } = Menu;

export default function Navbar() {
    const cart = (
        <Menu style={{marginTop: '3vh'}}>
          <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="urls://www.antgroup.com">
              1st menu item
            </a>
          </Menu.Item>
          <Menu.Item disabled>
            <a target="_blank" rel="noopener noreferrer" href="urls://www.luohanacademy.com">
              3rd menu item
            </a>
          </Menu.Item>
          <Menu.Item danger>a danger item</Menu.Item>
        </Menu>
    );

    const [roomTypes, setRoomTypes] = useState([]);

    useEffect(() => {
        try {
            const getRoomType = async () => {
                var uri = url + '/api/roomtype/';
                const result = await axios.get(uri)
                .then((res) => res.data)
                .catch((err) => console.log(err));
                console.log(result);
                setRoomTypes(result);
            }
            getRoomType();
        } catch (error) {
            console.log(error);
        }
    }, []);

    function showRoomTypes(){
        console.log(roomTypes);
        const lst = roomTypes.map((item, index) =>
            <Menu.Item key={index}>
                <Link to={'/roomdetail/' + item.idLP}  style={{textDecorationLine:'none', color: 'black'}}>
                    <span>{item.tenLP}</span>
                </Link>
            </Menu.Item>
        );
        return lst;
    };
      
    return (
        <>
            <Row id="fixNav" align="middle" style={{ height: "8vh" }}>
                <Col xs={2} md={6} lg={9}>
                    <Menu mode="horizontal">
                        <Menu.Item>
                            <Link to="/about">About</Link>
                        </Menu.Item>
                        <Menu.Item>
                            Rates
                        </Menu.Item>
                        <SubMenu title="Room Type">
                            {/* <Menu.Item>
                                <Link to="/roomdetail/1">Option 1</Link>
                            </Menu.Item>
                            <Menu.Item>Option 2</Menu.Item>
                            <Menu.Item>Option 3</Menu.Item>
                            <Menu.Item>Option 4</Menu.Item> */}
                            {showRoomTypes()}
                        </SubMenu>
                        <Menu.Item>
                        <Link to="/service">Service</Link>
                        </Menu.Item>
                    </Menu>
                </Col>
                <Col xs={20} md={12} lg={6} style={{ textAlign: "center", borderBottom: "1px solid #F0F0F0", height: "48px" }}>
                    <div style={{ display: "inline-block", fontSize: "3.7vh" }}><Link to="/"><b style={{color:'#262626'}}>NATIVE HOTEL</b></Link></div>
                </Col>
                <Col xs={0} md={4} lg={4} style={{ borderBottom: "1px solid #F0F0F0", height: "48px" }} />
                <Col xs={2} md={2} lg={5} style={{ textAlign: "right" }}>
                    <Menu mode="horizontal">
                        <Menu.Item>
                            <Dropdown overlay={cart}>
                                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                    <CgShoppingCart style={{fontSize: '20px', position: 'relative', top: '4px'}}/>
                                    <span style={{fontSize:"18px"}}>(0)</span>
                                </a>
                            </Dropdown>
                        </Menu.Item>
                        <Menu.Item>
                            <a href='tel: 84789991876'>
                                <RiPhoneLine style={{fontSize: '20px', position: 'relative', top: '4px'}} />
                                <span style={{fontSize:"16px"}}> +84 789991876</span>
                            </a>
                        </Menu.Item>
                    </Menu>
                </Col>
            </Row>
            <Row style={{ height: '8vh' }}></Row>
        </>
    )
}
