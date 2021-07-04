import React from 'react'
import { Col, Dropdown, Menu, Row } from 'antd'
import { BiUser } from "react-icons/bi";
import { RiLogoutBoxLine, RiAccountPinBoxLine  } from "react-icons/ri";
import { Link } from 'react-router-dom';
import './NavbarTop.css';
import auth from 'Auth/auth';
import { useDispatch, useSelector } from 'react-redux';
import { actLogout } from 'ReduxConfig/Actions/adminAccount';

export default function NavbarTop(props) {
    const dispatch = useDispatch();
    const idAdmin = useSelector(state => state.adminAccountReducer.idAdmin);
    const username = useSelector(state => state.adminAccountReducer.displayName);

    const onLogout = () => {
        const action = actLogout();
        dispatch(action);
        return auth.logout(() => props.props.history.push("/admin/"));
    }

    const user = (
        <Menu style={{marginTop: '3vh'}} className="LinkNavCus">
            <Menu.Item>
                <Link to={ "/admin/adminacc-update/" + idAdmin }>
                    <RiAccountPinBoxLine fontSize="15px" /> Edit your account
                </Link>
            </Menu.Item>
            <Menu.Item>
                <span onClick={ onLogout }>
                    <RiLogoutBoxLine fontSize="15px" /> Log out
                </span>
            </Menu.Item>
        </Menu>
    );

    return (
        <>
            <Row id="fixNavTop" align="middle" style={{ height: "8vh" }}>
                <Col xs={2} md={6} lg={6}>
                    <Menu mode="horizontal">
                        <Menu.Item>
                            <Link to="/admin/home"><b style={{fontSize:'20px'}}>Admin Area</b></Link>
                        </Menu.Item>
                    </Menu>
                </Col>
                <Col xs={20} md={12} lg={12} style={{ textAlign: "center", borderBottom: "1px solid #F0F0F0", height: "48px" }}>
                    <span className="LogoNavAdmin">
                        <div style={{ display: "inline-block", fontSize: "3.2vh" }}><b>NATIVE HOTEL MANAGEMENT</b></div>             
                    </span>
                </Col>
                <Col xs={2} md={6} lg={6}>
                    <Row justify="end">
                        <Menu mode="horizontal">
                            <Menu.Item>
                                <Dropdown overlay={user}>
                                    <span className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                        <span style={{fontSize:"18px", fontWeight: "bolder"}}>Hello, {username} </span>
                                        <BiUser style={{fontSize: '20px', position: 'relative', top: '4px', fontWeight: "bolder"}}/>
                                    </span>
                                </Dropdown>
                            </Menu.Item>
                        </Menu>
                    </Row>
                    
                </Col>
            </Row>
            <Row style={{ height: '8vh' }}></Row>
        </>
    )
}
