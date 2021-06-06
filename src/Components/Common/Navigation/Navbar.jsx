import { Col, Dropdown, Menu, Row } from 'antd'
import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom';
import { CgShoppingCart } from 'react-icons/cg';
import { RiPhoneLine } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import { url } from '../../../Api/url';
import axios from 'axios';
import { cart, search } from './Module/module';
import { useSelector } from 'react-redux';

const { SubMenu } = Menu;

export default function Navbar() {
    // Redux
    const userisLogin = useSelector(state => state.userReducer.isLogin);
    console.log('Redux: ', userisLogin);

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
        const lst = roomTypes.map((item, index) =>
            <Menu.Item key={index} className="LinkNavCus">
                <Link to={'/roomtype/' + item.idLP}  style={{textDecorationLine:'none', color: 'black'}}>
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
                            <Link to="/about"><span style={{fontSize:"15px"}}>About</span></Link>
                        </Menu.Item>
                        <Menu.Item>
                            <span style={{fontSize:"15px"}}>Rates</span>
                        </Menu.Item>
                        <SubMenu  style={{fontSize:"15px"}} title="Room Type">
                            { showRoomTypes() }
                        </SubMenu>
                        <Menu.Item className="LinkNavCus">
                            <Link to="/service"><span style={{fontSize:"15px"}}>Service</span></Link>
                        </Menu.Item>
                    </Menu>
                </Col>
                <Col xs={20} md={12} lg={6} style={{ textAlign: "center", borderBottom: "1px solid #F0F0F0", height: "48px" }}>
                    <span className="LogoNavCus">
                        <Link to="/">
                            <div style={{ display: "inline-block", fontSize: "3.7vh" }}><b>NATIVE HOTEL</b></div>
                        </Link>                        
                    </span>
                </Col>
                <Col xs={0} md={4} lg={0} style={{ borderBottom: "1px solid #F0F0F0", height: "48px" }} />
                <Col xs={2} md={2} lg={9} style={{ textAlign: "right" }}>
                    <Menu mode="horizontal">
                        <Menu.Item className="LinkNavCus">
                            <Dropdown overlay={ search } trigger={['click']}>
                                <span className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                    <span style={{fontSize:"15px"}}>Search</span>
                                </span>
                            </Dropdown>
                        </Menu.Item>
                        <Menu.Item className="LinkNavCus">
                            <Dropdown overlay={ cart }>
                                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                    <CgShoppingCart style={{fontSize: '20px', position: 'relative', top: '4px'}}/>
                                    <span style={{fontSize:"15px"}}>(0)</span>
                                </a>
                            </Dropdown>
                        </Menu.Item>
                        <Menu.Item className="LinkNavCus">
                            <a href='tel: 84789991876'>
                                <RiPhoneLine style={{fontSize: '20px', position: 'relative', top: '4px'}} />
                                <span style={{fontSize:"16px"}}> +84 789991876</span>
                            </a>
                        </Menu.Item>
                        { 
                            userisLogin ? (
                                <Menu.Item className="LinkNavCus">
                                    <Link to="/about"><span style={{fontSize:"15px"}}>Profile</span></Link>
                                </Menu.Item>
                            ) : (
                                <Menu.Item className="LinkNavCus">
                                    <Link to="/about"><span style={{fontSize:"15px"}}>Signin & Login</span></Link>
                                </Menu.Item>
                            )
                            
                        }
                    </Menu>
                </Col>
            </Row>
            <Row style={{ height: '8vh' }}></Row>
        </>
    )
}
