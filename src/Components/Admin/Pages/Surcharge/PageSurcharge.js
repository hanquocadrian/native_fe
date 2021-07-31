import { Col, Row, Table } from 'antd';
import { getData } from 'Api/api';
import { url } from 'Api/url';
import NavbarTop from 'Components/Admin/Common/Navigation/NavbarTop';
import Sidebar from 'Components/Admin/Common/Sidebar/Sidebar';
import React, { useEffect, useState } from 'react';
import { urnExtraFee, urnSurchargePrice } from 'Api/urn';
import CurrencyFormat from 'react-currency-format';

function PageSurcharge(props) {
    const [dataSurcharge, setdataSurcharge] = useState([]);
    const [dataGiaPT, setDataGiaPT] = useState([]);

    useEffect(() => {
       var uri = url + urnExtraFee;
       getData(uri)
       .then(res => setdataSurcharge(res.data));
    }, []);

    useEffect(() => {
        var uri = url + urnSurchargePrice;
        getData(uri).then(res =>{ console.log("load:", res.data); setDataGiaPT(res.data); });
    }, []);

    const columns = [
        {
            title: '#',
            dataIndex: 'idPT',
            sorter: {
                compare: (a, b) => a.idPT - b.idPT
            },
            align: 'center'
        },
        {
            title: 'Surcharge name',
            dataIndex: 'idGPT',
            render: idGPT => (
                dataGiaPT.map((item, index) => 
                    item.idGPT === idGPT && item.tenPT
                )
            ),
            align: 'center'
        },
        {
            title: 'Amount',
            dataIndex: 'soLuong',
            align: 'center'
        },
        {
            title: 'Price',
            dataIndex: 'donGia',
            render: donGia => (
                <>
                    <CurrencyFormat value={donGia} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                </>
            ),
            align: 'center'
        },
        {
            title: 'ID Bill',
            dataIndex: 'idPTT',
            align: 'center'
        }
    ];

    return (
        <>
            <NavbarTop props={props} />
            <Row>
                <Col span={5}>
                    <Sidebar />
                </Col>
                <Col span={19}>
                    <div style={{ height: '3vh' }} />
                    <Row>
                        <Col xs={2} md={2} lg={2} />
                        <Col xs={20} md={20} lg={20}>
                        <Row>
                            <Col xs={2} md={2} lg={2}/>
                            <Col xs={20} md={20} lg={20}>
                                <h1 className="text-center"><b>LIST OF SURCHARGE</b></h1>
                            </Col>
                            <Col xs={2} md={2} lg={2} />
                        </Row>
                            <Table
                                columns={ columns } 
                                dataSource={ dataSurcharge } 
                                pagination={{ pageSize: 7, position: ['topRight', 'none'] }} 
                                scroll={{ x: 1080 }}
                            />
                        </Col>
                        <Col xs={2} md={2} lg={2} />
                    </Row>
                </Col>
            </Row>
        </>
    )
}

export default PageSurcharge