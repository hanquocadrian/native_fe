import React, { useEffect, useState }  from 'react'
import { Col, Dropdown, Menu, Row } from 'antd'
import { BiUser } from "react-icons/bi";
import { RiLogoutBoxLine, RiAccountPinBoxLine  } from "react-icons/ri";
import { Link } from 'react-router-dom';
import './NavbarTop.css';
import auth from 'Auth/auth';

export default function NavbarTop(props) {
    const [idAdmin, setIdAdmin] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
        var admin = sessionStorage.getItem('objAdmin') ? JSON.parse(sessionStorage.getItem('objAdmin')) : '';
        setIdAdmin(admin.idAdmin);
        setUsername(admin.displayName);
    }, []);

    const onLogout = () => {
        sessionStorage.removeItem('objAdmin');
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
                <Col xs={2} md={6} lg={9}>
                    <Menu mode="horizontal">
                        <Menu.Item>
                            <Link to="/admin/home"><b style={{fontSize:'20px'}}>Admin Area</b></Link>
                        </Menu.Item>
                    </Menu>
                </Col>
                <Col xs={20} md={12} lg={6} style={{ textAlign: "center", borderBottom: "1px solid #F0F0F0", height: "48px" }}>
                    <span className="LogoNavAdmin">
                        <div style={{ display: "inline-block", fontSize: "3.2vh" }}><b>NATIVE HOTEL MANAGEMENT</b></div>             
                    </span>
  
                </Col>
                <Col xs={0} md={3} lg={5} style={{ borderBottom: "1px solid #F0F0F0", height: "48px" }} />
                <Col xs={2} md={3} lg={4} style={{ textAlign: "right" }}>
                    <Menu mode="horizontal">
                        <Menu.Item>
                            <Dropdown overlay={user}>
                                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                    <span style={{fontSize:"18px"}}>Hello, {username} </span>
                                    <BiUser style={{fontSize: '20px', position: 'relative', top: '4px'}}/>
                                </a>
                            </Dropdown>
                        </Menu.Item>
                    </Menu>
                </Col>
            </Row>
            <Row style={{ height: '8vh' }}></Row>
        </>
    )
}
