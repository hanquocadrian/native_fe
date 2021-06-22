import { Col, Input, Radio, Row, Switch } from 'antd';
import { getData } from 'Api/api';
import { url } from 'Api/url';
import { urnKhdID } from 'Api/urn';
import { urnCustomerID } from 'Api/urn';
import { urnUserID } from 'Api/urn';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

export default function Profile(props) {
    const idTK = useSelector(state => state.customerAccountReducer.idTK);
    const [user, setuser] = useState({});
    const [khd, setkhd] = useState({});

    useEffect(() => {
        var uri = url + urnUserID(idTK);
        getData(uri)
        .then((resUser) => {
            setuser(resUser.data[0]);
            uri = url + urnKhdID(resUser.data[0].idKHD);
            getData(uri)
            .then((resKHD) => {
                setkhd(resKHD.data[0]);
            })
        });
    },[])

    return (
        <>
            <img 
                src="https://firebasestorage.googleapis.com/v0/b/fir-nativecity.appspot.com/o/slide%2FIMG_08.jpg?alt=media&token=ba97dcc9-3619-4044-8ad9-c54cce6cedcc" 
                style={{ position: 'fixed', zIndex: '-1', width: '98.9vw', height: '92vh', filter: 'brightness(50%)' }} 
            />
            <div style={{ height: '92vh' }} />
            <Row style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '98.9vw'}}>
                <Col xs={6} md={6} lg={6} />
                <Col xs={12} md={12} lg={12}>
                    <p className="text-center">
                        <span style={{ color: 'white', fontSize: '65px' }}>Adrian Chan</span>
                        <hr style={{ color: 'white'}} />
                        <span style={{ color: 'white', fontSize: '20px' }}>Profile</span>
                    </p>
                </Col>
                <Col xs={6} md={6} lg={6} />
            </Row>

            <div style={{ backgroundColor: 'white', height: '92vh', paddingTop: '30px'}}>
                <h1 className="text-center">INFORMATION CUSTOMER</h1> 
                <Row className="mb-15">
                    <Col xs={6} md={6} lg={6} />
                    <Col xs={3} md={3} lg={3} style={{ lineHeight: '32px' }}>
                        <b>Display name:</b>
                    </Col>
                    <Col xs={9} md={9} lg={9} >
                        <Row>
                            <Col xs={3} md={3} lg={3} >
                                <Input placeholder="Mr" />
                            </Col>
                            <Col xs={21} md={21} lg={21} >
                                <Input  />
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={6} md={6} lg={6} />
                </Row>
                <Row className="mb-15">
                    <Col xs={6} md={6} lg={6} />
                    <Col xs={3} md={3} lg={3} style={{ lineHeight: '32px' }}>
                        <b>Email:</b>
                    </Col>
                    <Col xs={9} md={9} lg={9} >
                        <Input /> 
                    </Col>
                    <Col xs={6} md={6} lg={6} />
                </Row>
                <Row className="mb-15">
                    <Col xs={6} md={6} lg={6} />
                    <Col xs={3} md={3} lg={3} style={{ lineHeight: '32px' }}>
                        <b>Phone number:</b>
                    </Col>
                    <Col xs={9} md={9} lg={9} >
                        <Input /> 
                    </Col>
                    <Col xs={6} md={6} lg={6} />
                </Row>
                <Row className="mb-15">
                    <Col xs={6} md={6} lg={6} />
                    <Col xs={3} md={3} lg={3} style={{ lineHeight: '32px' }}>
                        <b>Account type:</b>
                    </Col>
                    <Col xs={9} md={9} lg={9} >
                        {
                            user.loaiTaiKhoan == 1 ? (
                                <>
                                    <Radio.Group onChange={(e) => { console.log(e.target.value); }} value={1}>
                                        <Radio value={1}>Social account</Radio>
                                        <Radio value={2}>Native account</Radio>
                                    </Radio.Group>
                                </>
                            ) : (
                                <>
                                    <Radio.Group value={2}>
                                        <Radio value={1} disabled>Social account</Radio>
                                        <Radio value={2} disabled>Native account</Radio>
                                    </Radio.Group>
                                </>
                            )
                        }
                    </Col>
                    <Col xs={6} md={6} lg={6} />
                </Row>
                <Row className="mb-15">
                    <Col xs={6} md={6} lg={6} />
                    <Col xs={3} md={3} lg={3} style={{ lineHeight: '32px' }}>
                        <b>Change password:</b>
                    </Col>
                    <Col xs={9} md={9} lg={9} >
                        <Switch checkedChildren="Yes" unCheckedChildren="No" onChange={(checked)=>{ console.log(checked) }} />
                    </Col>
                    <Col xs={6} md={6} lg={6} />
                </Row>
                <Row className="mb-15">
                    <Col xs={6} md={6} lg={6} />
                    <Col xs={3} md={3} lg={3} style={{ lineHeight: '32px' }}>
                        <b>Password:</b>
                    </Col>
                    <Col xs={9} md={9} lg={9} >
                        <Input /> 
                    </Col>
                    <Col xs={6} md={6} lg={6} />
                </Row> 
                <Row className="mb-15">
                    <Col xs={6} md={6} lg={6} />
                    <Col xs={3} md={3} lg={3} style={{ lineHeight: '32px' }}>
                        <b>Confirm password:</b>
                    </Col>
                    <Col xs={9} md={9} lg={9} >
                        <Input /> 
                    </Col>
                    <Col xs={6} md={6} lg={6} />
                </Row>                      
            </div>
            
           

        </>
    )
}
