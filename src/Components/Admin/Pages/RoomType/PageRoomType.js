import React from 'react'
import Sidebar from '../../Common/Sidebar/Sidebar';
import { Row, Col, Table, Button, Rate, Tooltip, Popconfirm, message } from 'antd';
import { useEffect, useState } from 'react';
import { url } from '../../../../Api/url';

import { Link } from 'react-router-dom';
import { GrAdd } from 'react-icons/gr';
import NavbarTop from '../../Common/Navigation/NavbarTop';
import { getData, deleteData } from 'Api/api';
import { urnRoomType, urnRoomTypeID } from 'Api/urn';
import Search from 'Components/Admin/Common/Search/Search';

export default function RoomType(props) {
    const [dataRoomtypes, setdataRoomtypes] = useState([]);

    useEffect(() => {
        try {
            var uri = url + urnRoomType;

            getData(uri)
            .then(res => setdataRoomtypes(res.data))
            .catch(err => console.error(err));
        } catch (error) {
            console.log('Error => get data RoomType in Page RoomType: ', error);
        }
    }, []);
    
    const columns = [
        {
            title: '#',
            dataIndex: 'idLP',
            sorter: {
                compare: (a, b) => a.idLP - b.idLP
            },
            align: 'center'
        },
        {
            title: 'Title',
            dataIndex: 'tenLP',
            align: 'center'
        },
        {
            title: 'Kinds of room',
            dataIndex: 'hangPhong',
            sorter: {
                compare: (a, b) => a.hangPhong - b.hangPhong
            },
            render: hangPhong => (
                <>
                    <b>{hangPhong}</b> Stars
                </>
            ),
            align: 'center'
        },
        {
            title: 'Number of rooms',
            dataIndex: 'soLuong',
            align: 'center'
        },
        {
            title: 'Actions',
            render: (record) => (
                <>
                    <Link to={ '/admin/roomtype-detail/' + record.idLP }><Button className="btn-detail">Detail</Button></Link>
                    <Link to={ '/admin/roomtype-upd/' + record.idLP }><Button className="btn-edit">Edit</Button></Link>
                    <Popconfirm
                        title="Are you sure to delete this?"
                        onConfirm={ () => onDelete(record.idLP) }
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button className="btn-delete">Delete</Button>
                    </Popconfirm>
                </>
            )
        }
    ];

    function onDelete(id) {
        var uri = url + urnRoomTypeID(id);
        deleteData(uri)
        .then((res) => {
            if(typeof res.data !== 'undefined'){
                console.log(res.data);
                message.success("Delete successfully !");

                uri = url + urnRoomType;
                getData(uri)
                .then(res => setdataRoomtypes(res.data))
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
                            <Col xs={2} md={2} lg={2}>
                                <Tooltip placement="right" title="Create new one">
                                    <Link to="/admin/roomtype-add">
                                        <Button className="btn-add" id="btnAdd">
                                            <GrAdd className="icon-top" />
                                        </Button>
                                    </Link>
                                </Tooltip>
                            </Col>
                            <Col xs={20} md={20} lg={20}>
                                <h1 className="text-center"><b>LIST OF ROOM TYPE</b></h1>
                            </Col>
                            <Col xs={2} md={2} lg={2}>
                                <Search />
                            </Col>
                        </Row>
                            <Table 
                                columns={ columns } 
                                dataSource={ dataRoomtypes } 
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
