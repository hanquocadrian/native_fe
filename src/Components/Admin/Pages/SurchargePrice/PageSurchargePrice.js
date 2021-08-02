import React from 'react'
import Sidebar from '../../Common/Sidebar/Sidebar';
import { Row, Col, Table, Button, Tooltip, Popconfirm, message } from 'antd';
import { useEffect, useState } from 'react';
import { url } from '../../../../Api/url';
import CurrencyFormat from 'react-currency-format';
import { Link } from 'react-router-dom';
import { GrAdd } from 'react-icons/gr';
import NavbarTop from '../../Common/Navigation/NavbarTop';
import { getData, deleteData } from 'Api/api';
import { urnSurchargePrice, urnSurchargePriceID } from 'Api/urn';
import { useSelector } from 'react-redux';

export default function SurchargePrice(props) {
    const phanQuyen = useSelector(state => state.adminAccountReducer.phanQuyen);
    const [dataSurchargePrice, setDataSurchargePrice] = useState([]);

    useEffect(() => {
        var uri = url + urnSurchargePrice;
        getData(uri)
        .then(res => setDataSurchargePrice(res.data));
    }, []);
    
    const columns = [
        {
            title: '#',
            dataIndex: 'idGPT',
            sorter: {
                compare: (a, b) => a.idGPT - b.idGPT
            },
            align: 'center'
        },
        {
            title: 'Title',
            dataIndex: 'tenPT',
            align: 'center'
        },
        {
            title: 'Price',
            render: record => (
                <>
                    {
                        record.loaiGPT === 1 ? 
                        <CurrencyFormat value={record.giaPT} displayType={'text'} thousandSeparator={true} prefix={'$'} /> :
                        <>
                            { record.giaPT }%
                        </>
                    }
                </>
            ),
            align: 'center'
        },
        {
            title: phanQuyen === 2 ? 'Actions' : '',
            render: (record) => (
                <>
                    {
                        (phanQuyen === 2) && (
                            <>
                                <Link to={ '/admin/surcharge-price-upd/' + record.idGPT }><Button className="btn-edit">Edit</Button></Link>
                                <Popconfirm
                                    title="Are you sure to delete this?"
                                    onConfirm={ () => onDelete(record.idGPT) }
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button className="btn-delete">Delete</Button>
                                </Popconfirm>        
                            </>
                        )
                    }
                </>
            ),
            align: 'center'
        }
    ];

    function onDelete(id) {
        var uri = url + urnSurchargePriceID(id);
        deleteData(uri)
        .then((res) => {
            if(typeof res.data !== 'undefined'){
                console.log(res.data);
                message.success("Delete successfully !");

                uri = url + urnSurchargePrice;
                getData(uri)
                .then(res => setDataSurchargePrice(res.data))
                .catch(err => console.error(err));
            } else if(typeof res.response !== 'undefined'){
                console.log(res.response.data);
                message.error("Delete fail. " + res.response.data);
            }
        })
    }

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
                            {
                                phanQuyen === 2 ? (
                                    <Col xs={2} md={2} lg={2}>
                                        <Tooltip placement="right" title="Create new one">
                                            <Link to="/admin/surcharge-price-add">
                                                <Button className="btn-add" id="btnAdd">
                                                    <GrAdd className="icon-top" />
                                                </Button>
                                            </Link>
                                        </Tooltip>
                                    </Col>
                                ) : (
                                    <Col xs={2} md={2} lg={2}/>
                                )
                            }
                            <Col xs={20} md={20} lg={20}>
                                <h1 className="text-center"><b>LIST OF SURCHARGE PRICE</b></h1>
                            </Col>
                            <Col xs={2} md={2} lg={2}/>
                        </Row>
                            <Table 
                                columns={ columns } 
                                dataSource={ dataSurchargePrice } 
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
