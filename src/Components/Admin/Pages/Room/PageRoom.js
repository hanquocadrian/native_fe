import { Button, Col, message, Popconfirm, Row, Table, Tooltip } from 'antd';
import { deleteData } from 'Api/api';
import { getData } from 'Api/api';
import { url } from 'Api/url';
import { urnRoomType, urnRoom, urnRoomID } from 'Api/urn';
import NavbarTop from 'Components/Admin/Common/Navigation/NavbarTop';
import Sidebar from 'Components/Admin/Common/Sidebar/Sidebar';
import React, { useEffect, useState } from 'react'
import { GrAdd } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PageRoom(props) {
    const phanQuyen = useSelector(state => state.adminAccountReducer.phanQuyen);
    const [dataRooms, setdataRooms] = useState([]);
    const [dataRoomtypes, setdataRoomtypes] = useState([]);
    
    useEffect(() => {
        var uri = url + urnRoom;

        getData(uri)
        .then(response => {
            console.log(response.data);
            setdataRooms(response.data);
        })
        .catch(error => console.log(error));
    },[]);

    useEffect(() => {
        try {
            var uri = url + urnRoomType;

            getData(uri)
            .then(res => setdataRoomtypes(res.data))
            .catch(err => console.error(err));
        } catch (error) {
            console.log(error);
        }
    }, []);

    const columns = [
        {
            title: '#',
            dataIndex: 'maPhong',
            filters: [
                {
                    text: 'Block A',
                    value: 'A',
                },
                {
                    text: 'Block B',
                    value: 'B',
                },
                {
                    text: 'Block C',
                    value: 'C',
                },
                {
                    text: 'Block D',
                    value: 'D',
                },
                {
                    text: 'Block E',
                    value: 'E',
                },
            ],
            onFilter: (value, record) => record.maPhong.indexOf(value) === 0,
        },
        {
            title: 'Number of guest',
            dataIndex: 'soNguoi',
            sorter: {
                compare: (a, b) => a.soNguoi - b.soNguoi
            },
            width: 180
        },
        {
            title: 'Status',
            dataIndex: 'trangThai',
            sorter: {
                compare: (a, b) => a.trangThai - b.trangThai
            },
            render: (trangThai) => (
                <>
                    { trangThai === 2 ? "Can use" : "Busy" }
                </>
            )
        },
        {
            title: 'Title room type',
            dataIndex: 'idLP',
            sorter: {
                compare: (a, b) => a.idLP - b.idLP
            },
            render: idLP => (
                dataRoomtypes.map((item) => 
                    item.idLP === idLP && item.tenLP
                )
            )
        },
        {
            title: phanQuyen === 2 ? 'Actions' : '',
            render: (record) => (
                phanQuyen === 2 && (
                    <>
                        <Link to={ '/admin/room-upd/' + record.maPhong }><Button className="btn-edit">Edit</Button></Link>
                        <Popconfirm
                            title="Are you sure to delete this?"
                            onConfirm={ () => onDelete(record.maPhong) }
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
        var uri = url + urnRoomID(id);
        deleteData(uri)
        .then((res) => {
            if(typeof res.data !== 'undefined'){
                console.log(res.data);
                message.success("Delete successfully !");

                uri = url + urnRoom;
                getData(uri)
                .then(res => setdataRooms(res.data))
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
                                    <Link to="/admin/room-add">
                                        <Button className="btn-add" id="btnAdd">
                                            <GrAdd className="icon-top" />
                                        </Button>
                                    </Link>
                                </Tooltip>
                            </Col>
                            <Col xs={20} md={20} lg={20}>
                                <h1 className="text-center"><b>LIST OF ROOMS</b></h1>
                            </Col>
                            <Col xs={2} md={2} lg={2} />
                        </Row>
                            <Table
                                columns={ columns } 
                                dataSource={ dataRooms } 
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

export default PageRoom

