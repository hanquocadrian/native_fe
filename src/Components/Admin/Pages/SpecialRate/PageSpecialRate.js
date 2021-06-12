import { Button, Col, message, Popconfirm, Row, Table, Tooltip } from 'antd';
import { deleteData } from 'Api/api';
import { getData } from 'Api/api';
import { url } from 'Api/url';
import NavbarTop from 'Components/Admin/Common/Navigation/NavbarTop';
import Sidebar from 'Components/Admin/Common/Sidebar/Sidebar';
import React, { useEffect, useState } from 'react'
import { GrAdd } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import { urnSpecialRate, urnSpecialRateID } from 'Api/urn';

function PageSpecialRate(props) {
    const [dataSpecialRates, setdataSpecialRates] = useState([]);
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    useEffect(() => {
        var uri = url + urnSpecialRate;

        getData(uri)
        .then(response => setdataSpecialRates(response.data))
        .catch(error => console.log(error));
    },[]);

    const columns = [
        {
            title: '#',
            dataIndex: 'idGTT',
            sorter: {
                compare: (a, b) => a.idGTT - b.idGTT
            },
            align: 'center',
            width: 60
        },
        {
            title: 'Days of the week',
            dataIndex: 'thu',
            sorter: {
                compare: (a, b) => a.thu - b.thu
            },
            render: thu => (
                <>{daysOfWeek[thu]}</>
            ),
            align: 'center',
            width: 164
        },
        {
            title: 'Rate',
            dataIndex: 'giaTheoThu',
            sorter: {
                compare: (a, b) => a.giaTheoThu - b.giaTheoThu
            },
            render: giaTheoThu => (
                <>{giaTheoThu} $</>
            ),
            align: 'center',
            width: 150
        },
        {
            title: 'ID daily rate',
            dataIndex: 'idGTN',
            sorter: {
                compare: (a, b) => a.idGTN - b.idGTN
            },
            align: 'center',
            width: 164
        },
        {
            title: 'Actions',
            render: (record) => (
                <>
                    <Link to={ '/admin/special-rate-upd/' + record.idGTT }><Button className="btn-edit">Edit</Button></Link>
                    <Popconfirm
                        title="Are you sure to delete this?"
                        onConfirm={ () => onDelete(record.idLP) }
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button className="btn-delete">Delete</Button>
                    </Popconfirm>
                </>
            ),
            width: 200
        }
    ];

    function onDelete(id) {
        var uri = url + urnSpecialRateID(id);
        deleteData(uri)
        .then((res) => {
            if(typeof res.data !== 'undefined'){
                console.log(res.data);
                message.success("Delete successfully !");

                uri = url + urnSpecialRate;
                getData(uri)
                .then(res => setdataSpecialRates(res.data))
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
                                    <Link to="/admin/special-rate-add">
                                        <Button className="btn-add" id="btnAdd">
                                            <GrAdd className="icon-top" />
                                        </Button>
                                    </Link>
                                </Tooltip>
                            </Col>
                            <Col xs={20} md={20} lg={20}>
                                <h1 className="text-center"><b>LIST OF SPECIAL RATES FOR ROOMS</b></h1>
                            </Col>
                            <Col xs={2} md={2} lg={2} />
                        </Row>
                            <Table
                                columns={ columns } 
                                dataSource={ dataSpecialRates } 
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

export default PageSpecialRate

