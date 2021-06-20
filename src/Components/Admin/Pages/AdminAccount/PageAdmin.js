import React from 'react'
import Sidebar from '../../Common/Sidebar/Sidebar';
import { Row, Col, Table, Button, Tooltip, Popconfirm, message } from 'antd';
import { useEffect, useState } from 'react';

import { RiDeleteBin5Line } from "react-icons/ri";
import { GrAdd } from 'react-icons/gr';

import NavbarTop from '../../Common/Navigation/NavbarTop';
import { Link } from 'react-router-dom';

import { url } from '../../../../Api/url';
import { getData, deleteData } from 'Api/api';

export default function PageService(props) {
    const [dataAdminAccs, setdataAdminAccs] = useState([]);
    const [user, setUser] = useState([]);

    useEffect(() => {
        try {
            var uri = url + '/api/admin';
            
            getData(uri)
            .then(res => setdataAdminAccs(res.data))
            .catch(err => console.log(err));
        } catch (error) {
            console.log('Error => get data Admin account: ', error);
        }
    }, []);

    useEffect(() => {
        try {
            var uri = url + '/api/user';
            
            getData(uri)
            .then(res => setUser(res.data))
            .catch(err => console.log(err));
        } catch (error) {
            console.log('Error => get data User: ', error);
        }
    }, []);
    
    const columns = [
        {
            title: '#',
            dataIndex: 'idAdmin',
            align: 'center'
        },
        {
            title: 'Name',
            dataIndex: 'tenAdmin',
            align: 'center'
        },
        {
            title: 'Email',
            dataIndex: 'idAdmin',
            render: idAdmin => (
                user.map((item, index) => 
                    item.idAdmin === idAdmin && item.email
                )
            ),
            align: 'center'
        },
        {
            title: 'Position',
            dataIndex: 'phanQuyen',
            align: 'center'
        },
        {
            title: 'Actions',
            render: (record) => (
                <>
                    <Popconfirm
                        title="Are you sure?"
                        onConfirm={ () => onDelete(record.idAdmin) }
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button className="btn-delete"><RiDeleteBin5Line/></Button>
                    </Popconfirm>
                </>
            )
        }
    ];

    function onDelete(id) {
        var uri1 = url + '/api/user/' + id;
        deleteData(uri1)
        .then(res => {
            if (typeof res.data !== 'undefined') {
                var uri2 = url + '/api/admin/' + id;
                deleteData(uri2)
                .then(res => {
                    if (res.data) {
                        message.success("Delete successfully !");
                        var uri3 = url + '/api/admin/';
                        getData(uri3)
                        .then(res => setdataAdminAccs(res.data))
                        .catch(err => console.error(err));
                    }
                    else {
                        message.error("Delete fail. ");
                    }
                })
            }
            else if(typeof res.response !== 'undefined'){
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
                                        <Link to="/admin/adminacc-add">
                                            <Button className="btn-add" id="btnAdd">
                                                <GrAdd className="icon-top" />
                                            </Button>
                                        </Link>
                                    </Tooltip>
                                </Col>
                                <Col xs={20} md={20} lg={20}>
                                    <h1 className="text-center"><b>LIST OF STAFF ACCOUNTS</b></h1>
                                </Col>
                                <Col xs={2} md={2} lg={2}/>
                            </Row>
                            <Table 
                                columns={ columns } 
                                dataSource={ dataAdminAccs } 
                                pagination={{ pageSize: 4, position: ['topRight', 'none'] }}
                                // scroll={{ x: 1080 }}                                                  
                            />
                        </Col>
                        <Col xs={2} md={2} lg={2} />
                    </Row>
                </Col>
            </Row>
        </>
    )
}
