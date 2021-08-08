import React, { useState, useEffect } from 'react'
import { Col, Row, Table, Button } from 'antd';
import { BsDiamondHalf } from 'react-icons/bs';
import CurrencyFormat from 'react-currency-format';
import { urnRoomTypeRateIDLP } from 'Api/urn';
import { url } from 'Api/url';
import { getData } from 'Api/api';
import { urnRoomType } from 'Api/urn';

import './Rates.css';
import { Link } from 'react-router-dom';
function DisplayRate(props) {
    const [giaLP, setGiaLP] = useState(null);

    useEffect(() => {
        var uri = url + urnRoomTypeRateIDLP(props.idLP);
        getData(uri).then((res) => {
            console.log(res.data);
            setGiaLP(parseFloat(res.data || 0));
        })
    }, [props.idLP]);
     
    return (
        <>
            { giaLP ? <CurrencyFormat value={giaLP ? giaLP : 0} displayType={'text'} thousandSeparator={true} prefix={'$'} /> : `Haven't rate`}
        </>
    );
}

function Rates(props) {
    const [dataRoomTypes, setDataRoomTypes] = useState([]);

    useEffect(() => {
        var uri = url + urnRoomType;
        getData(uri).then((res) => {
            console.log(res.data);
            setDataRoomTypes(res.data);
        })
    }, []);

    const columns = [
        {
            title: '#',
            dataIndex: 'idLP',
            align: 'center',
        },
        {
            title: 'Roomtype',
            dataIndex: 'tenLP',
            align: 'center',
        },
        {
            title: 'Decription',
            dataIndex: 'moTaTD',
            render: moTaTD => (
                <>{ moTaTD.length > 50? moTaTD.slice(0,35)+' ...' : moTaTD }</>
            ),
            align: 'center',
        },
        {
            title: 'Prices',
            render: record => (
                <DisplayRate idLP = {record.idLP} />
            ),
            align: 'center',
        },
        {
            title: '',
            render: record => (
                <>
                    <Link to={"/roomtype/" + record.idLP }>
                        <Button>VIEW MORE</Button>
                    </Link>
                </>
               
            ),
            align: 'center',
        },
    ];

    return (
        <>
            <Row className="row-title" justify="center">
                <Col>
                    <span className="text-title"><span className="text-title-head">R</span>OOMTYPE <span className="text-title-head">R</span>ATES</span>
                </Col>
            </Row>              
            <Row justify="center">
                <Col>
                    <span className="text-title minimize-font">Prices for a room per night </span>
                </Col>
            </Row>    
            <Row>
                <Col xs={0} md={3} lg={3}></Col>
                <Col xs={24} md={18} lg={18}>
                    <Table
                        columns={ columns } 
                        dataSource={ dataRoomTypes } 
                        pagination={{ pageSize: 6, position: ['topRight', 'none'] }} 
                        scroll={{ x: 1080 }}
                    />
                </Col>
                <Col xs={0} md={3} lg={3}></Col>
            </Row>       
            <Row>
                <Col xs={0} md={3} lg={3}></Col>
                <Col xs={24} md={18} lg={18}>
                    <div className="info-general-rooms" style={{ marginLeft: '7vw', marginTop: '9.5vh', marginBottom: '7vh' }} >
                        <span className="text-title"><b>Infomation general rooms:</b></span>
                        <ul style={{ marginTop: '2vh' }}>
                            <li><BsDiamondHalf style={{ marginRight: '1.5vw' }} />Retina Display or LCD TV sets are in all rooms.</li>
                            <li><BsDiamondHalf style={{ marginRight: '1.5vw' }} />Rates include a Mediterranean breakfast (coffee, teas, juices, fruit, yogurt, bread, cakes, cheese, ham, etc.)</li>
                            <li><BsDiamondHalf style={{ marginRight: '1.5vw' }} />Bed-rooms feature: King Long size mattress (185x210), private bathroom (shower), air conditioning, TV (LCD) and mini-fridge.</li>
                            <li><BsDiamondHalf style={{ marginRight: '1.5vw' }} />In consideration of our guests we have only non smoking bed-rooms</li>
                            <li><BsDiamondHalf style={{ marginRight: '1.5vw' }} />18x8 mt swimming pool, towels are provided</li>
                            <li><BsDiamondHalf style={{ marginRight: '1.5vw' }} />Each room has a refrigerator.</li>
                            <li><BsDiamondHalf style={{ marginRight: '1.5vw' }} />Complimentary "WIFI" connection</li>
                            <li><BsDiamondHalf style={{ marginRight: '1.5vw' }} />Free Wi-Fi.</li>
                            <li><BsDiamondHalf style={{ marginRight: '1.5vw' }} />Inward Parking</li>
                        </ul>
                    </div>
                </Col>
                <Col xs={0} md={3} lg={3}></Col>
            </Row>                                                                                                                                                                                                                                                                                                                                                                                            
        </>
    )
}

export default Rates

