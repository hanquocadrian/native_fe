import { Button, Col, Row, Table, Tooltip } from 'antd';
import { getData } from 'Api/api';
import { url } from 'Api/url';
import NavbarTop from 'Components/Admin/Common/Navigation/NavbarTop';
import Sidebar from 'Components/Admin/Common/Sidebar/Sidebar';
import React, { useEffect, useState } from 'react';
import { GrAdd } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { urnCustomerStay } from 'Api/urn';
import { format } from 'date-fns';

function PageCustomerStay(props) {
    const phanQuyen = useSelector(state => state.adminAccountReducer.phanQuyen);
    const [dataCustomerStay, setdataCustomerStay] = useState([]);


    useEffect(() => {
       var uri = url + urnCustomerStay;
       getData(uri)
       .then(res => setdataCustomerStay(res.data));
    }, []);


    const columns = [
        {
            title: '#',
            dataIndex: 'idKHO',
            sorter: {
                compare: (a, b) => a.idKHO - b.idKHO
            }
        },
        {
            title: 'Identity card',
            dataIndex: 'CMND',
        },
        {
            title: 'Passport',
            dataIndex: 'Passport',
        },
        {
            title: 'Phone num',
            dataIndex: 'sdt', 
        },
        {
            title: 'National',
            dataIndex: 'quocGia',
        },
        {
            title: 'Title',
            dataIndex: 'title',
        },
        {
            title: 'Name',
            dataIndex: 'tenKH',
        },
        {
            title: 'Date of birth',
            dataIndex: 'ngaySinh',
            render: (ngaySinh) => (
                <>
                    { format(new Date(ngaySinh), 'dd/MM/yyyy') }
                </>
            ),
        },
        {
            title: phanQuyen === 3 ? 'Actions' : '',
            render: (record) => (
                phanQuyen === 3 && (
                    <>
                        <Link to={ '/admin/customer-stay-upd/' + record.idKHO }><Button className="btn-edit">Edit</Button></Link>
                    </>
                )
            )
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
                            <Col xs={2} md={2} lg={2}>
                            {
                                phanQuyen === 3 && (
                                    <Tooltip placement="right" title="Create new one">
                                        <Link to="/admin/customer-stay-add">
                                            <Button className="btn-add" id="btnAdd">
                                                <GrAdd className="icon-top" />
                                            </Button>
                                        </Link>
                                    </Tooltip>
                                )
                            }
                            </Col>
                            <Col xs={20} md={20} lg={20}>
                                <h1 className="text-center"><b>LIST OF CUSTOMER STAY</b></h1>
                            </Col>
                            <Col xs={2} md={2} lg={2} />
                        </Row>
                            <Table
                                columns={ columns } 
                                dataSource={ dataCustomerStay } 
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

export default PageCustomerStay

