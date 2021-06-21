import { Col, Dropdown, Menu, Row } from 'antd'
import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom';
import { CgProfile, CgShoppingCart } from 'react-icons/cg';
import { RiPhoneLine } from 'react-icons/ri';
import { FiLogIn } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { url } from '../../../Api/url';
import axios from 'axios';
import { search } from './Module/module';
import { firAuth } from 'FirebaseConfig';
import { BiLogOut } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { actLogout } from 'ReduxConfig/Actions/customerAccount';

const { SubMenu } = Menu;

export default function Navbar() {
    // Redux
    const userisLogin = useSelector(state => state.customerAccountReducer.isLogin);
    const isSocialLogin = useSelector(state => state.customerAccountReducer.isSocialLogin);
    const username = useSelector(state => state.customerAccountReducer.displayName);

    const dispatch = useDispatch();

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
        const lst = typeof roomTypes !== 'undefined' ? roomTypes.map((item, index) =>
            <Menu.Item key={index} className="LinkNavCus">
                <Link to={'/roomtype/' + item.idLP}  style={{textDecorationLine:'none', color: 'black'}}>
                    <span>{item.tenLP}</span>
                </Link>
            </Menu.Item>
        ) : (<></>);
        return lst;
    };


    const onLogout = () => {
        if(isSocialLogin){
            firAuth.signOut();
        }

        var actionLogout = actLogout();
        dispatch(actionLogout);
    }
    
    const userAccount = (
        <Menu style={{marginTop: '3vh'}}>
        <Menu.Item  className="LinkNavCus">
            <Link to="/about">
            <CgProfile style={{fontSize: '20px', position: 'relative', top: '4px'}} />
            <span style={{fontSize:"15px"}}> Profile</span>
            </Link>
        </Menu.Item>
        <Menu.Item className="LinkNavCus">
            <a onClick={ onLogout }>
            <BiLogOut style={{fontSize: '20px', position: 'relative', top: '4px'}} />
            <span style={{fontSize:"15px"}}> Logout</span>
            </a>
        </Menu.Item>
        </Menu>
    );

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
                            <Link to="/your-basket">
                                <CgShoppingCart style={{fontSize: '20px', position: 'relative', top: '4px'}}/>
                                <span style={{fontSize:"15px"}}>(0)</span>
                            </Link>
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
                                    <Dropdown overlay={ userAccount }>
                                        <span className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                            <span style={{fontSize:"15px"}}>Hello, {username}</span>
                                        </span>
                                    </Dropdown>
                                </Menu.Item>
                            ) : (
                                <Menu.Item className="LinkNavCus">
                                    <Link to="/login">     
                                        <FiLogIn style={{fontSize: '20px', position: 'relative', top: '4px'}} />
                                        <span style={{fontSize:"15px"}}> Signin & Login</span>
                                    </Link>
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
