import { Button, Col, Input, message, Popconfirm, Row, Space, Table, Tooltip } from 'antd';
import { deleteData } from 'Api/api';
import { getData } from 'Api/api';
import { url } from 'Api/url';
import NavbarTop from 'Components/Admin/Common/Navigation/NavbarTop';
import Sidebar from 'Components/Admin/Common/Sidebar/Sidebar';
import React, { useEffect, useState } from 'react';
import { GoSearch } from 'react-icons/go';
import { GrAdd } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { urnCustomerStay } from 'Api/urn';
import { urnCustomerStayID } from 'Api/urn';
import { format } from 'date-fns';

function PageCustomerStay(props) {
    const phanQuyen = useSelector(state => state.adminAccountReducer.phanQuyen);
    const [searchText, setsearchText] = useState('');
    const [searchedColumn, setsearchedColumn] = useState('');
    const [searchInput, setsearchInput] = useState('');

    const [dataCustomerStay, setdataCustomerStay] = useState([]);


    useEffect(() => {
       var uri = url + urnCustomerStay;
       getData(uri)
       .then(res => setdataCustomerStay(res.data));
    }, []);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setsearchText(selectedKeys[0]);
        setsearchedColumn(dataIndex);
    };
    
    const handleReset = clearFilters => {
        clearFilters();
        setsearchText('');
    };

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
            title: phanQuyen == 3 ? 'Actions' : '',
            render: (record) => (
                phanQuyen == 3 && (
                    <>
                        <Link to={ '/admin/customer-stay-upd/' + record.idKHO }><Button className="btn-edit">Edit</Button></Link>
                        <Popconfirm
                            title="Are you sure to delete this?"
                            onConfirm={ () => onDelete(record.idKHO) }
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button className="btn-delete">Delete</Button>
                        </Popconfirm>
                    </>
                )
            )
        }
    ];

    function onDelete(id) {
        var uri = url + urnCustomerStayID(id);
        deleteData(uri)
        .then((res) => {
            if(typeof res.data !== 'undefined'){
                console.log(res.data);
                message.success("Delete successfully !");

                uri = url + urnCustomerStay;
                getData(uri)
                .then(res => setdataCustomerStay(res.data))
                .catch(err => console.error(err));
            } else if (typeof res.response !== 'undefined'){
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
                                    <Link to="/admin/customer-stay-add">
                                        <Button className="btn-add" id="btnAdd">
                                            <GrAdd className="icon-top" />
                                        </Button>
                                    </Link>
                                </Tooltip>
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

